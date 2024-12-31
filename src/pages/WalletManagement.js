import React, { useEffect, useState } from "react";
import * as FileSaver from "file-saver";
import { fetchTotalbuy_token } from "../services/SupabaseClient"; // Import hàm fetchTotalbuy_token

const ExportTokenData = () => {
  const [tokens, setTokens] = useState([]);
  const [topCount, setTopCount] = useState(10); // Mặc định là Top 10
  const [loading, setLoading] = useState(false);

  // Lấy dữ liệu từ Supabase bằng hàm fetchTotalbuy_token đã có
  const fetchTokens = async () => {
    setLoading(true);
    const data = await fetchTotalbuy_token(topCount); // Sử dụng hàm fetchTotalbuy_token
    setTokens(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTokens();
  }, [topCount]);

  // Chuyển dữ liệu thành CSV
  const downloadCSV = () => {
    const csvRows = [];
    const headers = ["Token Address", "Total Sol Volume"];
    csvRows.push(headers.join(","));

    tokens.forEach((token) => {
      csvRows.push([token.token_address, token.total_sol_volume].join(","));
    });

    const csvData = new Blob([csvRows.join("\n")], { type: "text/csv" });
    FileSaver.saveAs(csvData, `top_${topCount}_tokens.csv`);
  };

  // Hiển thị bảng dữ liệu trước khi tải về
  const renderTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Token Address</th>
            <th>Total Sol Volume</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <tr key={index}>
              <td>{token.token_address}</td>
              <td>{token.total_sol_volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1>Export Token Data</h1>

      <div>
        <button onClick={() => setTopCount(10)}>Top 10</button>
        <button onClick={() => setTopCount(50)}>Top 50</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {renderTable()}
          <button onClick={downloadCSV}>Download CSV</button>
        </>
      )}
    </div>
  );
};

export default ExportTokenData;
