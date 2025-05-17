// import { useEffect, useState } from 'react';
// import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
// import { db } from '../../firebase';
// import toast from 'react-hot-toast';
// import { useAuth } from '../../context/AuthContext';

// export default function BookingsList() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { currentUser } = useAuth();

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'bookings'));
//         const bookingsData = [];

//         for (const docSnap of querySnapshot.docs) {
//           const booking = { id: docSnap.id, ...docSnap.data() };
//           const listingDoc = await getDoc(doc(db, 'listings', booking.listingId));

//           if (listingDoc.exists() && listingDoc.data().adminUID === currentUser.uid) {
//             booking.listing = listingDoc.data();
//             bookingsData.push(booking);
//           }
//         }
//         setBookings(bookingsData);
//       } catch (error) {
//         toast.error('Error fetching bookings: ' + error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookings();
//   }, []);

//   const handleStatusChange = async (id, status) => {
//     try {
//       await updateDoc(doc(db, 'bookings', id), {
//         status,
//         updatedAt: new Date(),
//       });
//       setBookings(bookings.map(booking =>
//         booking.id === id ? { ...booking, status } : booking
//       ));
//       toast.success(`Booking ${status} successfully!`);
//     } catch (error) {
//       toast.error('Error updating booking: ' + error.message);
//     }
//   };

//   if (loading) return <div className="text-center py-8 text-emerald-400 text-lg">Loading bookings...</div>;

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-bold mb-6 text-emerald-400 drop-shadow-lg">Bookings</h1>

//       <div className="overflow-x-auto bg-gradient-to-br from-black via-gray-900 to-emerald-950 rounded-xl shadow-2xl shadow-emerald-800">
//         <table className="min-w-full text-sm text-gray-300">
//           <thead className="bg-gray-800 border-b border-emerald-900">
//             <tr>
//               <th className="px-6 py-4 text-left font-semibold">Listing</th>
//               <th className="px-6 py-4 text-left font-semibold">User</th>
//               <th className="px-6 py-4 text-left font-semibold">Dates</th>
//               <th className="px-6 py-4 text-left font-semibold">Total</th>
//               <th className="px-6 py-4 text-left font-semibold">Status</th>
//               <th className="px-6 py-4 text-left font-semibold">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking) => (
//               <tr key={booking.id} className="border-b border-gray-800 hover:bg-gray-900 transition">
//                 <td className="px-6 py-4 whitespace-nowrap">{booking.listing?.name || 'N/A'}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{booking.userEmail}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{booking.checkIn} → {booking.checkOut}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-emerald-400 font-semibold">${booking.totalPrice}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-3 py-1 rounded-full text-xs font-semibold 
//                     ${booking.status === 'approved'
//                       ? 'bg-emerald-800 text-emerald-300'
//                       : booking.status === 'rejected'
//                         ? 'bg-red-800 text-red-300'
//                         : 'bg-yellow-800 text-yellow-300'}`}>
//                     {booking.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap space-x-3">
//                   {booking.status === 'pending' && (
//                     <>
//                       <button
//                         onClick={() => handleStatusChange(booking.id, 'approved')}
//                         className="px-3 py-1 bg-emerald-700 text-black rounded hover:bg-emerald-600 transition"
//                       >
//                         Approve
//                       </button>
//                       <button
//                         onClick={() => handleStatusChange(booking.id, 'rejected')}
//                         className="px-3 py-1 bg-red-700 text-white rounded hover:bg-red-600 transition"
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import { JSX, useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

// Define interfaces for data structures
interface Listing {
  name: string;
  adminUID: string;
  [key: string]: any; // Optional for other listing properties
}

interface Booking {
  id: string;
  listingId: string;
  listing?: Listing;
  userEmail: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: 'pending' | 'approved' | 'rejected';
  [key: string]: any; // Optional for extra props
}

export default function BookingsList(): JSX.Element {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'bookings'));
        const bookingsData: Booking[] = [];

        for (const docSnap of querySnapshot.docs) {
          const booking = { id: docSnap.id, ...docSnap.data() } as Booking;
          const listingRef = doc(db, 'listings', booking.listingId);
          const listingDoc = await getDoc(listingRef);

          if (listingDoc.exists()) {
            const listing = listingDoc.data() as Listing;
            if (listing.adminUID === currentUser?.uid) {
              booking.listing = listing;
              bookingsData.push(booking);
            }
          }
        }
        setBookings(bookingsData);
      } catch (error: any) {
        toast.error('Error fetching bookings: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [currentUser]);

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected'): Promise<void> => {
    try {
      await updateDoc(doc(db, 'bookings', id), {
        status,
        updatedAt: new Date(),
      });
      setBookings(prev =>
        prev.map(booking =>
          booking.id === id ? { ...booking, status } : booking
        )
      );
      toast.success(`Booking ${status} successfully!`);
    } catch (error: any) {
      toast.error('Error updating booking: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8 text-emerald-400 text-lg">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400 drop-shadow-lg">Bookings</h1>

      <div className="overflow-x-auto bg-gradient-to-br from-black via-gray-900 to-emerald-950 rounded-xl shadow-2xl shadow-emerald-800">
        <table className="min-w-full text-sm text-gray-300">
          <thead className="bg-gray-800 border-b border-emerald-900">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Listing</th>
              <th className="px-6 py-4 text-left font-semibold">User</th>
              <th className="px-6 py-4 text-left font-semibold">Dates</th>
              <th className="px-6 py-4 text-left font-semibold">Total</th>
              <th className="px-6 py-4 text-left font-semibold">Status</th>
              <th className="px-6 py-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-gray-800 hover:bg-gray-900 transition">
                <td className="px-6 py-4 whitespace-nowrap">{booking.listing?.name || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.userEmail}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.checkIn} → {booking.checkOut}</td>
                <td className="px-6 py-4 whitespace-nowrap text-emerald-400 font-semibold">${booking.totalPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                    ${booking.status === 'approved'
                      ? 'bg-emerald-800 text-emerald-300'
                      : booking.status === 'rejected'
                        ? 'bg-red-800 text-red-300'
                        : 'bg-yellow-800 text-yellow-300'}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-3">
                  {booking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(booking.id, 'approved')}
                        className="px-3 py-1 bg-emerald-700 text-black rounded hover:bg-emerald-600 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(booking.id, 'rejected')}
                        className="px-3 py-1 bg-red-700 text-white rounded hover:bg-red-600 transition"
                      >
                        Reject
                      </button>
                    </>
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
