export const fetchWalletDatanew = async () => {
    const { data, error } = await supabase.from("potential_wallets").select("*");
  
    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  
    console.log('Fetched Data:', data);  // In ra toàn bộ dữ liệu nhận được từ Supabase
  
    const parseConcatenatedInside = (concatenatedText) => {
      if (!concatenatedText) {
        return []; // Trả về mảng rỗng nếu giá trị là undefined hoặc null
      }
      // In giá trị trước khi xử lý
      console.log('Concatenated Inside:', concatenatedText);
      return concatenatedText.replace(/[[\]]/g, '').split(' '); // Sửa biểu thức chính quy
    };
  
    const tokenCount = {};
    
    // Duyệt qua từng ví và in ra thông tin mỗi ví
    const wallets = data.map(wallet => {
      const products = parseConcatenatedInside(wallet["Concatenated Inside"]);
      console.log('Wallet:', wallet["Wallet"], 'Products:', products); // In ra tên ví và các token đã tách
  
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
  
    // In ra danh sách ví sau khi đã xử lý
    console.log('Processed Wallets:', wallets);
  
    // In ra số lượng token
    console.log('Token Count:', tokenCount);
  
    return { wallets, tokenCount };
  };
  