import { createClient } from "@supabase/supabase-js";

const supabaseurl = process.env.REACT_APP_SUPABASE_URL;
const supabasekey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseurl,supabasekey);

export const fetchWalletData = async () => {
    const { data, error } = await supabase.from("potential_wallets").select("*");
     if (error) {
      console.error("Error fetching data:", error);
      return [];
    }
    return data;
  };

export const fetchTransactionsData = async () => {
    const { data, error } = await supabase.from("txns").select("*");
     if (error) {
      console.error("Error fetching data:", error);
      return [];
    }
    return data;
  };
export const fetchTotalbuy_token = async () => {
    const { data, error } = await supabase.from("totalbuy_token").select("token_address").order("total_sol_volume", { ascending: false }).limit(20);
      if (error) {
        console.error("Error fetching data:", error);
        return [];
      }
      return data;
  }
// // Import dotenv để load biến môi trường từ file .env
// import dotenv from 'dotenv';
// dotenv.config(); // Load các biến môi trường từ file .env

// import { createClient } from "@supabase/supabase-js";

// // Khởi tạo Supabase với URL và KEY từ biến môi trường
// const supabaseurl = process.env.REACT_APP_SUPABASE_URL;
// const supabasekey = process.env.REACT_APP_SUPABASE_KEY;
// const supabase = createClient(supabaseurl, supabasekey);

// // Hàm async để fetch dữ liệu từ bảng "potential_wallets"
// export const fetchWalletData = async () => {
//   try {
//     const { data, error } = await supabase.from("potential_wallets").select("*");
//     if (error) {
//       throw new Error(error.message);  // Ném lỗi nếu có
//     }
//     return data;
//   } catch (error) {
//     console.error("Error fetching data:", error); // Log lỗi nếu gặp vấn đề
//     return [];  // Trả về mảng rỗng nếu có lỗi
//   }
// };

// // Lấy dữ liệu trong hàm và log kết quả
// const getWalletData = async () => {
//   const data = await fetchWalletData();
//   console.log(data.length);  // Hiển thị dữ liệu fetched từ Supabase
// };

// getWalletData(); // Gọi hàm lấy dữ liệu
