// ../api/DexscreenApi.js
import axios from "axios";

const baseUrl = "https://api.dexscreener.com";
const MAX_REQUESTS_PER_MINUTE = 300;

// Helper function to get the oldest trading pair
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

// Helper function to validate a trading pair
const isValidPair = (pair) => {
  const requiredFields = ["baseToken", "pairCreatedAt", "marketCap"];
  return requiredFields.every((field) => field in pair) && pair.baseToken.symbol;
};

// Function to fetch data for a list of token addresses
export const fetchTokenData = async (listTokenAddress) => {
  const allResults = [];
  const processedTokens = new Set();
  let processedCount = 0;

  for (const token of listTokenAddress) {
    if (processedTokens.has(token)) continue;

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

      if (processedCount >= MAX_REQUESTS_PER_MINUTE) {
        processedCount = 0;
        await new Promise((resolve) => setTimeout(resolve, 61000)); // Wait 61 seconds
      }
    } catch (error) {
      console.error(`Error fetching data for token ${token}:`, error);
    }
  }
  return allResults;
};
