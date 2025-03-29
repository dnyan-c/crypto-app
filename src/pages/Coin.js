import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Common/Header';
import axios from 'axios';
import Loader from '../components/Common/Loader';
import { coinObject } from '../functions/convertObject';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coin/CoinInfo';
import LineChart from '../components/Coin/LineChart';
import { BorderColor } from '@mui/icons-material';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';

function CoinPage() {
  const params = useParams();
 // console.log("PARAMS ", params);
  const coinId = params.coinId;
  console.log("coinId ------ ", params); //exe
  const [isLoading, setisLoading] = useState(true);
  const [coinData, setCoinData] = useState();
  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState({});
  const [priceType, setPriceType] = useState("price");

  useEffect(() => {
    if (coinId) {
      console.log("Get data execute..."); //exe
      getData();
    }
  }, [coinId]);

  const getData = async () => {
   // setisLoading(true);
    let coinData = await getCoinData(coinId);
    console.log("Coin DATA ===== >>>>", coinData);
    if (coinData) {
      coinObject(setCoinData,coinData);
      const prices = await getCoinPrices(coinId);
      console.log("PRICES --- ", prices);
      if (prices) {
        console.log("WOOHOOOO");
        setChartData({
          labels:[10,12,20,9,6],
          datasets:[
            {
              label:"Dataset 1",
              data: ["M","T","W","Th","F"],//Utils.numbers(NUMBER_CFG),
              BorderColor: "#3a80e9",//Utils.CHART_COLORS.red,
              backgroundColor: "transparent",//Utils.transparerntize(Utils.CHART_COLORS.red,0.5),
             // yAxisID:'y',
            },
          ],
        });
        //settingChartData(setChartData, prices);
        setisLoading(false);
      }
    }
  };

  //   axios.get(`http://localhost:5000/api/crypto/${coinId}`)
  //     .then((response) => {
  //       console.log("RESPONSE coin js >>>", response.data);
  //       coinObject(setCoinData, response.data);
  //       console.log(coinObject(setCoinData, response.data), "====COIN OBJECT===");
  //       setisLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log("ERROR coin js  >>>", error);
  //       setisLoading(false);
  //     });
  // }
  //   }, [coinId])
  // //console.log(JSON.stringify(coinData) , "====COINDATA ====" );

  return (
    <div>
      <Header />
      {isLoading ? (<Loader />) : coinData ? (<>
        <div className="grey-wrapper">
          <List coin={coinData} />
        </div>
        {/* chart js  */}
        <div className="grey-wrapper">
          <LineChart chartData={chartData} />
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