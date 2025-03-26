import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import TabsComponent from '../components/Dashboard/Tabs'
import axios from "axios";

function DashboardPage() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/crypto")
    .then((response) => {
      console.log("RESPONSE>>>", response.data);
      setCoins(response.data.data);
    })
    .catch((error) => {
      console.log("ERROR>>>", error.message);
    });
  
  }, []);

  return (
    <div><Header />
      <TabsComponent coins={coins} />
    </div>
  )
}

export default DashboardPage