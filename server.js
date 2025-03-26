const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// API Proxy Route
app.get('/api/crypto', async (req, res) => {
  try {
    const response = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", {
      headers: {
        "X-CMC_PRO_API_KEY": "bb908490-f868-4081-9047-cb8e95104e3b"
      }
    });
    console.log("RESPONSE=====>>>> ",response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

