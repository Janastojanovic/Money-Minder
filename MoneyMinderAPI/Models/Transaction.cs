using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using MongoDbGenericRepository.Attributes;

namespace MoneyMinderAPI.Models
{
    [CollectionName("transactions")]
    public class Transaction
    {
        [BsonId]
        //[BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("amount")]
        public decimal Amount { get; set; } = decimal.Zero;

        [BsonElement("date")]
        public DateTime Date { get; set; }= DateTime.Now.Date;

        [BsonElement("description")]
        public string Description { get; set; }=string.Empty;

        [BsonElement("category")]
        public string CategoryId { get; set; }

        [BsonElement("user")]
        public string UserId { get; set; }
    }
}
