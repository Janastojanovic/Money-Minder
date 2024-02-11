using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MoneyMinderAPI.DTOs;
using MoneyMinderAPI.Models;
using MoneyMinderAPI.Services;
using MongoDB.Bson;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace MoneyMinderAPI.Controllers
{
    [ApiController]
    [Route("api/v1/authenticate")]
    public class AuthController:ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly UserService _userService;
        private readonly CategoryService _categoryService;
        public AuthController(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager, UserService userService, CategoryService categoryService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _userService = userService;
            _categoryService = categoryService;
        }
        [HttpPost]
        [Route("roles/add")]
        public async Task<IActionResult> CreateRole([FromBody] CreateRoleRequest request)
        {
            var appRole = new ApplicationRole { Name = request.Role };
            var createRole = await _roleManager.CreateAsync(appRole);

            return Ok(new { message = "role created successfully" });
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var result = await RegisterAsync(request);
            return result.Success ? Ok(result): BadRequest(result.Message);
        }

        private async Task<RegisterResponse> RegisterAsync(RegisterRequest request)
        {
            try
            {
                var userExist = await _userManager.FindByEmailAsync(request.Email);
                if (userExist != null)
                {
                    return new RegisterResponse { Message = "User aleready exists", Success = false };
                }

                userExist = new ApplicationUser
                {
                    Name = request.Name,
                    Email = request.Email,
                    ConcurrencyStamp = Guid.NewGuid().ToString(),
                    UserName = request.Username,
                    Savings = request.Savings,
                    MonthlyBudget=request.MonthlyBudget,
                    SalaryDate=request.SalaryDate.AddHours(1),
                    CurrentBudget=request.MonthlyBudget
                };
                var createUserResult =  await _userManager.CreateAsync(userExist,request.Password);
                if(!createUserResult.Succeeded) 
                {
                    return new RegisterResponse{ Message = $"Create user failed { createUserResult?.Errors?.First()?.Description}", Success = false };
                }

                var addUserToRoleResult = await _userManager.AddToRoleAsync(userExist,"USER");
                if(!addUserToRoleResult.Succeeded)
                {
                    return new RegisterResponse { Message = $"Create user succeded, but could not add user to role {createUserResult?.Errors?.First()?.Description}", Success = false };
                }

                return new RegisterResponse { Message ="User register successfully",Success = true};
            }
            catch(Exception ex)
            { 
                return new RegisterResponse { Message = ex.Message, Success= false };
            }
        }

        [HttpPost]
        [Route("login")]
        [ProducesResponseType((int)HttpStatusCode.OK,Type = typeof(LoginResponse))]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user != null)
            {
                if (user.SalaryDate.Date.AddMonths(1) == DateTime.Now.Date)
                {
                    var categories = await _categoryService.GetCategoriesForUserByUserId(user.Id.ToString());
                    decimal savings = 0;

                    foreach (var category in categories)
                    {
                        savings += category.CurrentBudget;

                        var updatedCategory = new Category
                        {
                            Name = category.Name,
                            Budget = category.Budget,
                            CurrentBudget = category.Budget,
                            UserId = category.UserId
                        };
                        updatedCategory.Id = category.Id;
                        await _categoryService.UpdateAsync(category.Id, updatedCategory);
                    }

                    await _userService.UpdateSavingsAsync(user.Id.ToString(), user.Savings+savings);
                    await _userService.UpdateCurrentBudgetAsync(user.Id.ToString(), user.MonthlyBudget);
                }
            }
            var result = await LoginAsync(request);
            return result.Success ? Ok(result) : BadRequest(result.Message);
        }
        private async Task<LoginResponse> LoginAsync (LoginRequest request) 
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null)
                {
                    return new LoginResponse { Message = "Invalid email/password", Success = false };
                }

                var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub,user.Id.ToString()),
                new Claim(ClaimTypes.Name,user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString())
            };

                var roles = await _userManager.GetRolesAsync(user);
                var roleClaims = roles.Select(x => new Claim(ClaimTypes.Role, x));
                claims.AddRange(roleClaims);

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("7AHevdx6ac/zUhjT7+0O/G2M63itIwbM/JGRkkGpMT0="));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
  
                var expires = DateTime.Now.AddMinutes(30);
                var token = new JwtSecurityToken(
                    issuer: "https://localhost:5001",
                    audience: "https://localhost:5001",
                    claims: claims,
                    expires: expires,
                    signingCredentials: creds);

                return new LoginResponse
                {
                    AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                    Message = "Login Seccesful",
                    Email = user?.Email,
                    Success = true,
                    UserId = user.Id.ToString()
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new LoginResponse { Success = false, Message = ex.Message };
            }

        }
        
    }
}
