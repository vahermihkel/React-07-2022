import React, { useState } from "react";

const AuthContext = React.createContext(null) // <- siia sulgude sisse saan kirjutada,et
// kui context kasutusele võetakse ja pannakse tema muutuja peale punkt   authCtx.
// siis ta näitab neid asju


export const AuthContextProvider = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const loginHandler = () => {
    setLoggedIn(true);
    console.log("panin sisselogimise true-ks")
  }

  const logoutHandler = () => {
    setLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{
      loggedIn: isLoggedIn,
      login: loginHandler,
      logout: logoutHandler
      }}>
      {props.children}
    </AuthContext.Provider>);
} 


export default AuthContext;