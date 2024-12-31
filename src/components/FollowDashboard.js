// import React, { useState, useEffect } from "react";
// import { fetchWalletDataWithLabels, toggleFollow, updateLabel } from "../services/SupabaseClient"; // Import Supabase client functions

// const FollowDashboard = () => {
//   const [wallets, setWallets] = useState([]);
//   const [labels, setLabels] = useState([]);

//   // Fetch wallets and labels data when the component is mounted
//   useEffect(() => {
//     const loadData = async () => {
//       const { wallets: walletData, labels: labelData } = await fetchWalletDataWithLabels();
//       setWallets(walletData);
//       setLabels(labelData);
//     };
//     loadData();
//   }, []);

//   const handleToggleFollow = (wallet) => {
//     toggleFollow(wallet.walletAddress, wallet.isStarred).then((updatedData) => {
//       // Update the wallets and labels state
//       const updatedWallets = wallets.map((w) =>
//         w.walletAddress === wallet.walletAddress
//           ? { ...w, isStarred: !w.isStarred }
//           : w
//       );
//       setWallets(updatedWallets);
//     });
//   };

//   const handleUpdateLabel = (wallet, newLabel) => {
//     updateLabel(wallet.walletAddress, newLabel).then((updatedData) => {
//       // Update the labels state with the new label
//       const updatedLabels = labels.map((label) =>
//         label.walletAddress === wallet.walletAddress
//           ? { ...label, label: newLabel }
//           : label
//       );
//       setLabels(updatedLabels);
//     });
//   };

//   return (
//     <div>
//       <h1>Followed Wallet Dashboard</h1>
//       <table border="1" cellPadding="5">
//         <thead>
//           <tr>
//             <th>Follow</th>
//             <th>Wallet</th>
//             <th>Label</th>
//             <th>Score</th>
//             <th>Pumpfun</th>
//             <th>Winrate</th>
//             <th>Max 10M</th>
//             <th>Traded Token</th>
//             <th>Port Token</th>
//             <th>Num Inside</th>
//             <th>Laitren80</th>
//             <th>Avg ROI</th>
//             <th>Avg PNL (Latest Month)</th>
//             <th>PNL (Latest Month)</th>
//             <th>Avg PNL (3 Months)</th>
//             <th>PNL (3 Months)</th>
//             <th>Concatenated Inside</th>
//           </tr>
//         </thead>
//         <tbody>
//           {wallets.map((wallet) => {
//             const label = labels.find((l) => l.wallet === wallet.walletAddress);
//             return (
//               <tr key={wallet.walletAddress}>
//                 <td>
//                   <button onClick={() => handleToggleFollow(wallet)}>
//                     {wallet.isStarred ? "★" : "☆"}
//                   </button>
//                 </td>
//                 <td>
//                   <span
//                     onClick={() => {
//                       const newLabel = prompt("Enter label:", label?.label || "");
//                       if (newLabel !== null) {
//                         handleUpdateLabel(wallet, newLabel);
//                       }
//                     }}
//                   >
//                     {label?.label || wallet.walletAddress}
//                   </span>
//                 </td>
//                 <td>{wallet.score}</td>
//                 <td>{wallet.pumpfun}</td>
//                 <td>{wallet.winrate}</td>
//                 <td>{wallet.max10M}</td>
//                 <td>{wallet.tradedToken}</td>
//                 <td>{wallet.portToken}</td>
//                 <td>{wallet.numInside}</td>
//                 <td>{wallet.laitren80}</td>
//                 <td>{wallet.avgROI}</td>
//                 <td>{wallet.avgPNLMonth}</td>
//                 <td>{wallet.pnlMonth}</td>
//                 <td>{wallet.avgPNL3Months}</td>
//                 <td>{wallet.pnl3Months}</td>
//                 <td>{wallet.concatenatedInside}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FollowDashboard;
