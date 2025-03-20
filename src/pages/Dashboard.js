import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import TabsComponent from '../components/Dashboard'
import axios from "axios";

function DashboardPage() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    //https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false
    axios.get("https://api.coinpaprika.com/v1/coins").then((response) => {
      //console.log("RESPONSE>>>", response);
       setCoins(response.data);
      // setPaginatedCoins(response.data.slice(0, 10));
      // setLoading(false);
    }).catch((error) => {
      console.log("ERROR>>>", error.message);
    });
  }, []); 

  return (
    <div><Header />
      <TabsComponent coins={coins}/>
    </div>
  )
}

export default DashboardPage