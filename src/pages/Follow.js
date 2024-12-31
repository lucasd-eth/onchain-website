// // import React from "react";

// // const Follow = () => {
// //     return (
// //         <div>
// //                     <h1>cho phép gắn nhãn(có thể là kol), thể hiện một phần nội dung ví(short details) lấy từ gmgn hoặc solscan, có chứa link</h1>
// //                     <h2>Mục tiêu: tiếp cận nhanh, dễ nhìn, basic </h2>

// //         </div>
// //     )
// // }

// // export default Follow;
// import React, { useState, useEffect } from "react";
// import FollowDashboard from "../components/FollowDashboard";

// const Follow = () => {
//   const [wallets, setWallets] = useState([]); // Mảng rỗng mặc định
//   const [labels, setLabels] = useState([]); // Mảng rỗng mặc định

//   useEffect(() => {
//     // Lấy dữ liệu từ các dịch vụ
//     Promise.all([getWallets(), getLabels()])
//       .then(([walletsData, labelsData]) => {
//         setWallets(walletsData || []); // Đảm bảo dữ liệu là mảng
//         setLabels(labelsData || []); // Đảm bảo dữ liệu là mảng
//       })
//       .catch((error) => {
//         console.error("Error fetching data", error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Followed Wallets</h1>
//       {/* Truyền wallets và labels vào FollowDashboard */}
//       <FollowDashboard wallets={wallets} labels={labels} />
//     </div>
//   );
// };

// export default Follow;


