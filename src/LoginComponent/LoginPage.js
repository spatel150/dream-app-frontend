import React, { useState } from "react";
import "../LoginPage.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // We have a few state variables for storing inputs and tracking the authentication process

  const navigate = useNavigate();

  // This hook allows the navigation to a different route. 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/users", {
        // we have a try/catch block where we make a GET request to the URL on the JSON Server. The db.json() file has an array of user objects with a username and passwird properties.
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const users = await response.json();
      // we store the JSON response inside the 'users' variable

      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      // we have a function that finds the user based on if the value of the object.property matches the properties of the username and password. for example if user.username = "admin", and the username = "admin".
      // these two match. 

      if (user) {
        // if the user exists, 
        setIsAuthenticated(true);
        // set the isAuthenticated state to true
        setErrorMessage("");
        // set the errorMessage state to an empty string. or hide the error message
        alert("Login Successful");
        // display a pop-up on the screen that says "Login Successful"
      } else {
        // otherwise
        setErrorMessage("Invlid username or password");
        // set the errorMessage state to have text "Invalid username or password"
        setIsAuthenticated(false);
        // set the isAuthenticated state to false
      }
    } catch (error) {
      console.error("Error during the authentication process", error);
      // the catch block will display an error to the console.
      setErrorMessage();
      // we 
    }
  };

  if (isAuthenticated) {
    // if isAuthenticated is true, then
    navigate("/dream");
    // navigate to the dreams (/dream) route page
    return null;
    // otherwise return null
  }


  // login-container
  // we have a login container which has a form. the from has two input boxes, username, and password.
  // we have an onSubmit event that handles form submission and calls the handleSubmit function
  // we have a button that submits the form when clicked called "Login",
  // we also display an error message in the form of conditional rendering. if the errorMessage state is true, then we display a text for the error message beneath the input boxes. 

  return (
    <>
      <div className="login-container">
        <h2 className="heading">Welcome to Dream Mentor</h2>
        <div className="login-form-wrapper">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
