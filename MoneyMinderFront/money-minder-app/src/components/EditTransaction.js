import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";

export default function EditCategory(props) {
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  //const [error, setError] = useState(false);
  const [amount, setAmount] = useState(props.amount);
  const [description, setDescription] = useState(props.description);
  const [categoryId, setCategoryId] = useState(props.categoryId);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function handleChange(e) {
    console.log("uslooo")
    e.preventDefault();
    const url = "https://localhost:7024/api/Transaction/EditTransaction/"+ props.id;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        id: props.id,
        amount: amount,
        description: description,
        categoryId:props.categoryId,
        userId: localStorage.getItem('id'),
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
        if (!response.ok) {
          alert("Something is wrong");
          //showCategories = false;
          //throw new Error("Something went wrong");
        } 
      })
      .then((data) => {
        console.log(data);
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
    <form onSubmit={handleChange}>
    <>
      <button
        onClick={handleShow}
        className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      >
        Edit
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            id="editmodal"
            className="w-full max-w-sm"
            onSubmit={(e) => {
              handleClose();
              console.log("Data:");
              e.preventDefault();
              props.updateTransaction(props.id, amount, description);
            }}
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="amount"
                >
                  Amount
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="amount"
                  type="text"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="description"
                >
                  Description
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            form="editmodal"
          >
            Edit
          </button>
          <button
            className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleChange}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
    </form>
  );
}
