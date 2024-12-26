import React, { useEffect, useState } from "react";
import GalleryView from "../components/GalleryView";
import { fetchTotalbuy_token } from "../services/SupabaseClient";
import { fetchTokenData } from "../api/DexscreenApi"; // Import hàm từ DexscreenApi.js

const Watchlist = () => {
  // Initialize state for data, loading, and error
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from Supabase when the component mounts
  useEffect(() => {
    const getWatchlistData = async () => {
      try {
        const rawWatchlistData = await fetchTotalbuy_token(); // Lấy token_address từ cơ sở dữ liệu
        const tokenAddresses = rawWatchlistData.map((item) => item.token_address); // Trích xuất danh sách token_address

        // Lấy dữ liệu từ Dexscreen API
        const tokenData = await fetchTokenData(tokenAddresses);

        // Tạo dữ liệu cho GalleryView
        const watchlistData = tokenAddresses.map((tokenAddress) => {
          const tokenInfo = tokenData.find(
            (token) => token.baseToken.address === tokenAddress
          );

          return {
            title: tokenInfo?.baseToken?.symbol,
            description: tokenAddress,
            image: tokenInfo?.info?.openGraph || "/bitcoinfirework.jpg", // Sử dụng OpenGraph hoặc ảnh mặc định
          };
        });

        setData(watchlistData); // Cập nhật dữ liệu cho GalleryView
      } catch (err) {
        setError("Failed to load data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    getWatchlistData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner or message while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Display error if fetching fails
  }

  return (
    <div>
      <h1>Các đồng coins nổi bật: </h1>
      <GalleryView items={data} />
    </div>
  );
};

export default Watchlist;
