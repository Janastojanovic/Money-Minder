using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using MongoDbGenericRepository.Attributes;
using MongoDB.Driver;

namespace MoneyMinderAPI.Models
{
    [CollectionName("categories")]
    public class Category
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("name")]
        public string Name { get; set; }=string.Empty;
        [BsonElement("budget")]
        public decimal Budget { get; set; } = decimal.Zero;
        [BsonElement("currentBudget")]
        public decimal CurrentBudget { get; set; } = decimal.Zero;
        [BsonElement("user")]
        public string UserId { get; set; }
    }
}
