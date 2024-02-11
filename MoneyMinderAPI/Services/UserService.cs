using Microsoft.Extensions.Options;
using MoneyMinderAPI.Data;
using MoneyMinderAPI.Models;
using MongoDB.Driver;

namespace MoneyMinderAPI.Services
{
    public class UserService
    {
        private readonly IMongoCollection<ApplicationUser> _userCollection;

        public UserService(IOptions<DatabaseSettings> databaseSettings)
        {
            var mongoClient = new MongoClient(databaseSettings.Value.Connection);
            var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);

            _userCollection = mongoDatabase.GetCollection<ApplicationUser>(databaseSettings.Value.UsersCollectionName);
        }
        public async Task<List<ApplicationUser>> GetAsync() =>
          await _userCollection.Find(_ => true).ToListAsync();
        //public async Task<ApplicationUser> GetUserById(Guid id) =>
        //    await _userCollection.Find(x=>x.Id==id).FirstOrDefaultAsync();
        public async Task<ApplicationUser> GetAsync(string id) =>
            await _userCollection.Find(x => x.Id == Guid.Parse(id)).FirstOrDefaultAsync();
        public async Task UpdateSavingsAsync(string id, decimal savings)
        {
            var filter = Builders<ApplicationUser>.Filter.Eq(u => u.Id, Guid.Parse(id));
            var update = Builders<ApplicationUser>.Update.Set(u => u.Savings, savings);

            var result = await _userCollection.UpdateOneAsync(filter, update);
        }
        public async Task UpdateCurrentBudgetAsync(string id, decimal budget)
        {
            var filter = Builders<ApplicationUser>.Filter.Eq(u => u.Id, Guid.Parse(id));
            var update = Builders<ApplicationUser>.Update.Set(u => u.CurrentBudget, budget);

            var result = await _userCollection.UpdateOneAsync(filter, update);

        }
        public async Task UpdateUserAsync(ApplicationUser user)
        {
            var filter = Builders<ApplicationUser>.Filter.Eq(u => u.Id, user.Id);
            var update = Builders<ApplicationUser>.Update
                .Set(u => u.Name, user.Name)
                .Set(u => u.Savings, user.Savings)
                .Set(u => u.MonthlyBudget, user.MonthlyBudget)
                .Set(u => u.CurrentBudget, user.CurrentBudget)
                .Set(u => u.SalaryDate, user.SalaryDate);

            var result = await _userCollection.UpdateOneAsync(filter, update);
        }
        public async Task RemoveAsync(string id) =>
            await _userCollection.DeleteOneAsync(x => x.Id == Guid.Parse(id));


    }
}
