// import { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { login, signup, currentUser } = useAuth();
//   const navigate = useNavigate();
//   const [isSignUp, setIsSignUp] = useState(false);

//   useEffect(() => {
//     if (currentUser) {
//       navigate("/", { replace: true });
//     }
//   }, [currentUser, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (isSignUp) {
//         await signup(email, password);
//         toast.success("Account created successfully!");
//       } else {
//         await login(email, password);
//         toast.success("Logged in successfully!");
//       }
//       navigate("/", { replace: true });
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-emerald-900 py-12 px-4">
//       <div className="max-w-md w-full bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl shadow-2xl shadow-emerald-800">
//         <h2 className="text-3xl font-bold text-emerald-400 text-center mb-8 drop-shadow-lg">
//           {isSignUp ? "Create Account" : "Sign In"}
//         </h2>
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Email"
//             className="border border-gray-700 bg-gray-800 text-white placeholder-gray-400 w-full p-3 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="border border-gray-700 bg-gray-800 text-white placeholder-gray-400 w-full p-3 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-700 text-black font-semibold rounded-md shadow-lg hover:from-green-600 hover:to-emerald-700 hover:scale-105 transition-all duration-300"
//           >
//             {loading
//               ? "Processing..."
//               : isSignUp
//               ? "Create Account"
//               : "Sign In"}
//           </button>
//         </form>
//         <button
//           onClick={() => setIsSignUp(!isSignUp)}
//           className="mt-6 text-sm text-emerald-400 hover:text-emerald-300 transition"
//         >
//           {isSignUp
//             ? "Already have an account? Sign In"
//             : "New here? Create an account"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useEffect, useState, FormEvent, JSX } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const { login, signup, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        await signup(email, password);
        toast.success("Account created successfully!");
      } else {
        await login(email, password);
        toast.success("Logged in successfully!");
      }
      navigate("/", { replace: true });
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-emerald-900 py-12 px-4">
      <div className="max-w-md w-full bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl shadow-2xl shadow-emerald-800">
        <h2 className="text-3xl font-bold text-emerald-400 text-center mb-8 drop-shadow-lg">
          {isSignUp ? "Create Account" : "Sign In"}
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-700 bg-gray-800 text-white placeholder-gray-400 w-full p-3 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-700 bg-gray-800 text-white placeholder-gray-400 w-full p-3 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-700 text-black font-semibold rounded-md shadow-lg hover:from-green-600 hover:to-emerald-700 hover:scale-105 transition-all duration-300"
          >
            {loading
              ? "Processing..."
              : isSignUp
              ? "Create Account"
              : "Sign In"}
          </button>
        </form>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="mt-6 text-sm text-emerald-400 hover:text-emerald-300 transition"
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "New here? Create an account"}
        </button>
      </div>
    </div>
  );
};

export default Login;
