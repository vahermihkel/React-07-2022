import { useRef, useState } from "react";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState("");

  const login = () => {
    const loggedInUser = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    // KONTROLLIME FIREBASE-st
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