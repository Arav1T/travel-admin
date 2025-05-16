// import { createContext, useContext, useEffect, useState } from "react";
// import {  authAdmin } from "../firebase";
// import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   // const navigate= useNavigate()
//   const [currentUser, setCurrentUser] = useState(null);
//   // const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   const unsubscribe = onAuthStateChanged(authAdmin, (user) => {
//   //     setCurrentUser(user);
//   //     setLoading(false);
//   //   });
//   //   return unsubscribe;
//   // }, []);

//   const login = (email, password) => {
//     // return signInWithEmailAndPassword(authAdmin, email, password);
//     const val=signInWithEmailAndPassword(authAdmin,email,password).then(data=>{
//       setCurrentUser(data.user)
//       console.log(data.user);
//       // navigate('/')
//     }
//     )
    
    
//   };

//   const logout = () => {
//     // return signOut(authAdmin);
//     signOut(authAdmin)
//     setCurrentUser(null)
//     // navigate('/login')
    
//   };
//   const signup = (email, password) => {
//     // return createUserWithEmailAndPassword(authAdmin, email, password);
//     createUserWithEmailAndPassword(authAdmin, email, password).then(data=>{
//       setCurrentUser(data.user)
//       // navigate('/')

//     })
//   };

//   const defaultCategories=[
//     {id:'d1',name:'Villas',createdAt:"Origin"},
//     {id:'d2',name:'Apartments',createdAt:"Origin"},
//     {id:'d3',name:'Houseboats',createdAt:"Origin"},
  
  
//   ]

//   const value = { currentUser, login, logout, defaultCategories, signup };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

import { createContext, useContext, useEffect, useState } from "react";
import { authAdmin } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // Real-time auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authAdmin, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(authAdmin, email, password)
    // .then(
    //   (data) => {
    //     setCurrentUser(data.user);
    //   }
    // );
  };

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(authAdmin, email, password)
    // .then(
    //   (data) => {
    //     setCurrentUser(data.user);
    //   }
    // );
  };

  const logout = () => {
    return signOut(authAdmin)
    // .then(() => {
    //   setCurrentUser(null);
    // });
  };

  const defaultCategories = [
    { id: "d1", name: "Villas", createdAt: "Origin" },
    { id: "d2", name: "Apartments", createdAt: "Origin" },
    { id: "d3", name: "Houseboats", createdAt: "Origin" },
  ];
  
  const value = { currentUser, login, logout, signup, defaultCategories};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
