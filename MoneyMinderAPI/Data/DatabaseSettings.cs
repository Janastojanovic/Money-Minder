namespace MoneyMinderAPI.Data
{
    public class DatabaseSettings
    {

        public string Connection { get; set; }
        public string DatabaseName { get; set; }
        public string UsersCollectionName { get; set; }
        public string TransactionsCollectionName { get; set; }
        public string CategoriesCollectionName { get; set; }
    }
}
