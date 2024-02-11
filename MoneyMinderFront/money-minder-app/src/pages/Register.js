import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

export default function Register() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [savings, setSavings] = useState();
  const [monthlyBudget, setMonthlyBudget] = useState();
  const [salaryDate, setSalaryDate] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  // function parseDateString(formattedDate) {
  //   const [day, month, year] = formattedDate.split("/");
  //   const paddedMonth = month.length === 1 ? "0" + month : month;
  //   const paddedDay = day.length === 1 ? "0" + day : day;
  //   const isoDateString = `${year}-${paddedMonth}-${paddedDay}T00:00:00.000Z`;
  //   return isoDateString;
  // }

  useEffect(() => {
    localStorage.clear();
    setLoggedIn(false);
  }, []);

  function login(e) {
    e.preventDefault();
    const url = "https://localhost:7024/api/v1/authenticate/register";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        name: name,
        savings: savings,
        monthlyBudget: monthlyBudget,
        salaryDate: salaryDate,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("accessToken", data.accessToken);
        //localStorage.setItem('refresh', data.refresh);
        //setLoggedIn(true);
        navigate("/login");
      });
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
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/4">
          <label for="username">Username</label>
        </div>

        <div className="md:w-3/4">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
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
      {/* <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/4">
          <label for="confirmPassword">Confirm password</label>
        </div>

        <div className="md:w-3/4">
          <input
            id="confirmPassword"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
      </div> */}
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/4">
          <label for="password">Confirm password</label>
        </div>

        <div className="md:w-3/4">
          <input
            id="password"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/4">
          <label for="name">Name</label>
        </div>

        <div className="md:w-3/4">
          <input
            id="name"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/4">
          <label for="savings">Savings</label>
        </div>

        <div className="md:w-3/4">
          <input
            id="savings"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="savings"
            value={savings}
            onChange={(e) => {
              setSavings(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/4">
          <label for="monthlyBudget">Monthly budget</label>
        </div>

        <div className="md:w-3/4">
          <input
            id="monthlyBudget"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="monthlyBudget"
            value={monthlyBudget}
            onChange={(e) => {
              setMonthlyBudget(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/4">
          <label for="salaryDate">Salary date</label>
        </div>

        <div className="md:w-3/4">
          <input
            id="salaryDate"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="salaryDate"
            value={salaryDate}
            defaultValue={"yyyy-mm-dd"}
            onChange={(e) => {
              setSalaryDate(e.target.value);
            }}
          />
        </div>
      </div>
      <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
        Register
      </button>
    </form>
  );
}
