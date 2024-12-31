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
export const fetchTransactions = async (searchType, searchValue, minValue, maxValue) => {
    let query = supabase.from("txns").select("*");
  
    // Lọc theo wallet hoặc inside
    if (searchType === "wallet") {
      query = query.eq("wallet", searchValue);
    } else if (searchType === "inside") {
      query = query.eq("inside", searchValue);
    }
  
    // Lọc theo giá trị min/max nếu có
    if (minValue) {
      query = query.gte("value", minValue);  // Giả sử bạn lọc theo trường 'value'
    }
  
    if (maxValue) {
      query = query.lte("value", maxValue);
    }
  
    const { data, error } = await query;
  
    if (error) {
      console.error("Lỗi khi truy vấn:", error);
      return [];
    }
  
    return data;
  };
// export const fetchTotalbuy_token = async () => {
//     const { data, error } = await supabase.from("totalbuy_token").select("token_address").order("total_sol_volume", { ascending: false }).limit(20);
//       if (error) {
//         console.error("Error fetching data:", error);
//         return [];
//       }
//       return data;
//   }
export const fetchTotalbuy_token = async (topCount) => {
  const { data, error } = await supabase
    .from("totalbuy_token")
    .select("token_address, total_sol_volume")
    .order("total_sol_volume", { ascending: false })
    .limit(topCount);

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }
  return data;
};
//xử lý đọc và tách inside thành mảng
// Hàm lấy dữ liệu từ Supabase và xử lý
export const fetchWalletDatanew = async () => {
  const { data, error } = await supabase.from("potential_wallets").select("*");

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }
  // Hàm tách chuỗi thành mảng token
  const parseConcatenatedInside = (concatenatedText) => {
    if (!concatenatedText || concatenatedText === "<nil>") {
      console.log("Concatenated Inside is empty or <nil>");
      return []; // Trả về mảng rỗng nếu giá trị là undefined, null, hoặc <nil>
    }
    console.log("Original Concatenated Inside:", concatenatedText); // In ra giá trị trước khi xử lý
    return concatenatedText.replace(/\[|\]/g, '').split(' '); // Sửa biểu thức chính quy
  };

  const tokenCount = {};

  const wallets = data.map(wallet => {
    const products = parseConcatenatedInside(wallet["concatenated_inside"]);
    products.forEach(product => {
      tokenCount[product] = (tokenCount[product] || 0) + 1;
    });

    return {
      wallet: wallet["wallet"],
      score: wallet["score"],
      pumpfun: wallet["pumpfun"],
      winrate: wallet["winrate"],
      maxtenminutes: wallet["maxtenminutes"],
      traded_token: wallet["traded_token"],
      port_token: wallet["port_token"],
      num_inside: wallet["num_inside"],
      laitren80: wallet["laitren80"],
      avg_roi: wallet["avg_roi"],
      avg_pnl_latestmonth: wallet["avg_pnl_latestmonth"],
      pnl_latestmonth: wallet["pnl_latestmonth"],
      avg_pnl_threemonth: wallet["avg_pnl_threemonth"],
      pnl_threemonth: wallet["pnl_threemonth"],
      concatenated_inside: wallet["concatenated_inside"],
      products,
    };
  });

  console.log('Processed Wallets:', wallets);  // In ra kết quả sau khi xử lý

  return { wallets, tokenCount };
};



// //danh mục follow ví 
// // Hàm lấy dữ liệu nhãn từ bảng "label_follow_wallet"
// export const fetchLabels = async () => {
//   const { data, error } = await supabase.from("label_follow_wallet").select("*");
//   if (error) {
//     console.error("Error fetching labels:", error);
//     return [];
//   }
//   return data;
// };

// // Hàm cập nhật trạng thái "is_starred" khi nhấn vào sao (follow/unfollow)
// export const toggleFollow = async (walletAddress, isStarred) => {
//   const { data, error } = await supabase
//     .from("label_follow_wallet")
//     .upsert([
//       { wallet: walletAddress, is_starred: !isStarred }  // Lật giá trị của is_starred
//     ])
//     .eq("wallet", walletAddress);  // Điều kiện xác định ví cần thay đổi

//   if (error) {
//     console.error("Error toggling follow:", error);
//   }
//   return data;
// };

// // Hàm cập nhật tên ví
// export const updateLabel = async (walletAddress, newLabel) => {
//   const { data, error } = await supabase
//     .from("label_follow_wallet")
//     .update({ label: newLabel })
//     .eq("wallet", walletAddress);  // Cập nhật tên ví trên cơ sở dữ liệu

//   if (error) {
//     console.error("Error updating label:", error);
//   }
//   return data;
// };
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
