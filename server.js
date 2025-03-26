const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

const API_KEY = "bb908490-f868-4081-9047-cb8e95104e3b";

// API Proxy Route
app.get('/api/crypto', async (req, res) => {
  try {
    const response = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      { headers: { "X-CMC_PRO_API_KEY": API_KEY } }
    );
    //console.log("RESPONSE=====>>>> ", response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// app.get('/api/crypto/:coinId', async (req, res) => {
//   try {
//     const {coinId} = req.params;
//   //  console.log("Coin ID from URL:", coinId);
//    // console.log(req ,   "     ------    ");
//   //  console.log("SERVER JS URL ----> ", `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${coinId}`);
//     const response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${coinId}`, {
//       headers: {
//         "X-CMC_PRO_API_KEY": "bb908490-f868-4081-9047-cb8e95104e3b"
//       }
//     });
//    // console.log("RESPONSE=====>>>> ", response.data);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.get('/api/crypto/:coinId', async (req, res) => {
  try {
    const { coinId } = req.params;

    // API URLs
    const infoUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${coinId}`;
    const marketUrl = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

    // Perform both API calls concurrently
    const [infoResponse, marketResponse] = await Promise.all([
      axios.get(infoUrl, { headers: { "X-CMC_PRO_API_KEY": API_KEY } }),
      axios.get(marketUrl, { headers: { "X-CMC_PRO_API_KEY": API_KEY } }),
    ]);

    const coinData = infoResponse.data.data[coinId];
    const marketData = marketResponse.data.data.find(coin => coin.id == coinId);

    if (!coinData || !marketData) {
      return res.status(404).json({ error: "Coin data not found" });
    }

    // Merged Response
    const mergedData = {
      id: coinData.id,
      name: coinData.name,
      symbol: coinData.symbol,
      slug: coinData.slug,
      image: coinData.logo,
      desc: coinData.description,
      price_change_percentage_24h: marketData.quote?.USD?.volume_change_24h,
      total_supply: marketData.total_supply,
      current_price: marketData.quote.USD.price,
      market_cap: marketData.quote.USD.market_cap,
    };
    console.log(mergedData);
    res.json(mergedData);

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

