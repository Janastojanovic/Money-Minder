import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

export default function Login() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  function login(e) {
    e.preventDefault();
    const url = "https://localhost:7024/api/v1/authenticate/login";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        // console.log(response.status);
        // if (!response.ok) {
        //   setError(true);
        //   console.log("if responese status === 400");
        //   console.log(error);
        //   alert("Wrong email or password");
        //   //throw new Error("Something went wrong");
        // } else {
        //   return response.json();
        // }
        console.log(response.status);
        if (!response.ok) {
          setError(true); // Postavi grešku ako zahtev nije uspeo
          alert("Wrong email or password");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(error);
        if (error !== true) {
          if (data && data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("id", data.userId);
            console.log(localStorage)
            setLoggedIn(true);
            navigate(
              location?.state?.previousUrl ? location.state.previousUrl : "/"
            );
          } else {
            console.error("Access token not found in response data.");
            // Ovde možete postaviti odgovarajuću poruku o grešci ili neki drugi postupak
          }
        }
      });
  }
  if (error === true) {
    return (
      <>
        <Login />
      </>
    );
  }
  return (
    <form className="m-2 w-full max-w-sm" id="customer" onSubmit={login}>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/4">
          <label for="email">Email</label>
        </div>

        <div className="md:w-3/4">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="email"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/4">
          <label for="password">Password</label>
        </div>

        <div className="md:w-3/4">
          <input
            id="password"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
        Login
      </button>
    </form>
  );
}
