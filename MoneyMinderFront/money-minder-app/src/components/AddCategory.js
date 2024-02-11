import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";

function AddCategory(props) {
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [currentBudget, setCurrentBudget] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // function currentBudgetFunction(newBudget) {
  //   if (newBudget >= props.budget) {
  //     setCurrentBudget(props.currentBudget + (newBudget - props.budget));
  //   }
  //   if (newBudget < props.budget) {
  //     if (props.currentBudget - (props.budget - newBudget) > 0) {
  //       setCurrentBudget(props.currentBudget - (props.budget - newBudget));
  //     } else {
  //       setCurrentBudget(0);
  //     }
  //   }
  // }
  // function handleChange(e) {
  //   console.log("uslooo")
  //   e.preventDefault();
  //   const url = "https://localhost:7024/api/Category/AddCategory";
  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //     },
  //     body: JSON.stringify({
  //       id:'',
  //       name: name,
  //       budget: budget,
  //       currentBudget:currentBudget,
  //       userId: localStorage.getItem('id'),
  //     }),
  //   })
  //     .catch((error) => {
  //       //console.error("Error:", error.message);
  //       // Handle the error message here, e.g., display it to the user
  //       alert("Error: " + error.message);
  //     });
  //   }

  function handleChange(e) {
    e.preventDefault();
    const url = "https://localhost:7024/api/Category/AddCategory";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        id: "",
        name: name,
        budget: budget,
        currentBudget: currentBudget,
        userId: localStorage.getItem("id"),
      }),
    })
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true);
        } else if (response.status === 401) {
          navigate("/login");
        } else if (response.status === 500) {
          //setServerError(true);
        }
        // if (!response.ok) {
        //   alert("Something is wrong");
        //   //showCategories = false;
        //   //throw new Error("Something went wrong");
        // } 
        else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        if(data.remainingBudget!==undefined)
        {
          alert("You can't add this category,remaining budget is: " + data.remainingBudget)
        }
        window.location.reload();
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  }
  if (notFound === true) {
    return (
      <>
        <NotFound />
        <Link to="/categories">Return</Link>
      </>
    );
  }
  return (
    <>
      <button
        onClick={handleShow}
        className="block mx-auto m-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        + Add Category
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            id="editmodal"
            className="w-full max-w-sm"
            onSubmit={(e) => {
              e.preventDefault();
              setName("");
              setBudget("");
              props.newCategory(name, budget);
            }}
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="name"
                >
                  Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="name"
                  placeholder="Rent"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="budget"
                >
                  Budget
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="budget"
                  placeholder="100"
                  type="text"
                  value={budget}
                  onChange={(e) => {
                    //currentBudgetFunction(e.target.value);
                    setCurrentBudget(e.target.value);
                    setBudget(e.target.value);
                  }}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleChange}
            form="editmodal"
          >
            Add
          </button>
          <button
            className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleClose}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCategory;
