using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;
using System.Runtime.CompilerServices;

namespace MoneyMinderAPI.Models
{
    [CollectionName("roles")]
    public class ApplicationRole: MongoIdentityRole<Guid>
    {
    }
}
