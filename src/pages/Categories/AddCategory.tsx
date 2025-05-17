// import { useState } from 'react';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { db } from '../../firebase';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// export default function AddCategory() {
//   const [name, setName] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name.trim()) {
//       toast.error('Category name cannot be empty');
//       return;
//     }

//     setLoading(true);
//     try {
//       await addDoc(collection(db, 'categories'), {
//         name: name.trim(),
//         createdAt: serverTimestamp(),
//       });
//       toast.success('Category added successfully!');
//       navigate('/categories');
//     } catch (error) {
//       toast.error('Error adding category: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-emerald-950 p-4">
//       <div className="w-full max-w-md bg-gray-900 p-6 rounded-xl shadow-2xl shadow-emerald-800">
//         <h1 className="text-3xl font-bold text-emerald-400 mb-6 text-center drop-shadow">Add New Category</h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block mb-1 text-gray-300 font-medium">Category Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full px-4 py-2 bg-gray-800 text-gray-100 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               placeholder="e.g., Villa, Apartment, Houseboat"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 rounded bg-emerald-600 text-black font-semibold hover:bg-emerald-500 transition disabled:bg-gray-600"
//           >
//             {loading ? 'Adding...' : 'Add Category'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import { JSX, useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AddCategory(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Category name cannot be empty');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'categories'), {
        name: name.trim(),
        createdAt: serverTimestamp(),
      });
      toast.success('Category added successfully!');
      navigate('/categories');
    } catch (error: any) {
      toast.error('Error adding category: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-emerald-950 p-4">
      <div className="w-full max-w-md bg-gray-900 p-6 rounded-xl shadow-2xl shadow-emerald-800">
        <h1 className="text-3xl font-bold text-emerald-400 mb-6 text-center drop-shadow">Add New Category</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-gray-300 font-medium">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-gray-100 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g., Villa, Apartment, Houseboat"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded bg-emerald-600 text-black font-semibold hover:bg-emerald-500 transition disabled:bg-gray-600"
          >
            {loading ? 'Adding...' : 'Add Category'}
          </button>
        </form>
      </div>
    </div>
  );
}
