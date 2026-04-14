// import { useEffect, useState } from "react";
// import API from "../api/axios";

// export default function BorrowedBooks() {
//   const [books, setBooks] = useState([]);

//   const userId = localStorage.getItem("user_id");

//   useEffect(() => {
//     fetchBorrowedBooks();
//   }, []);

//   const fetchBorrowedBooks = async () => {
//     try {
//       const res = await API.get(`/borrow/${userId}`);
//       setBooks(res.data.data); // assuming backend sends { data: [] }
//     } catch (err) {
//       alert("Failed to load borrowed books");
//     }
//   };

//   const returnBook = async (borrowId) => {
//     try {
//       await API.delete(`/borrow/${borrowId}`);

//       setBooks((prev) => prev.filter((b) => b._id !== borrowId));

//       alert("Book returned successfully");
//     } catch (err) {
//       alert("Return failed");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>📖 Borrowed Books</h2>

//       {books.length === 0 ? (
//         <p>No borrowed books</p>
//       ) : (
//         books.map((b) => (
//           <div
//             key={b._id}
//             style={{
//               border: "1px solid gray",
//               padding: "10px",
//               marginBottom: "10px",
//               borderRadius: "8px",
//             }}
//           >
//             <h3>{b.book?.title}</h3>
//             <p>{b.book?.author}</p>

//             <button
//               onClick={() => returnBook(b._id)}
//               style={{
//                 backgroundColor: "green",
//                 color: "white",
//                 padding: "6px 10px",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//               }}
//             >
//               Return Book
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }