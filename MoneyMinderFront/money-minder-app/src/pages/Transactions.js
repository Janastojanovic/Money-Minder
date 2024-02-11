// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import NotFound from "../components/NotFound";

// export default function Transactions() {
//   const [notFound, setNotFound] = useState(false);
//   const [error, setError] = useState(false);
//   const navigate = useNavigate();
//   const [transactions, setTransactions] = useState();
//   useEffect(() => {
//     console.log("Fetching...");
//     console.log(localStorage.getItem("accessToken"));
//     fetch(
//       "https://localhost:7024/api/Transaction/GetTransactionsByUserId/" +
//         localStorage.getItem("id"),
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       }
//     )
//       .then((response) => {
//         console.log(response.status);
//         if (response.status === 404) {
//           setNotFound(true);
//         } else if (response.status === 401) {
//           navigate("/login");
//         } else if (response.status === 500) {
//           //setServerError(true);
//         }
//         if (!response.ok) {
//           setError(true);
//           //throw new Error("Something went wrong");
//         } else {
//           return response.json();
//         }
//       })
//       .then((data) => {
//         console.log(data);
//         if (error === false) {
//           setTransactions(data);
//         }
//       });
//   }, []);

//   if (error === true) {
//     return (
//       <>
//         <p>Something went wrong </p>
//         <Link to="/Transactions">Return</Link>
//       </>
//     );
//   }
//   if (notFound === true) {
//     return (
//       <>
//         <NotFound />
//         <Link to="/Transactions">Return</Link>
//       </>
//     );
//   }
//   return (
//     <>
//       {transactions ? (
//         <>
//           <h1>Here is a defenition</h1>
//           {transactions.map((transaction) => {
//             return (
//               <p key={transaction.id}>{"Budget: " + transaction.amount}</p>
//             );
//           })}
//         </>
//       ) : null}
//     </>
//   );
// }

import "../App.css";
import { useContext, useEffect, useState } from "react";
import Transaction from "../components/Transaction";
import { v4 as uuidv4 } from "uuid";
import AddCategory from "../components/AddCategory";
import DeleteTransaction from "../components/DeleteTransaction";
import EditTransaction from "../components/EditTransaction";
import Header from "../components/Header";
import AddTransaction from "../components/AddTransaction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../components/NotFound";
import { LoginContext } from "../App";

function Transactions() {
  const showCategories = true;
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const location = useLocation();
  const navigate = useNavigate();
  function updateTransaction(id, newAmount, newDescription) {
    const updatedTransactionss = transactions.map((transaction) => {
      console.log("Transakcije:");
      console.log(transaction);
      if (id === transaction.id) {
        return {
          ...transaction,
          amount: newAmount,
          description: newDescription,
        };
      }
      return transaction;
    });
    setTransactions(updatedTransactionss);
  }
  // function newCategory(name, budget, img) {
  //   const newCategory = {
  //     id: uuidv4(),
  //     name: name,
  //     budget: budget,
  //     img: img,
  //   };
  //   setCategories([...categories, newCategory]);
  // }
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);
  const [transactions, setTransactions] = useState();
  useEffect(() => {
    console.log("Fetching...");
    fetch(
      "https://localhost:7024/api/Transaction/GetTransactionsByUserId/" +
        localStorage.getItem("id"),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((response) => {
        console.log(response.status);
        if (response.status === 404) {
          setNotFound(true);
        } else if (response.status === 401) {
          navigate("/login");
        } else if (response.status === 500) {
          //setServerError(true);
        }
        if (!response.ok) {
          setError(true);
          //showCategories = false;
          //throw new Error("Something went wrong");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (error === false) {
          console.log("error false");
          setTransactions(data);
        }
      });
  }, []);

  if (error === true) {
    return (
      <>
        <p>Something went wrong </p>
        <Link to="/Transactions">Return</Link>
      </>
    );
  }
  if (notFound === true) {
    return (
      <>
        <NotFound />
        <Link to="/Transactions">Return</Link>
      </>
    );
  }
  return (
    // <div className="App bg-gray-300 min-h-screen">
    //   {showCategories ? (
    //     <div>
    //       <div className="flex flex-wrap justify-center">
    //         {categories.map((category) => {
    // const editCategory = (
    //   <EditCategory
    //     name={category.name}
    //     budget={category.budget}
    //     currentBudget={category.budget}
    //     updateCategory={updateCategory}
    //     id={category.id}
    //   />
    // );
    //           return (
    //             <Category
    //               key={category.id}
    //               id={category.id}
    //               name={category.name}
    //               budget={category.budget}
    //               currentBudget={category.budget}
    //               img="https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg"
    //               editCategory={editCategory}
    //             />
    //           );
    //         })}
    //       </div>
    //       {/* <AddCategory newCategory={newCategory} /> */}
    //     </div>
    //   ) : (
    //     <p>You cannot see the categories</p>
    //   )}
    // </div>
    // <>
    //   <h1>Here is a defenition</h1>
    //   {categories.map((category) => {
    //     return <p>{"Budget: " + category.description}</p>;
    //   })}
    // </>
    <div className="App bg-gray-300 min-h-screen">
      {transactions ? (
        <div className="flex flex-wrap justify-center">
          {transactions.map((transaction) => {
            const editCategory = (
              <EditTransaction
                amount={transaction.amount}
                description={transaction.description}
                categoryId={transaction.categoryId}
                updateTransaction={updateTransaction}
                id={transaction.id}
              />
            );
            const deleteTransaction = <DeleteTransaction id={transaction.id} />;
            return (
              <Transaction
                key={transaction.id}
                id={transaction.id}
                amount={transaction.amount}
                description={transaction.description}
                img="https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg"
                editTransaction={editCategory}
                deleteTransaction={deleteTransaction}
              />
            );
          })}
        </div>
      ) :null}
    </div>
  );
}

export default Transactions;
