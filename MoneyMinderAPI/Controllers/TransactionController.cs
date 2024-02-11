using Amazon.Runtime.Internal;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MoneyMinderAPI.Models;
using MoneyMinderAPI.Services;
using MongoDB.Bson;
using MongoDB.Driver;

namespace MoneyMinderAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly TransactionService _transactionService;
        private readonly CategoryService _categoryService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly UserService _userService;



        public TransactionController(TransactionService transactionService, CategoryService categoryService, UserManager<ApplicationUser> userManager, UserService userService)
        {
            _transactionService = transactionService;
            _categoryService = categoryService;
            _userManager = userManager;
            _userService = userService;
        }

        // Get:

        [HttpGet]
        [Route("GetAllTransactions")]
        public async Task<List<Transaction>> Get() =>
            await _transactionService.GetAsync();

        [HttpGet]
        [Route("GetTransaction/{id:length(24)}")]
        public async Task<IActionResult> Get(string id)
        {
            var transaction = await _transactionService.GetAsync(id);

            if (transaction is null)
            {
                return NotFound();
            }

            return Ok(transaction);
        }

        // Post:

        [HttpPost]
        [Route("AddTransaction")]
        public async Task<IActionResult> Post(Transaction newTransaction)
        {
            var trasactionId = ObjectId.GenerateNewId().ToString();

            var category = await _categoryService.GetAsync(newTransaction.CategoryId);
            var user = await _userManager.FindByIdAsync(newTransaction.UserId);  
            if (category!= null && user!= null)
            {
                if ((category.CurrentBudget - newTransaction.Amount)>=0)
                {
                    var updatedCategory = new Category
                    {   
                        Name = category.Name,
                        Budget = category.Budget,
                        CurrentBudget = category.CurrentBudget - newTransaction.Amount,
                        UserId = category.UserId
                    };
                    updatedCategory.Id=category.Id;
                    await _categoryService.UpdateAsync(category.Id, updatedCategory);

                    var currentBudgetUser = user.CurrentBudget - newTransaction.Amount;
                    await _userService.UpdateCurrentBudgetAsync(user.Id.ToString(), currentBudgetUser);
                }
                else if((user.Savings - newTransaction.Amount)>=0)
                {
                    var savings = user.Savings - newTransaction.Amount;
                    //updatedUser.Id = user.Id;
                    await _userService.UpdateSavingsAsync(user.Id.ToString(), savings);
                }
                else
                {
                    throw new Exception("Out of money!!!");
                }
                var date = DateTime.Now.Date;
                newTransaction.Date = date;
                newTransaction.Id = trasactionId;
                await _transactionService.CreateAsync(newTransaction);

                return CreatedAtAction(nameof(Get), new { id = newTransaction.Id }, newTransaction);
            }
            else 
            {
                throw new Exception("Transaction must have valid user id and category id");
            }
           

        }

        // Put:

        [HttpPut]
        [Route("EditTransaction/{id}")]
        public async Task<IActionResult> Update(string id, Transaction updatedTransaction)
        {
            var transaction = await _transactionService.GetAsync(id);
            if (transaction is null)
            {
                return NotFound();
            }
            var date = DateTime.Now.Date;
            updatedTransaction.Date = date;
            updatedTransaction.Id = transaction.Id;

            await _transactionService.UpdateAsync(id, updatedTransaction);

            return NoContent();
        }


        // Delete:

        [HttpDelete]
        [Route("DeleteTransaction/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var transaction = await _transactionService.GetAsync(id);
            if (transaction is null)
            {
                return NotFound();
            }

            await _transactionService.RemoveAsync(id);

            return NoContent();
        }

        //Get for user

        [HttpGet]
        [Route("GetTransactionsByUserId/{id}")]
        public async Task<IActionResult> GetForUser(string id)
        {
            var transactions = await _transactionService.GetForUser(id);

            if (transactions is null)
            {
                return NotFound();
            }

            return Ok(transactions);
        }

        ///Get for category

        [HttpGet]
        [Route("GetTransactionsByCategoryId/{id}")]
        public async Task<IActionResult> GetForCategory(string id)
        {
            var transactions = await _transactionService.GetForCategory(id);

            if (transactions is null)
            {
                return NotFound();
            }

            return Ok(transactions);
        }

    }
}
