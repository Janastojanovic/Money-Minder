using Microsoft.Extensions.Options;
using MoneyMinderAPI.Data;
using MoneyMinderAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace MoneyMinderAPI.Services
{
    public class CategoryService
    {
        private readonly IMongoCollection<Category> _categoryCollection;

        public CategoryService(IOptions<DatabaseSettings> databaseSettings)
        {
            var mongoClient = new MongoClient(databaseSettings.Value.Connection);
            var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);

            _categoryCollection = mongoDatabase.GetCollection<Category>(databaseSettings.Value.CategoriesCollectionName);
        }

        public async Task<List<Category>> GetAsync() =>
           await _categoryCollection.Find(_ => true).ToListAsync();

        public async Task<Category> GetAsync(string id) =>
            await _categoryCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Category newCategory) =>
            await _categoryCollection.InsertOneAsync(newCategory);

        public async Task UpdateAsync(string id, Category updatedCategory) =>
            await _categoryCollection.ReplaceOneAsync(x => x.Id == id, updatedCategory);

        public async Task RemoveAsync(string id) =>
            await _categoryCollection.DeleteOneAsync(x => x.Id == id);

        //public async Task<List<Category>> GetForUser(string userId)
        //{
        //    var filter = Builders<Category>.Filter.Eq(x => x.UserId==userId);
        //    var categories = await _categoryCollection.Find(filter).ToListAsync();
        //    return categories;
        //}
        public async Task<List<Category>> GetCategoriesForUserByUserId(string id)
        {
            var categories = new List<Category>();
            categories = await _categoryCollection.Find(x => x.UserId == id).ToListAsync();
            return categories;
        }

        public async Task<Category> GetByCategoryId(string id)
        {
            return await _categoryCollection.Find(x=>x.Id==id).FirstOrDefaultAsync();
        }
    }
}
