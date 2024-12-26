const axios = require("axios");
const baseUrl = "https://api.dexscreener.com";
const MAX_REQUESTS_PER_MINUTE = 300;
const { fetchTotalbuy_token } = require("../services/SupabaseClient"); // Sử dụng require vì đồng nhất cú pháp

// Hàm lấy dữ liệu token
const fetchTokenData = async (listTokenAddress) => {
  const allResults = [];
  const processedTokens = new Set();
  let processedCount = 0;

  for (const token of listTokenAddress) {
    if (processedTokens.has(token)) continue; // Bỏ qua token đã xử lý

    const endpoint = `/latest/dex/tokens/${token}`;
    try {
      const response = await axios.get(`${baseUrl}${endpoint}`);
      processedCount++;

      const pairs = response.data?.pairs || [];
      if (pairs.length) {
        const oldestPair = getOldestPair(pairs);
        if (oldestPair) allResults.push(oldestPair);
      }

      processedTokens.add(token);

      // Kiểm tra giới hạn số yêu cầu mỗi phút
      if (processedCount >= MAX_REQUESTS_PER_MINUTE) {
        processedCount = 0;
        console.log("Đang chờ để tránh vượt giới hạn API...");
        await new Promise((resolve) => setTimeout(resolve, 61000)); // Đợi 61 giây
      }
    } catch (error) {
      console.error(`Lỗi khi lấy dữ liệu cho token ${token}:`, error.message);
    }
  }

  console.log("Dữ liệu token:", JSON.stringify(allResults, null, 2));
};

// Hàm lấy cặp giao dịch cũ nhất
const getOldestPair = (pairs) => {
  let oldestPair = null;
  let oldestTimestamp = Infinity;

  pairs.forEach((pair) => {
    if (isValidPair(pair) && Number(pair.pairCreatedAt) < oldestTimestamp) {
      oldestTimestamp = Number(pair.pairCreatedAt);
      oldestPair = pair;
    }
  });

  return oldestPair;
};

// Hàm kiểm tra tính hợp lệ của cặp giao dịch
const isValidPair = (pair) => {
  const requiredFields = ["baseToken", "pairCreatedAt", "marketCap"];
  return requiredFields.every((field) => field in pair) && pair.baseToken.symbol;
};

// Hàm chạy chính
const main = async () => {
  try {
    const tokens = await fetchTotalbuy_token(); // Lấy token_address từ cơ sở dữ liệu
    if (!Array.isArray(tokens) || tokens.length === 0) {
      console.error("Không có token nào được lấy từ cơ sở dữ liệu.");
      return;
    }

    await fetchTokenData(tokens); // Gọi hàm để lấy dữ liệu token
  } catch (error) {
    console.error("Lỗi khi chạy chương trình chính:", error.message);
  }
};

// Gọi hàm chính
main();
