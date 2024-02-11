import "../App.css";
import { useContext, useEffect, useState } from "react";
import Category from "../components/Category";
import { v4 as uuidv4 } from "uuid";
import AddCategory from "../components/AddCategory";
import DeleteCategory from "../components/DeleteCategory";
import EditCategory from "../components/EditCategory";
import Header from "../components/Header";
import AddTransaction from "../components/AddTransaction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../components/NotFound";
import { LoginContext } from "../App";
import DeleteProfile from "../components/DeleteProfile";
import Prof from "../components/Prof";

function Profile() {
  const navigate = useNavigate();
  // function updateUser(id, newName, newMonthlyBudget) {
  //   const updatedCategories = categories.map((category) => {
  //     console.log("Kategorije:");
  //     console.log(category);
  //     if (id === category.id) {
  //       var newCurrentBudget = 0;
  //       if (newBudget >= category.budget) {
  //         newCurrentBudget =
  //           category.currentBudget + (newBudget - category.budget);
  //       }
  //       if (newBudget < category.budget) {
  //         if (category.currentBudget - (category.budget - newBudget) > 0) {
  //           newCurrentBudget =
  //             category.currentBudget - (category.budget - newBudget);
  //         } else {
  //           newCurrentBudget = 0;
  //         }
  //       }
  //       return {
  //         ...category,
  //         name: newName,
  //         budget: newBudget,
  //         currentBudget: newCurrentBudget,
  //       };
  //     }
  //     return category;
  //   });
  //   setCategories(updatedCategories);
  // }
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState();
  useEffect(() => {
    console.log("Fetching...");
    fetch(
      "https://localhost:7024/api/User/GetUser/" +
        localStorage.getItem("id"),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true);
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
        console.log(data);
        if (error === false) {
          setUser(data);
        }
      });
  }, []);

  // function newCategory(name, budget, currentBudget) {
  //   const newCategory = {
  //     name: name,
  //     budget: budget,
  //     currentBudget: currentBudget,
  //     userId: localStorage.getItem("id"),
  //   };
  //   setCategories([...categories, newCategory]);
  // }

  if (error === true) {
    return (
      <>
        <p>Something went wrong </p>
        <Link to="/Home">Return</Link>
      </>
    );
  }
  if (notFound === true) {
    return (
      <>
        <NotFound />
        <Link to="/Home">Return</Link>
      </>
    );
  }
  return (
    <div className="App bg-gray-300 min-h-screen">
      {user ? (
        <div className="flex flex-wrap justify-center">
              <Prof
                key={user.id}
                id={user.id}
                name={user.name}
                monthlyBudget={user.monthlyBudget}
                currentBudget={user.currentBudget}
                savings={user.savings}
                salaryDate={user.salaryDate}
                email={user.email}
                img="https://cdn150.picsart.com/upscale-245339439045212.png"
              />
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
