import React, { useState, useEffect, useMemo } from "react";
import { fetchWalletData } from "../services/SupabaseClient"; // Adjust this import if necessary

const DataTable = () => {
  // Initialize state for data, loading, and error
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from Supabase when the component mounts
  useEffect(() => {
    const getData = async () => {
      try {
        const walletData = await fetchWalletData();  // Fetch data from Supabase
        setData(walletData);  // Update the state with fetched data
      } catch (err) {
        setError("Failed to load data: " + err.message);  // Set error if something goes wrong
      } finally {
        setLoading(false);  // Stop loading after fetching data
      }
    };
    getData();
  }, []);

  // Trạng thái sắp xếp
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Hàm xử lý sự kiện khi nhấn vào tiêu đề cột để sắp xếp
  const handleSort = (column) => {
    let direction = "asc";
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc"; // Đảo chiều nếu đang sắp xếp theo cột này
    }
    setSortConfig({ key: column, direction });
  };

  // Sắp xếp dữ liệu theo tiêu chí sắp xếp
  const sortedData = useMemo(() => {
    if (sortConfig.key) {
      return [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [data, sortConfig]);

  // Hàm hiển thị mũi tên sắp xếp trong tiêu đề cột
  const renderArrow = (column) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === "asc" ? "↑" : "↓";
    }
    return "↕"; // Mũi tên mặc định khi chưa sắp xếp
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner or message while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Display error if fetching fails
  }

  return (
    <div>
      <h2>Wallet Data</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort("wallet")} style={styles.header}>
              Wallet {renderArrow("wallet")}
            </th>
            <th onClick={() => handleSort("score")} style={styles.header}>
              Score {renderArrow("score")}
            </th>
            <th onClick={() => handleSort("pumpfun")} style={styles.header}>
              Pumpfun {renderArrow("pumpfun")}
            </th>
            <th onClick={() => handleSort("winrate")} style={styles.header}>
              Winrate {renderArrow("winrate")}
            </th>
            <th onClick={() => handleSort("maxtenminutes")} style={styles.header}>
              Max 10M {renderArrow("maxtenminutes")}
            </th>
            <th onClick={() => handleSort("traded_token")} style={styles.header}>
              Traded Token {renderArrow("traded_token")}
            </th>
            <th onClick={() => handleSort("port_token")} style={styles.header}>
              Port Token {renderArrow("port_token")}
            </th>
            <th onClick={() => handleSort("num_inside")} style={styles.header}>
              Num Inside {renderArrow("num_inside")}
            </th>
            <th onClick={() => handleSort("laitren80")} style={styles.header}>
              Laitren80 {renderArrow("laitren80")}
            </th>
            <th onClick={() => handleSort("avg_roi")} style={styles.header}>
              Avg ROI {renderArrow("avg_roi")}
            </th>
            <th onClick={() => handleSort("avg_pnl_latestmonth")} style={styles.header}>
              Avg PNL (Latest Month) {renderArrow("avg_pnl_latestmonth")}
            </th>
            <th onClick={() => handleSort("pnl_latestmonth")} style={styles.header}>
              PNL (Latest Month) {renderArrow("pnl_latestmonth")}
            </th>
            <th onClick={() => handleSort("avg_pnl_threemonth")} style={styles.header}>
              Avg PNL (3 Months) {renderArrow("avg_pnl_threemonth")}
            </th>
            <th onClick={() => handleSort("pnl_threemonth")} style={styles.header}>
              PNL (3 Months) {renderArrow("pnl_threemonth")}
            </th>
            <th onClick={() => handleSort("concatenated_inside")} style={styles.header}>
              Concatenated Inside {renderArrow("concatenated_inside")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((item, index) => (
              <tr key={index}>
                <td style={styles.cell}>{item.wallet}</td>
                <td style={styles.cell}>{item.score}</td>
                <td style={styles.cell}>{item.pumpfun}</td>
                <td style={styles.cell}>{item.winrate}</td>
                <td style={styles.cell}>{item.maxtenminutes}</td>
                <td style={styles.cell}>{item.traded_token}</td>
                <td style={styles.cell}>{item.port_token}</td>
                <td style={styles.cell}>{item.num_inside}</td>
                <td style={styles.cell}>{item.laitren80}</td>
                <td style={styles.cell}>{item.avg_roi}</td>
                <td style={styles.cell}>{item.avg_pnl_latestmonth}</td>
                <td style={styles.cell}>{item.pnl_latestmonth}</td>
                <td style={styles.cell}>{item.avg_pnl_threemonth}</td>
                <td style={styles.cell}>{item.pnl_threemonth}</td>
                <td style={styles.cell}>{item.concatenated_inside}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="14" style={styles.emptyRow}>No data available</td>
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
    cursor: "pointer",
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

export default DataTable;