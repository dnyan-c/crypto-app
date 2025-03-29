import axios from "axios";

export const getCoinData = (coinId) => {
  const myData = axios
    .get(`http://localhost:5000/api/crypto/${coinId}`)
    .then((response) => {
      if (response.data) {
        console.log("Inside get coin data..."); //exe
        console.log("Inside get coin daat", response.data);
        return response.data;
      }
    })
    .catch((e) => {
      console.log(e.message);
    });

  return myData;
};