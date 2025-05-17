import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
// import { useAuth } from '../../context/AuthContext';

export default function CategoriesList() {
  const { defaultCategories } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  console.log(defaultCategories);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const categoriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories([...categoriesData, ...defaultCategories]);
      } catch (error) {
        toast.error('Error fetching categories: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteDoc(doc(db, 'categories', id));
        setCategories(categories.filter((category) => category.id !== id));
        toast.success('Category deleted successfully!');
      } catch (error) {
        toast.error('Error deleting category: ' + error.message);
      }
    }
  };

  if (loading) return <div className="text-center py-8 text-gray-300">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-emerald-950 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-emerald-400 drop-shadow">Categories</h1>
        <Link
          to="/categories/add"
          className="bg-emerald-600 hover:bg-emerald-500 text-black font-semibold px-4 py-2 rounded shadow-md transition"
        >
          + Add New
        </Link>
      </div>

      <div className="bg-gray-900 shadow-2xl shadow-emerald-800 rounded-xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-800/50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-gray-100 font-medium">
                  {category.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm">
                  {category.createdAt === "Origin"
                    ? "Default"
                    : new Date(category.createdAt?.seconds * 1000).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {category.createdAt !== "Origin" && (
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-500 hover:text-red-400 font-semibold"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
