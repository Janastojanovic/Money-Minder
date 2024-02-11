using System.ComponentModel.DataAnnotations;

namespace MoneyMinderAPI.DTOs
{
    public class RegisterRequest
    {
        [Required,EmailAddress]
        public string Email { get; set; }= string.Empty;
        public string Username { get; set; } = string.Empty;
        [Required,DataType(DataType.Password)]
        public string Password { get; set; }= string.Empty;
        [Required,DataType(DataType.Password),Compare(nameof(Password),ErrorMessage ="Passwors do not match")]
        public string ConfirmPassword {  get; set; }= string.Empty;
        [Required]
        public string Name { get; set; } = string.Empty;
        public decimal Savings { get; set; }= decimal.Zero;
        public decimal MonthlyBudget { get; set; } = decimal.Zero;

        public DateTime SalaryDate { get; set; } = DateTime.Now;

    }
}
