import axios from "axios";

export const getCoinPrices = (coinId) => {
  const prices = axios
    .get(`http://localhost:5000/api/crypto/${coinId}`)
    .then((response) => {
      if (response.data) {
      //  console.log("Inside get coin prices data RESPONSE DATA ", response.data );
        console.log("Inside get coin  prices data...");
        console.log("Inside get coin prices data RESPONSE DATA current price", response.data.current_price );
        console.log("Inside get coin prices data ", response.data?.quote?.USD?.price );
        return response.data.current_price;
      }
    })
    .catch((e) => {
      console.log(e.message);
    });

  return prices;
};