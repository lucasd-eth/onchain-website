import React, { useEffect, useState } from "react";
import DataTable from "../components/WalletTable"; // Import bảng dữ liệu
import { data } from "react-router-dom";

const WalletDashboard = () => {
  const [walletData, setWalletData] = useState([]); // State để lưu dữ liệu
  const [loading, setLoading] = useState(true); // State để theo dõi trạng thái tải

  useEffect(() => {
    // Tạo bảng dữ liệu tĩnh thay vì gọi từ Supabase
    const fetchWalletData = () => {
      const staticData = [
        {
          id: 1,
          wallet: "0x1234...abcd",
          score: 95,
          pumpfun: "Yes",
          winrate: "85%",
          max10M: "10M",
          traded_token: "ETH, BTC",
          port_token: "SOL, ADA",
          num_inside: 3,
          laitren80: "True",
          avg_roi: "150%",
          avg_pnl_latestmonth: "$10,000",
          pnl_latestmonth: "$12,000",
          avg_pnl_threemonth: "$25,000",
          pnl_threemonthmonth: "$30,000",
          concatenated_inside: "Detail1, Detail2",
        },
        {
          id: 2,
          wallet: "0x5678...wxyz",
          score: 88,
          pumpfun: "No",
          winrate: "70%",
          max10M: "5M",
          traded_token: "MATIC, AVAX",
          port_token: "DOT, LINK",
          num_inside: 2,
          laitren80: "False",
          avg_roi: "120%",
          avg_pnl_latestmonth: "$5,000",
          pnl_latestmonth: "$6,000",
          avg_pnl_threemonth: "$15,000",
          pnl_threemonthmonth: "$18,000",
          concatenated_inside: "Detail3, Detail4",
        },
      ];
      setWalletData(staticData); // Cập nhật dữ liệu vào state
      setLoading(false); // Đánh dấu đã tải xong
    };

    fetchWalletData(); // Gọi hàm lấy dữ liệu tĩnh
  }, []); // Chạy 1 lần khi component mount

  return (
    <div>
      <h1>Wallet Profile</h1>
      {loading ? (
        <p>Loading...</p> // Hiển thị thông báo tải
      ) : (
        <DataTable data={walletData} /> // Hiển thị bảng dữ liệu tĩnh
      )}
    </div>
  );
};

export default WalletDashboard;
