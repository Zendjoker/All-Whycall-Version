import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import LogoWhyCall from "../logo banner/logo0.png"
export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <>
    <div className="likebody">
      <title>Slide Navbar</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap"
        rel="stylesheet"
      />
      <div className="maine">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
           <form className="loginBox" onSubmit={handleClick}>
            <label className="labeleee" htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
             <input
              placeholder="Email"
              type="email"
              required
              className="logininput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="logininput"
              ref={password}
            />
            
            <button className="loginbuttonn" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            
          </form>
        </div>
        <div className="login">
          
            <Link to = "/registerr">
            <label  className="labeleee" htmlFor="chk" aria-hidden="true">
                {isFetching ? (
                    <CircularProgress color="white" size="20px" />
                  ) : (
                    "New Account"
                  )}
            </label>
        </Link>
        
        </div>
      </div>
      </div>
    </>
  );
}
