<<<<<<< HEAD
import React, { createContext, useState } from "react";
 
export const AuthContext = createContext();
 
export const AuthProvider = ({ children }) => {
 
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
 
      if (!storedUser || storedUser === "undefined") {
        return null;
      }
 
=======
// import React, { createContext, useState } from "react";
 
// export const AuthContext = createContext();
 
// export const AuthProvider = ({ children }) => {
 
//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || null
//   );
 
//   const login = (data) => {
//     localStorage.setItem("token", data.token);
//     localStorage.setItem("user", JSON.stringify(data.user));
//     setUser(data.user);
//   };
 
//   const logout = () => {
//     localStorage.clear();
//     setUser(null);
//   };
 
//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser || storedUser === "undefined") {
        return null;
      }

>>>>>>> a98f331e3489bce2f6564e5380f6b091f562af62
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Invalid user data in localStorage:", error);
      return null;
    }
  });
<<<<<<< HEAD
 
=======

>>>>>>> a98f331e3489bce2f6564e5380f6b091f562af62
  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };
<<<<<<< HEAD
 
=======

>>>>>>> a98f331e3489bce2f6564e5380f6b091f562af62
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };
<<<<<<< HEAD
 
=======

>>>>>>> a98f331e3489bce2f6564e5380f6b091f562af62
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};