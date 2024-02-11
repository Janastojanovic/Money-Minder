import { useState, useEffect } from "react";

export default function Dictionary() {
  const [word, setWord] = useState("");
  const [word2, setWord2] = useState("");

  useEffect(() => {
    console.log("State Updated", word + ' ' + word2);
  });

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setWord(e.target.value);
        }}
      />
      <h1>Lets get defenition for {word}</h1>
      <input
        type="text"
        onChange={(e) => {
          setWord2(e.target.value);
        }}
      />
      <h2>Lets get defenition for {word2}</h2>
    </>
  );
}
