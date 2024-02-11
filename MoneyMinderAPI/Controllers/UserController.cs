using Microsoft.AspNetCore.Mvc;
using MoneyMinderAPI.Models;
using MoneyMinderAPI.Services;

namespace MoneyMinderAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        public readonly CategoryService _categoryService;
        public readonly TransactionService _transactionService;
        public UserController(UserService userService,CategoryService categoryService, TransactionService transactionService)
        {
            _userService = userService;
            _categoryService = categoryService;
            _transactionService = transactionService;
        }

        // Get:

        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<List<ApplicationUser>> Get() =>
            await _userService.GetAsync();

        [HttpGet]
        [Route("GetUser/{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var user = await _userService.GetAsync(id);

            if (user is null)
            {
                return NotFound();
            }

            return Ok(user);
        }


        [HttpDelete]
        [Route("DeleteUser/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }

            var categories = await _categoryService.GetCategoriesForUserByUserId(id);
            var transactions = await _transactionService.GetForUser(id);

            if (categories == null)
            {
                foreach (var category in categories)
                {
                    _categoryService.RemoveAsync(category.Id);
                }
            }
            if (transactions == null)
            {
                foreach (var transaction in transactions)
                {
                    _transactionService.RemoveAsync(transaction.Id);
                }
            }

            await _userService.RemoveAsync(id);

            return Ok(user);
        }

        [HttpPut]
        [Route("UpdateUser/{id}")]
        public async Task<IActionResult> UpdateUser(string id,string name, decimal savings,decimal budget,DateTime date)
        {
            var existingUser = await _userService.GetAsync(id);

            if (existingUser == null)
            {
                return NotFound("User not found");
            }

            // Update the user properties
            existingUser.Name = name;
            existingUser.Savings = savings;
            if(existingUser.MonthlyBudget>budget)
            {
                existingUser.CurrentBudget = existingUser.CurrentBudget - (existingUser.MonthlyBudget-budget);
            }
            else if(budget>existingUser.MonthlyBudget)
            {
                existingUser.CurrentBudget = existingUser.CurrentBudget + (budget-existingUser.MonthlyBudget);
            }
            existingUser.MonthlyBudget = budget;
            existingUser.SalaryDate = date.AddHours(1);

            await _userService.UpdateUserAsync(existingUser);

            return NoContent();
        }


    }
}
