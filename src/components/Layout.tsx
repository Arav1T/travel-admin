// import { Link, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import Navbar from "./Navbar";

// export default function Layout() {
//   const { currentUser, logout } = useAuth();
//   console.log("current", currentUser);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-emerald-900 text-gray-100 font-sans">
//       <Navbar />
//       <main className="p-4 max-w-7xl mx-auto w-full">
//         <Outlet />
//       </main>
//       <footer className="text-center text-gray-400 py-6 text-sm border-t border-gray-800 mt-10">
//         &copy; {new Date().getFullYear()} StayHub. All rights reserved.
//       </footer>
//     </div>
//   );
// }

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-emerald-900 text-gray-100 font-sans">
      <Navbar />
      <main className="p-4 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
      <footer className="text-center text-gray-400 py-6 text-sm border-t border-gray-800 mt-10">
        &copy; {new Date().getFullYear()} StayHub. All rights reserved.
      </footer>
    </div>
  );
}
