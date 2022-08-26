import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from 'react-toastify';

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();
  const firebaseUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDBcdr_r5o-po2nAT8VBLbhFfcuFMx0BLA";
  const [message, setMessage] = useState("");
  const { t } = useTranslation();

  const registrate = () => {
    if (passwordRef.current.value === repeatPasswordRef.current.value) {
      const newUser = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        returnSecureToken: true
      }
      fetch(firebaseUrl,{
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json()) // body+headers+http status code+time
        .then(body => {
          if (body.error) {
            setMessage(t(body.error.message));
          } else {
            setMessage("");
            toast.success("Edukalt lisatud uus kasutaja!", {
              position: "bottom-right",
              theme: "dark"
            });
          }
        });
    } else {
      setMessage("Paroolid ei võrdu omavahel!");
    }
  }

  return ( 
    <div>
       <ToastContainer />
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