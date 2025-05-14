
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import Login from "./pages/Auth/Login";
import CategoriesList from "./pages/Categories/CategoriesList";
import AddCategory from "./pages/Categories/AddCategory";
import ListingsList from "./pages/Listings/ListingsList";
import AddListing from "./pages/Listings/AddListing";
import BookingsList from "./pages/Bookings/BookingsList";

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" replace />;
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ListingsList />} />
          <Route path="categories" element={<CategoriesList />} />
          <Route path="categories/add" element={<AddCategory />} />
          <Route path="listings" element={<ListingsList />} />
          <Route path="listings/add" element={<AddListing />} />
          <Route path="listings/edit/:id" element={<AddListing />} />
          <Route path="bookings" element={<BookingsList />} />
        </Route>
      </>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
