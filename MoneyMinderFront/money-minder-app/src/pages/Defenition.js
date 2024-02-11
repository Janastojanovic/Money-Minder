import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NotFound from "../components/NotFound";

export default function Defenition() {
  const [word, setWord] = useState();
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // const url = "https://httpstat.us/501";
    const url = "https://localhost:7024/api/Category/GetAllCategories";
    fetch(url)
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
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        setWord(data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);
  
  if (error === true) {
    return (
      <>
        <p>Something went wrong </p>
        <Link to="/dictionary">Return</Link>
      </>
    );
  }
  if (notFound === true) {
    return (
      <>
        <NotFound />
        <Link to="/dictionary">Return</Link>
      </>
    );
  }
  return (
    <>
      {word ? (
        <>
          <h1>Here is a defenition</h1>
          {word.map((category) => {
            return (
              <p>
                {"Id: " + category.id + " "}
                {"Name: " + category.name + " "}
                {"Budget: " + category.budget}
              </p>
            );
          })}
        </>
      ) : null}
    </>
  );
}
