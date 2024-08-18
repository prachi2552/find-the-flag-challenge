import React, { useEffect, useState } from "react";
import styles from "./challenge.module.css";

const Challenge = () => {
  const [message, setMessage] = useState("");
  const [cursor, setCursor] = useState("");
  const [flag, setFlag] = useState("");

  const nextChallenge = () => {
    fetch("/api/challenge", {
      method: "POST",
      body: JSON.stringify({ cursor }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${process.env.REACT_APP_API_Token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        setCursor(data.nextCursor);
        setFlag(data.flag);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    nextChallenge();
  }, []);

  const nextClick = () => {
    nextChallenge();
  };

  return (
    <div className={`${styles.container}`}>
      <h2>Find the flag! 🚩</h2>
      <p className={`${styles.challengeMsg}`}>{message}</p>
      {flag && (
        <p>
          <strong>Flag:</strong> {flag}
        </p>
      )}
      <button onClick={nextClick} className={`${styles.btnNext}`}>
        {(!flag && "Next") || "Done"}
      </button>
    </div>
  );
};

export default Challenge;
