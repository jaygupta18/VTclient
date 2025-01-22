// Packages
import React, { createContext, useState } from "react";
export const AuthenticationContext = createContext();
export default function AuthenticationContextProvider({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const authValue = {
    isAuthorized,
    setIsAuthorized,
    query,
    setQuery,
    name,
    setName,
    email,
    setEmail,
  };

  return (
    <AuthenticationContext.Provider value={authValue}>
      {children}
    </AuthenticationContext.Provider>
  );
}
