import React, { useEffect, useState } from "react";
import DataTable from "../components/TransactionsTable"; // Import bảng dữ liệu
import { fetchTransactionsData } from "../services/SupabaseClient"; // Import hàm fetch từ Supabase

const Transactions = () => {
  const [TransactionsData, setTransactionsData] = useState([]); // State để lưu dữ liệu
  const [loading, setLoading] = useState(true); // State để theo dõi trạng thái tải
  const [error, setError] = useState(null); // State để lưu thông báo lỗi

  useEffect(() => {
    const getTransactionsData = async () => {
      try {
        const data = await fetchTransactionsData(); // Gọi dữ liệu từ Supabase
        setTransactionsData(data); // Cập nhật state với dữ liệu thực
      } catch (err) {
        setError("Failed to fetch data: " + err.message); // Lưu lỗi nếu xảy ra
      } finally {
        setLoading(false); // Đánh dấu đã tải xong
      }
    };

    getTransactionsData(); // Gọi hàm fetch dữ liệu
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Hiển thị thông báo tải
  }

  if (error) {
    return <p>{error}</p>; // Hiển thị thông báo lỗi
  }

  return (
    <div>
      <h1>Transactions Profile</h1>
      <DataTable data={TransactionsData} /> {/* Hiển thị bảng dữ liệu */}
    </div>
  );
};

export default Transactions;
