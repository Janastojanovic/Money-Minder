using AspNetCore.Identity.MongoDbCore.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using MongoDbGenericRepository.Attributes;

namespace MoneyMinderAPI.Models
{
    [CollectionName("users")]
    public class ApplicationUser : MongoIdentityUser<Guid>
    {
        public string Name { get; set; } =  string.Empty;

        public decimal Savings { get; set; }= decimal.Zero;

        public decimal MonthlyBudget { get; set; }=decimal.Zero;

        public decimal CurrentBudget { get; set;}=decimal.Zero;

        public DateTime SalaryDate { get; set; }=DateTime.Now.Date;

    }
}
