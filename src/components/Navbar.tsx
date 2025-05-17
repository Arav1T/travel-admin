// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// export default function Navbar() {
//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-gradient-to-r from-black via-gray-900 to-emerald-900 shadow-[0_4px_15px_rgba(0,0,0,0.7)] backdrop-blur-lg border-b border-gray-800 rounded-b-lg">
//       <div className="max-w-7xl mx-auto px-6 py-3">
//         <div className="flex justify-between items-center">
//           {/* Logo */}
//           <div className="flex items-center space-x-2">
//             <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shadow-inner shadow-emerald-800">
//               <span className="text-black font-extrabold text-lg">S</span>
//             </div>
//             <Link to="/" className="text-2xl font-extrabold text-emerald-400 tracking-wide hover:text-emerald-300 transition duration-300">
//               StayHub Admin
//             </Link>
//           </div>

//           {/* Nav Links */}
//           <div className="hidden md:flex items-center space-x-6">
//             <Link
//               to="/"
//               className="text-gray-200 hover:text-emerald-400 text-sm font-medium transition duration-300"
//             >
//               Dashboard
//             </Link>
//             <Link
//               to="/listings"
//               className="text-gray-200 hover:text-emerald-400 text-sm font-medium transition duration-300"
//             >
//               Listings
//             </Link>
//             <Link
//               to="/categories"
//               className="text-gray-200 hover:text-emerald-400 text-sm font-medium transition duration-300"
//             >
//               Categories
//             </Link>
//             <Link
//               to="/bookings"
//               className="text-gray-200 hover:text-emerald-400 text-sm font-medium transition duration-300"
//             >
//               Bookings
//             </Link>
//           </div>

//           {/* Logout Button */}
//           {currentUser && (
//             <div className="flex items-center">
//               <button
//   onClick={handleLogout}
//   className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-emerald-600 to-green-700 text-black rounded-md shadow-lg shadow-emerald-800 hover:scale-105 hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
// >
//   Logout
// </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { JSX } from 'react';

export default function Navbar(): JSX.Element {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-emerald-900 shadow-[0_4px_15px_rgba(0,0,0,0.7)] backdrop-blur-lg border-b border-gray-800 rounded-b-lg">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shadow-inner shadow-emerald-800">
              <span className="text-black font-extrabold text-lg">S</span>
            </div>
            <Link
              to="/"
              className="text-2xl font-extrabold text-emerald-400 tracking-wide hover:text-emerald-300 transition duration-300"
            >
              StayHub Admin
            </Link>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-200 hover:text-emerald-400 text-sm font-medium transition duration-300"
            >
              Dashboard
            </Link>
            <Link
              to="/listings"
              className="text-gray-200 hover:text-emerald-400 text-sm font-medium transition duration-300"
            >
              Listings
            </Link>
            <Link
              to="/categories"
              className="text-gray-200 hover:text-emerald-400 text-sm font-medium transition duration-300"
            >
              Categories
            </Link>
            <Link
              to="/bookings"
              className="text-gray-200 hover:text-emerald-400 text-sm font-medium transition duration-300"
            >
              Bookings
            </Link>
          </div>

          {/* Logout Button */}
          {currentUser && (
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-emerald-600 to-green-700 text-black rounded-md shadow-lg shadow-emerald-800 hover:scale-105 hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
