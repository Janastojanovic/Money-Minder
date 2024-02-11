using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MoneyMinderAPI.Models;
using MoneyMinderAPI.Services;
using MongoDB.Bson;

namespace MoneyMinderAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController:ControllerBase
    {
        private readonly CategoryService _categoryService;
        private readonly UserManager<ApplicationUser> _userManager;


        public CategoryController(CategoryService categoryService, UserManager<ApplicationUser> userManager)
        {
            _categoryService = categoryService;
            _userManager = userManager;
        }

        // Get:

        [HttpGet]
        [Route("GetAllCategories")]
        public async Task<List<Category>> Get() =>
            await _categoryService.GetAsync();

        [HttpGet]
        [Route("GetCategory/{id:length(24)}")]
        public async Task<IActionResult> Get(string id)
        {
            var category = await _categoryService.GetAsync(id);

            if (category is null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        // Post:

        //[HttpPost]
        //[Route("AddCategory")]
        //public async Task<IActionResult> Post(Category newCategory)
        //{
        //    var categories = await _categoryService.GetCategoriesForUserByUserId(newCategory.UserId);
        //    decimal amount = 0;

        //    if (categories != null)
        //    {
        //        foreach (var category in categories)
        //        {
        //            amount += category.Budget;
        //        }
        //    }
        //    else
        //    {
        //        amount = 0;
        //    }

        //    var user = await _userManager.FindByIdAsync(newCategory.UserId);
        //    if (user is null)
        //    {
        //        throw new Exception("Category must have valid user id");
        //    }

        //    if (user.MonthlyBudget - amount - newCategory.Budget < 0)
        //    {
        //        throw new Exception("You can't add this category,max budget for new category is:" + (user.MonthlyBudget - amount).ToString());
        //    }

        //    newCategory.Id = ObjectId.GenerateNewId().ToString();
        //    await _categoryService.CreateAsync(newCategory);

        //    return CreatedAtAction(nameof(Get), new { id = newCategory.Id }, newCategory);

        //}

        [HttpPost]
        [Route("AddCategory")]
        public async Task<IActionResult> Post(Category newCategory)
        {
            try
            {
                var categories = await _categoryService.GetCategoriesForUserByUserId(newCategory.UserId);
                decimal amount = 0;

                if (categories != null)
                {
                    foreach (var category in categories)
                    {
                        amount += category.Budget;
                    }
                }
                else
                {
                    amount = 0;
                }

                var user = await _userManager.FindByIdAsync(newCategory.UserId);
                if (user is null)
                {
                    return BadRequest("Category must have a valid user id");
                }

                decimal remainingBudget = user.MonthlyBudget - amount;

                if (remainingBudget - newCategory.Budget < 0)
                {
                    return BadRequest(new
                    {
                        ErrorMessage = "You can't add this category, the maximum budget for a new category is: " + remainingBudget,
                        RemainingBudget = remainingBudget
                    });
                }

                newCategory.Id = ObjectId.GenerateNewId().ToString();
                await _categoryService.CreateAsync(newCategory);

                return CreatedAtAction(nameof(Get), new { id = newCategory.Id }, newCategory);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred: " + ex.Message);
            }
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(string id)
        {
            var category = await _categoryService.GetByCategoryId(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        // Put:

        [HttpPut]
        [Route("EditCategory/{id:}")]
        public async Task<IActionResult> Update(string id, Category updatedCategory)
        {
            var category = await _categoryService.GetAsync(id);
            if (category is null)
            {
                return NotFound();
            }

            updatedCategory.Id = category.Id;

            await _categoryService.UpdateAsync(id, updatedCategory);

            return NoContent();
        }


        // Delete:

        [HttpDelete]
        [Route("DeleteCategory/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var category = await _categoryService.GetAsync(id);
            if (category is null)
            {
                return NotFound();
            }

            await _categoryService.RemoveAsync(id);

            return NoContent();
        }

        //Get for user

        [HttpGet]
        [Route("GetCategoriesByUserId/{id}")]
        public async Task<IActionResult> GetForUser(string id)
        {
            var categories = await _categoryService.GetCategoriesForUserByUserId(id);

            if (categories is null)
            {
                return NotFound();
            }

            return Ok(categories);
        }


    }
}
