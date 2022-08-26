import { useRef, useState } from "react";

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();
  const [message, setMessage] = useState("");

  const registrate = () => {
    if (passwordRef.current.value === repeatPasswordRef.current.value) {
      const newUser = {
        email: emailRef.current.value,
        password: passwordRef.current.value
      }
      //LISAME FIREBASE-i
    } else {
      setMessage("Paroolid ei võrdu omavahel!");
    }
  }

  return ( 
    <div>
      <div>{message}</div>
      <label>Email</label> <br />
      <input ref={emailRef} type="text" /> <br />
      <label>Parool</label> <br />
      <input ref={passwordRef} type="text" /> <br />
      <label>Korda parooli</label> <br />
      <input ref={repeatPasswordRef} type="text" /> <br />
      <button onClick={registrate}>Registreeru</button>
    </div> );
}

export default SignUp;