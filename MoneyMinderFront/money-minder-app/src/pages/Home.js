export default function Home() {
  return (
    <div>
      <div className="jumbotron text-center">
        <h1>Wellcome to MoneyMinder</h1>
        <p>Track your expenses and spendings!</p>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <h3>Categories</h3>
            <p>Add your custom categories...</p>
            <p>Manage your spendings.</p>
          </div>
          <div className="col-sm-4">
            <h3>Transactions</h3>
            <p>Add your transactions for category you created</p>
            {/* <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris...
            </p> */}
          </div>
          <div className="col-sm-4">
            <h3>Budget planning</h3>
            <p>Plan your budget expenses accordingly </p>
            <p>
              Feel free to unleash true potential of knowing your expenses...
            </p>
          </div>
        </div>
      </div>
      <div className="jumbotron text-center"></div>
    </div>
  );
}
