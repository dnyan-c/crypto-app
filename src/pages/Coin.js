import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Common/Header';
import axios from 'axios';
import Loader from '../components/Common/Loader';
import { coinObject } from '../functions/convertObject';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coin/CoinInfo';

function CoinPage() {
  const params = useParams();
  //console.log("PARAMS ", params);
  const coinId = params.coinId;
  const [isLoading, setisLoading] = useState(true);
  const [coinData, setCoinData] = useState();

  useEffect(() => {
    if (coinId) {
      axios.get(`http://localhost:5000/api/crypto/${coinId}`)
        .then((response) => {
          console.log("RESPONSE coin js >>>", response.data);
          coinObject(setCoinData, response.data);
          console.log(coinObject(setCoinData, response.data), "====COIN OBJECT===");
          setisLoading(false);
        })
        .catch((error) => {
          console.log("ERROR coin js  >>>", error);
          setisLoading(false);
        });
    }
  }, [coinId])
  //console.log(JSON.stringify(coinData) , "====COINDATA ====" );

  return (
    <div>
      <Header />
      {isLoading ? (<Loader />) : coinData ? (<>
        <div className="grey-wrapper">
          <List coin={coinData} />
        </div>
        <CoinInfo heading={coinData?.name || 'N/A'} desc={coinData?.desc || 'No Description Available'} />
      </>
      ) : (
        <p>no data Available</p>
      )
      }
    </div>
  );
}

export default CoinPage