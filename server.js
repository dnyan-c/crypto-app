const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

const API_KEY = "bb908490-f868-4081-9047-cb8e95104e3b";
const BASE_URL = 'https://pro-api.coinmarketcap.com/v1';
const cryptoListingLatest = `${BASE_URL}/cryptocurrency/listings/latest`;

// API Proxy Route
app.get('/api/crypto', async (req, res) => {
  try {
    const response = await axios.get(`${cryptoListingLatest}`,
      { headers: { "X-CMC_PRO_API_KEY": API_KEY } }
    );
    //console.log("RESPONSE=====>>>> ", response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/crypto/:coinId', async (req, res) => {
  try {
    const { coinId } = req.params;

    // API URLs
    const infoUrl = `${BASE_URL}/cryptocurrency/info?id=${coinId}`;
    const marketUrl = `${cryptoListingLatest}`;

    // Perform both API calls concurrently
    const [infoResponse, marketResponse] = await Promise.all([
      axios.get(infoUrl, { headers: { "X-CMC_PRO_API_KEY": API_KEY } }),
      axios.get(marketUrl, { headers: { "X-CMC_PRO_API_KEY": API_KEY } }),
    ]);

    const coinData = infoResponse.data.data[coinId];
    const marketData = marketResponse.data.data.find(coin => coin.id == coinId);
    //console.log(marketData , "MARKET DATA");
    //console.log(coinData,  "COIN DATA");
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
      price_change_percentage_24h: marketData.quote.USD.volume_change_24h,
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

app.get('/api/cryptograph/:coinId', async (req, res) => {
  const { coinId } = req.params;

  try {
    const response = await axios.get(`${BASE_URL}/cryptocurrency/quotes/latest`, {
      headers: { 'X-CMC_PRO_API_KEY': API_KEY },
      params: { symbol: coinId }
    });

    const coinData = response.data.data[coinId];
    const currentPrice = coinData.quote.USD.price;

    // Simulate 7 days of price growth data
    const simulatedData = Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      price: (currentPrice * (1 + (Math.random() - 0.5) / 10)).toFixed(2)
    })).reverse();

    res.json({ coinId, simulatedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

