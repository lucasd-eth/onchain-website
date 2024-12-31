import React, { useState } from "react";

const Search = ({ onSearch, data }) => {
  const [searchType, setSearchType] = useState("wallet"); // "wallet" or "inside"
  const [searchValue, setSearchValue] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  const handleSearch = () => {
    // Nếu không có giá trị nhập vào, trả về tất cả dữ liệu
    if (!searchValue && !minValue && !maxValue) {
      onSearch(data); // Trả về tất cả dữ liệu
      return;
    }

    // Kiểm tra và gọi hàm onSearch với các điều kiện tìm kiếm
    onSearch(searchType, searchValue, minValue, maxValue);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Dropdown chọn wallet/inside */}
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      >
        <option value="wallet">Wallet</option>
        <option value="inside">Inside</option>
      </select>

      {/* Ô nhập giá trị wallet/inside */}
      <input
        type="text"
        placeholder={`Nhập ${searchType}`}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{
          padding: "10px",
          width: "200px",
          marginRight: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      {/* Ô nhập giá trị min/max */}
      <input
        type="number"
        placeholder="Min"
        value={minValue}
        onChange={(e) => setMinValue(e.target.value)}
        style={{
          padding: "10px",
          width: "80px",
          marginRight: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <input
        type="number"
        placeholder="Max"
        value={maxValue}
        onChange={(e) => setMaxValue(e.target.value)}
        style={{
          padding: "10px",
          width: "80px",
          marginRight: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      {/* Nút Tìm kiếm */}
      <button onClick={handleSearch} style={{ padding: "10px 15px" }}>
        Tìm kiếm
      </button>
    </div>
  );
};

export default Search;
