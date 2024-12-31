// // import React, { useState, useEffect } from "react";
// // import { fetchTransactionsData } from "../services/SupabaseClient"; // Import đúng tên hàm

// // const TransactionsTable = () => {
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Fetch data từ fetchTransactionsData
// //   useEffect(() => {
// //     const getData = async () => {
// //       try {
// //         const transactions = await fetchTransactionsData();

// //         // Chuyển đổi block_time sang định dạng ngày giờ
// //         const transformedData = transactions.map((item) => ({
// //           ...item,
// //           block_time: new Date(item.block_time * 1000).toLocaleString(), // Convert block_time
// //         }));

// //         // Sắp xếp mặc định từ gần tới xa
// //         const sortedData = transformedData.sort(
// //           (a, b) => b.block_time - a.block_time
// //         );

// //         setData(sortedData); // Cập nhật dữ liệu vào state
// //       } catch (err) {
// //         setError("Failed to load data: " + err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     getData();
// //   }, []);

// //   if (loading) {
// //     return <div>Loading...</div>;
// //   }

// //   if (error) {
// //     return <div>{error}</div>;
// //   }

// //   return (
// //     <div>
// //       <h2>Transaction Data</h2>
// //       <table style={styles.table}>
// //         <thead>
// //           <tr>
// //             <th style={styles.header}>Signature</th>
// //             <th style={styles.header}>Block Time</th>
// //             <th style={styles.header}>Wallet</th>
// //             <th style={styles.header}>Token Address</th>
// //             <th style={styles.header}>SOL Value</th>
// //             <th style={styles.header}>Token Amount</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {data.length > 0 ? (
// //             data.map((item, index) => (
// //               <tr key={index}>
// //                 <td style={styles.cell}>{item.signature}</td>
// //                 <td style={styles.cell}>{item.block_time}</td>
// //                 <td style={styles.cell}>{item.wallet}</td>
// //                 <td style={styles.cell}>{item.token_address}</td>
// //                 <td style={styles.cell}>{item.sol_value}</td>
// //                 <td style={styles.cell}>{item.token_amount}</td>
// //               </tr>
// //             ))
// //           ) : (
// //             <tr>
// //               <td colSpan="6" style={styles.emptyRow}>No data available</td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // const styles = {
// //   table: {
// //     width: "100%",
// //     borderCollapse: "collapse",
// //   },
// //   header: {
// //     border: "1px solid #ccc",
// //     padding: "10px",
// //     textAlign: "left",
// //     backgroundColor: "#f4f4f4",
// //   },
// //   cell: {
// //     border: "1px solid #ccc",
// //     padding: "10px",
// //     textAlign: "center",
// //   },
// //   emptyRow: {
// //     textAlign: "center",
// //     padding: "20px",
// //     fontStyle: "italic",
// //     color: "#999",
// //   },
// // };

// // export default TransactionsTable;
// import React, { useState, useEffect } from "react";
// import { fetchTransactionsData } from "../services/SupabaseClient";
// import Search from "../components/Search"; // Import component tìm kiếm

// const TransactionsTable = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch data từ Supabase
//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const transactions = await fetchTransactionsData();
//         const transformedData = transactions.map((item) => ({
//           ...item,
//           block_time: new Date(item.block_time * 1000).toLocaleString(),
//         }));

//         // Sắp xếp dữ liệu
//         const sortedData = transformedData.sort(
//           (a, b) => b.block_time - a.block_time
//         );

//         setData(sortedData);
//         setFilteredData(sortedData); // Mặc định, dữ liệu lọc là dữ liệu gốc
//       } catch (err) {
//         setError("Failed to load data: " + err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getData();
//   }, []);

//   const handleSearch = (searchType, searchValue, minValue, maxValue) => {
//     // Lọc dữ liệu theo các điều kiện
//     const filtered = data.filter((item) => {
//       let match = true;

//       // Kiểm tra loại tìm kiếm (wallet hoặc inside)
//       if (searchType === "wallet" && item.wallet !== searchValue) {
//         match = false;
//       } else if (searchType === "inside" && item.inside !== searchValue) {
//         match = false;
//       }

//       // Lọc theo giá trị min/max (dựa trên trường sol_value hoặc token_amount)
//       if (minValue && item.sol_value < minValue) {
//         match = false;
//       }
//       if (maxValue && item.sol_value > maxValue) {
//         match = false;
//       }

