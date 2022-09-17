import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import LogoWhyCall from "../logo banner/logo0.png"
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
    <div className="likebody" >
      <title>Slide Navbar</title>
      
      <link
        href="https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap"
        rel="stylesheet"
      />
      <div className="maine">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form onSubmit={handleClick}>
            <label className="labeleee" htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              placeholder="Username"
              required
              ref={username}
              className="logininput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="logininput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="logininput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="logininput"
              type="password"
            />
            <button className="loginbuttonn" type="submit">
              Sign In
            </button>
            
          </form>
        </div>
        <div className="login">
        <form>
        <Link to ="/loginn" >
            <label className="labeleee" htmlFor="chk" aria-hidden="true">
              Login
            </label>
            </Link>
            
           
          </form>
        </div>
      </div>
      </div>
    </>
  );
}
