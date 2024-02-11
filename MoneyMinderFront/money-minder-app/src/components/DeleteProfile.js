import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";
import { LoginContext } from "../App";

export default function DeleteProfile(props) {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const navigate = useNavigate();
  //const [notFound, setNotFound] = useState(false);
  //const [error, setError] = useState(false);
  //const [name, setName] = useState(props.name);
  //const [budget, setBudget] = useState(props.budget);
  //const [currentBudget, setCurrentBudget] = useState(props.currentBudget);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  function handleChange(e) {
    console.log("uslooo")
    e.preventDefault();
    const url = "https://localhost:7024/api/User/DeleteUser/"+ props.id;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login");
        } else if (response.status === 500) {
            alert("Something is wrong");
        }
        if (response.ok) {
            localStorage.clear();
            setLoggedIn(false);
            navigate("/login");
          //showCategories = false;
          //throw new Error("Something went wrong");
        }
        else
        {
            alert("Something is wrong");
        }
      })
      .then((data) => {
        console.log(data);
        window.location.reload();
      });
  }

  return (
    <>
      <button
        onClick={handleShow}
        className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      >
        Delete profile
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            id="deletemodal"
            className="w-full max-w-sm"
            onSubmit={(e) => {
              handleClose();
              e.preventDefault();
            }}
          >
            <p>Are you sure?</p>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            form="editmodal"
            onClick={handleChange}
          >
            Yes
          </button>
          <button
            className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleClose}
          >
            No
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
