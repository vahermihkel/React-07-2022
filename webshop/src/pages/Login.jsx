import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import AuthContext from "../store/AuthContext";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState("");
  const authCtx = useContext(AuthContext);
  const firebaseUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDBcdr_r5o-po2nAT8VBLbhFfcuFMx0BLA";
  const navigate = useNavigate();

  const login = () => {
    const loggedInUser = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      returnSecureToken: true
    }
    // KONTROLLIME FIREBASE-st
    // authCtx.login();
    fetch(firebaseUrl,{
      method: "POST",
      body: JSON.stringify(loggedInUser),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()) // body+headers+http status code+time
      .then(body => {
        if (body.error.message) {
          setMessage(body.error.message);
        }
        if (body.registered) {
          let today = new Date(); // uus tänane kuupäev praeguse kellaajaga
          let expirationDate = new Date(today.getTime()+body.expiresIn*1000);
          const userData = {
            token: body.idToken,
            expires: expirationDate
          }
          sessionStorage.setItem("userData", JSON.stringify(userData));
          authCtx.login();
          navigate("/admin");
        }
      });
  }

  return ( 
    <div>
      <div>{message}</div>
      <label>Email</label> <br />
      <input ref={emailRef} type="text" /> <br />
      <label>Parool</label> <br />
      <input ref={passwordRef} type="text" /> <br />
      <button onClick={login}>Logi sisse</button>
    </div> );
}

export default Login;