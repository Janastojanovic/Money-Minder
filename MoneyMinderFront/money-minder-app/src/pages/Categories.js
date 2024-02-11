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

function Categories() {
  const showCategories = true;
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const location = useLocation();
  const navigate = useNavigate();
  function updateCategory(id, newName, newBudget) {
    const updatedCategories = categories.map((category) => {
      console.log("Kategorije:");
      console.log(category);
      if (id === category.id) {
        var newCurrentBudget = 0;
        if (newBudget >= category.budget) {
          newCurrentBudget =
            category.currentBudget + (newBudget - category.budget);
        }
        if (newBudget < category.budget) {
          if (category.currentBudget - (category.budget - newBudget) > 0) {
            newCurrentBudget =
              category.currentBudget - (category.budget - newBudget);
          } else {
            newCurrentBudget = 0;
          }
        }
        return {
          ...category,
          name: newName,
          budget: newBudget,
          currentBudget: newCurrentBudget,
        };
      }
      return category;
    });
    setCategories(updatedCategories);
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
  const [categories, setCategories] = useState();
  useEffect(() => {
    console.log("Fetching...");
    fetch(
      "https://localhost:7024/api/Category/GetCategoriesByUserId/" +
        localStorage.getItem("id"),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((response) => {
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
        console.log(data);
        if (error === false) {
          setCategories(data);
        }
      });
  }, []);

  function newCategory(name, budget, currentBudget) {
    const newCategory = {
      name: name,
      budget: budget,
      currentBudget: currentBudget,
      userId: localStorage.getItem("id"),
    };
    setCategories([...categories, newCategory]);
  }

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
      {categories ? (
        <div className="flex flex-wrap justify-center">
          {categories.map((category) => {
            const editCategory = (
              <EditCategory
                name={category.name}
                budget={category.budget}
                currentBudget={category.currentBudget}
                updateCategory={updateCategory}
                id={category.id}
              />
            );
            const deleteCategory = <DeleteCategory id={category.id} />;
            const addTransaction = <AddTransaction id={category.id} />;
            return (
              <Category
                key={category.id}
                id={category.id}
                name={category.name}
                budget={category.budget}
                currentBudget={category.currentBudget}
                img="https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg"
                editCategory={editCategory}
                deleteCategory={deleteCategory}
                addTransaction={addTransaction}
                procentage={(category.currentBudget / category.budget) * 100}
              />
            );
          })}
        </div>
      ) : null}
      <AddCategory newCategory={newCategory} />
    </div>
  );
}

export default Categories;
