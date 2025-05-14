import { useEffect, useState } from "react";
import { collection, addDoc, serverTimestamp, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export default function AddListing() {
  const { id } = useParams();
  const { currentUser, defaultCategories } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    address: "",
    city: "",
    pinCode: "",
    category: "",
    description: "",
    adminUID: currentUser.uid,
    available: true,
  });
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const [Categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const listingsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories([...listingsData, ...defaultCategories]);
        if (id) {
          const q = await getDoc(doc(db, "listings", id));
          if (q.exists()) setFormData({ ...q.data() });
        }
      } catch (error) {
        toast.error("Error fetching listings: " + error.message);
      }
    };
    fetchListings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      if (id) {
        await updateDoc(doc(db, "listings", id), formData);
        toast.success("Listing Updated successfully!");
      } else {
        await addDoc(collection(db, "listings"), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        toast.success("Listing added successfully!");
      }
      navigate(-1);
    } catch (error) {
      toast.error("Error adding listing: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-emerald-950 p-6">
      <h1 className="text-3xl font-bold text-emerald-400 drop-shadow mb-6">{id ? "Update" : "Add New"} Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-6 rounded-xl shadow-2xl shadow-emerald-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-semibold text-gray-300">Place Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-300">Price per Night ($)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:ring-emerald-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-300">Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:ring-emerald-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-1 font-semibold text-gray-300">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-300">PIN Code</label>
            <input
              type="text"
              value={formData.pinCode}
              onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-300">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:ring-emerald-500"
              required
            >
              <option value="">Select Category</option>
              {Categories.map((item) => (
                <option value={item.name} key={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-300">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:ring-emerald-500"
            rows="4"
            required
          />
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="available"
            checked={formData.available}
            onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
            className="h-5 w-5 text-emerald-500 focus:ring-emerald-500"
          />
          <label htmlFor="available" className="text-gray-300">Available for booking</label>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="bg-emerald-600 text-black font-bold px-6 py-2 rounded hover:bg-emerald-500 disabled:bg-gray-500 transition shadow-lg"
        >
          {uploading ? 'Uploading...' : id ? 'Update Listing' : 'Add Listing'}
        </button>
      </form>
    </div>
  );
}
