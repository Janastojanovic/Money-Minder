using Microsoft.Extensions.Options;
using MoneyMinderAPI.Data;
using MoneyMinderAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace MoneyMinderAPI.Services
{
    public class TransactionService
    {
        private readonly IMongoCollection<Transaction> _transactionCollection;

        public TransactionService(IOptions<DatabaseSettings> databaseSettings)
        {
            var mongoClient = new MongoClient(databaseSettings.Value.Connection);
            var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);

            _transactionCollection = mongoDatabase.GetCollection<Transaction>(databaseSettings.Value.TransactionsCollectionName);
        }

        public async Task<List<Transaction>> GetAsync() =>
           await _transactionCollection.Find(_ => true).ToListAsync();

        public async Task<Transaction> GetAsync(string id) =>
            await _transactionCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Transaction newTransaction) =>
            await _transactionCollection.InsertOneAsync(newTransaction);

        public async Task UpdateAsync(string id, Transaction updatedTransaction) =>
            await _transactionCollection.ReplaceOneAsync(x => x.Id == id, updatedTransaction);

        public async Task RemoveAsync(string id) =>
            await _transactionCollection.DeleteOneAsync(x => x.Id == id);

        public async Task<List<Transaction>> GetForUser(string userId)
        {
            var filter = Builders<Transaction>.Filter.Eq(x => x.UserId,userId);
            var transactions = await _transactionCollection.Find(filter).ToListAsync();
            return transactions;
        }

        public async Task<List<Transaction>> GetForCategory(string categoryId)
        {
            var filter = Builders<Transaction>.Filter.Eq(x => x.CategoryId,categoryId);
            var transactions = await _transactionCollection.Find(filter).ToListAsync();
            return transactions;
        }
    }
}
