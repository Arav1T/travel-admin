import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export default function ListingsList() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(db, "listings"), where('adminUID', '==', currentUser.uid)));
        const listingsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListings(listingsData);
        console.log("adminlisting",listingsData);
        
      } catch (error) {
        toast.error("Error fetching listings: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, [currentUser]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await deleteDoc(doc(db, "listings", id));
        setListings(listings.filter((listing) => listing.id !== id));
        toast.success("Listing deleted successfully!");
      } catch (error) {
        toast.error("Error deleting listing: " + error.message);
      }
    }
  };

  if (loading) return <div className="text-center py-8 text-gray-300">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-emerald-950 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-emerald-400 drop-shadow">Your Listings</h1>
        <Link
          to="/listings/add"
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-500 shadow-lg transition"
        >
          Add New Listing
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div key={listing.id} className="bg-gray-800 p-6 rounded-lg shadow-xl shadow-emerald-800 text-white">
            <img
              src={listing.imageUrl}
              alt={listing.name}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h2 className="font-bold text-emerald-300">{listing.name}</h2>
            <p className="text-gray-400">${listing.price}/night</p>
            <div className="flex justify-between mt-4">
              <Link
                to={`/listings/edit/${listing.id}`}
                className="text-emerald-500 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(listing.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
