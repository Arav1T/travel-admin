
// import { createContext, useContext, useEffect, useState } from "react";
// import { authAdmin } from "../firebase";
// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);

//   // Real-time auth state listener
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(authAdmin, (user) => {
//       setCurrentUser(user);
//     });
//     return unsubscribe;
//   }, []);

//   const login = (email, password) => {
//     return signInWithEmailAndPassword(authAdmin, email, password)
//     // .then(
//     //   (data) => {
//     //     setCurrentUser(data.user);
//     //   }
//     // );
//   };

//   const signup = (email, password) => {
//     return createUserWithEmailAndPassword(authAdmin, email, password)
//     // .then(
//     //   (data) => {
//     //     setCurrentUser(data.user);
//     //   }
//     // );
//   };

//   const logout = () => {
//     return signOut(authAdmin)
//     // .then(() => {
//     //   setCurrentUser(null);
//     // });
//   };

//   const defaultCategories = [
//     { id: "d1", name: "Villas", createdAt: "Origin" },
//     { id: "d2", name: "Apartments", createdAt: "Origin" },
//     { id: "d3", name: "Houseboats", createdAt: "Origin" },
//   ];
  
//   const value = { currentUser, login, logout, signup, defaultCategories};

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }


import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { authAdmin } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  defaultCategories: { id: string; name: string; createdAt: string }[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Real-time auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authAdmin, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const login = (email: string, password: string): Promise<void> => {
    return signInWithEmailAndPassword(authAdmin, email, password)
      .then((data) => {
        setCurrentUser(data.user);
      });
  };

  const signup = (email: string, password: string): Promise<void> => {
    return createUserWithEmailAndPassword(authAdmin, email, password)
      .then((data) => {
        setCurrentUser(data.user);
      });
  };

  const logout = (): Promise<void> => {
    return signOut(authAdmin)
      .then(() => {
        setCurrentUser(null);
      });
  };

  const defaultCategories = [
    { id: "d1", name: "Villas", createdAt: "Origin" },
    { id: "d2", name: "Apartments", createdAt: "Origin" },
    { id: "d3", name: "Houseboats", createdAt: "Origin" },
  ];

  const value = { currentUser, login, logout, signup, defaultCategories };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