//       return match;
//     });

//     setFilteredData(filtered);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h2>Transaction Data</h2>
//       <Search onSearch={handleSearch} /> {/* Hiển thị thanh tìm kiếm */}
//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th style={styles.header}>Signature</th>
//             <th style={styles.header}>Block Time</th>
//             <th style={styles.header}>Wallet</th>
//             <th style={styles.header}>Token Address</th>
//             <th style={styles.header}>SOL Value</th>
//             <th style={styles.header}>Token Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.length > 0 ? (
//             filteredData.map((item, index) => (
//               <tr key={index}>
//                 <td style={styles.cell}>{item.signature}</td>
//                 <td style={styles.cell}>{item.block_time}</td>
//                 <td style={styles.cell}>{item.wallet}</td>
//                 <td style={styles.cell}>{item.token_address}</td>
//                 <td style={styles.cell}>{item.sol_value}</td>
//                 <td style={styles.cell}>{item.token_amount}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" style={styles.emptyRow}>No data available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const styles = {
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//   },
//   header: {
//     border: "1px solid #ccc",
//     padding: "10px",
//     textAlign: "left",
//     backgroundColor: "#f4f4f4",
//   },
//   cell: {
//     border: "1px solid #ccc",
//     padding: "10px",
//     textAlign: "center",
//   },
//   emptyRow: {
//     textAlign: "center",
//     padding: "20px",
//     fontStyle: "italic",
//     color: "#999",
//   },
// };

// export default TransactionsTable;
import React, { useState, useEffect } from "react";
import { fetchTransactionsData } from "../services/SupabaseClient"; // Import đúng tên hàm
import Search from "./Search"; // Import component tìm kiếm

const TransactionsTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data từ fetchTransactionsData
  useEffect(() => {
    const getData = async () => {
      try {
        const transactions = await fetchTransactionsData();

        // Sắp xếp dữ liệu theo block_time (Unix timestamp)
        const sortedData = transactions.sort(
          (a, b) => b.block_time - a.block_time
        );

        setData(sortedData); // Cập nhật dữ liệu vào state
        setFilteredData(sortedData); // Dữ liệu lọc mặc định là dữ liệu gốc
      } catch (err) {
        setError("Failed to load data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleSearch = (searchType, searchValue, minValue, maxValue) => {
    if (!searchValue && !minValue && !maxValue) {
      setFilteredData(data);
      return;
    }

    // Lọc dữ liệu theo các điều kiện
    const filtered = data.filter((item) => {
      let match = true;

      // Kiểm tra loại tìm kiếm (wallet hoặc inside)
      if (searchType === "wallet" && searchValue && item.wallet !== searchValue) {
        match = false;
      } else if (searchType === "inside" && searchValue && item.inside !== searchValue) {
        match = false;
      }

      // Lọc theo giá trị min/max (dựa trên trường sol_value hoặc token_amount)
      if (minValue && item.sol_value < minValue) {
        match = false;
      }
      if (maxValue && item.sol_value > maxValue) {
        match = false;
      }

      return match;
    });

    setFilteredData(filtered);
  };

  // Chuyển đổi block_time sang định dạng ngày giờ chỉ khi hiển thị
  const transformBlockTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Transaction Data</h2>
      <Search onSearch={handleSearch} /> {/* Hiển thị thanh tìm kiếm */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.header}>Signature</th>
            <th style={styles.header}>Block Time</th>
            <th style={styles.header}>Wallet</th>
            <th style={styles.header}>Token Address</th>
            <th style={styles.header}>SOL Value</th>
            <th style={styles.header}>Token Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td style={styles.cell}>{item.signature}</td>
                <td style={styles.cell}>{transformBlockTime(item.block_time)}</td>
                <td style={styles.cell}>{item.wallet}</td>
                <td style={styles.cell}>{item.token_address}</td>
                <td style={styles.cell}>{item.sol_value}</td>
                <td style={styles.cell}>{item.token_amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={styles.emptyRow}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  header: {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "left",
    backgroundColor: "#f4f4f4",
  },
  cell: {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "center",
  },
  emptyRow: {
    textAlign: "center",
    padding: "20px",
    fontStyle: "italic",
    color: "#999",
  },
};

export default TransactionsTable;
