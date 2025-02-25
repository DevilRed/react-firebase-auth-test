import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notice, setNotice] = useState("");

  const signupWithUsernameAndPassword = async (e) => {
    e.preventDefault();
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (password.length < 8) {
      setNotice("Password must have a minimum 8 characters");
      return;
    } else if (specialChars.test(password) == false) {
      setNotice("Password must have one special character at least");
      return;
    }

    if (password === confirmPassword) {
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        navigate("/");
        getToken(response);// save to ls
      } catch (error) {
        // console.log(error.code, error.message);
        if (error.code === "auth/email-already-in-use") {
          setNotice("Email is already in use, please use another email");
        } else {
          setNotice("Sorry, something went wrong. Please try again.");
        }
      }
    } else {
      setNotice("Passwords don't match. Please try again.");
    }
  };
  const getToken = (response) => {
    const { user } = response;
    const token = user.auth.currentUser.accessToken;
    console.log(token);
    // save to local storage?
  }

  return (
    <div className="container">
      <h3 className="fs-4 text-center">Register</h3>
      <div className="row justify-content-center">
        <form
          className="col-md-4 mt-3 pt-3 pb-3"
          onSubmit={signupWithUsernameAndPassword}
        >
          {"" !== notice && (
            <div className="alert alert-warning" role="alert">
              {notice}
            </div>
          )}
          <div className="form-floating mb-3">
            <input
              id="signupEmail"
              type="email"
              required
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label htmlFor="signupEmail" className="form-label">
              Email Address
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              id="signupPassword"
              type="password"
              required
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <label htmlFor="signupPassword" className="form-label">
              Password
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              id="confirmPassword"
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary pt-3 pb-3">
              Signup
            </button>
          </div>
          <div className="mt-3 text-center">
            <span>
              Go back to login? <Link to="/">Click here.</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
