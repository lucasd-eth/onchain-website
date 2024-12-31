import dotenv from 'dotenv';
dotenv.config(); // Load các biến môi trường từ file .env

import { createClient } from "@supabase/supabase-js";

// Khởi tạo Supabase với URL và KEY từ biến môi trường
const supabaseurl = process.env.REACT_APP_SUPABASE_URL;
const supabasekey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseurl, supabasekey);

// Hàm async để fetch dữ liệu từ bảng "potential_wallets"
export const fetchWalletDatanew = async () => {
  const { data, error } = await supabase.from("potential_wallets").select("*");

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }
  // Hàm tách chuỗi thành mảng token
  const parseConcatenatedInside = (concatenatedText) => {
    if (!concatenatedText || concatenatedText === "<nil>") {
      //console.log("Concatenated Inside is empty or <nil>");
      return []; // Trả về mảng rỗng nếu giá trị là undefined, null, hoặc <nil>
    }
    //console.log("Original Concatenated Inside:", concatenatedText); // In ra giá trị trước khi xử lý
    return concatenatedText.replace(/\[|\]/g, '').split(' '); // Sửa biểu thức chính quy
  };

  const tokenCount = {};

  const wallets = data.map(wallet => {
    const products = parseConcatenatedInside(wallet["concatenated_inside"]);

    console.log("Products for wallet:", wallet["wallet"], products); // In ra các sản phẩm sau khi tách

    products.forEach(product => {
      tokenCount[product] = (tokenCount[product] || 0) + 1;
    });

    return {
      wallet: wallet["Wallet"],
      score: wallet["Score"],
      pumpfun: wallet["Pumpfun"],
      winrate: wallet["Winrate"],
      max10m: wallet["Max 10M"],
      tradedToken: wallet["Traded Token"],
      portToken: wallet["Port Token"],
      numInside: wallet["Num Inside"],
      laitren80: wallet["Laitren80"],
      avgROI: wallet["Avg ROI"],
      avgPNLMonth: wallet["Avg PNL (Latest Month)"],
      pnlMonth: wallet["PNL (Latest Month)"],
      avgPNL3Months: wallet["Avg PNL (3 Months)"],
      pnl3Months: wallet["PNL (3 Months)"],
      concatenatedInside: wallet["Concatenated Inside"],
      products,
    };
  });

  //console.log('Processed Wallets:', wallets);  // In ra kết quả sau khi xử lý

  return { wallets, tokenCount };
};

fetchWalletDatanew();