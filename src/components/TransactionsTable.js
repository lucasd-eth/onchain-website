import React, { useState, useEffect } from "react";
import { fetchTransactionsData } from "../services/SupabaseClient"; // Import đúng tên hàm

const TransactionsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data từ fetchTransactionsData
  useEffect(() => {
    const getData = async () => {
      try {
        const transactions = await fetchTransactionsData();

        // Chuyển đổi block_time sang định dạng ngày giờ
        const transformedData = transactions.map((item) => ({
          ...item,
          block_time: new Date(item.block_time * 1000).toLocaleString(), // Convert block_time
        }));

        // Sắp xếp mặc định từ gần tới xa
        const sortedData = transformedData.sort(
          (a, b) => b.block_time - a.block_time
        );

        setData(sortedData); // Cập nhật dữ liệu vào state
      } catch (err) {
        setError("Failed to load data: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Transaction Data</h2>
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
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td style={styles.cell}>{item.signature}</td>
                <td style={styles.cell}>{item.block_time}</td>
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
