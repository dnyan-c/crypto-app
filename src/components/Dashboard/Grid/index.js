import React from 'react'
import "./styles.css"
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
function Grid({ coin }) {
  return (
    <div className={`gird-container ${coin.quote?.USD?.volume_change_24h <0 && "grid-container-red"}`}>
      <div className="info-flex">
        <img src={coin.image} className="coin-logo" />
        <div className="name-col">
          <p className="coin-symbol">{coin.symbol}</p>
          <p className="coin-name">{coin.name}</p>
        </div>
      </div>
      {coin.quote?.USD?.volume_change_24h > 0 ? (
        <div className="chip-flex">
          <div className="price-chip ">{coin.quote?.USD?.volume_change_24h.toFixed(2)}%
          </div>
          <div className="icon-chip">
            <TrendingUpRoundedIcon />
          </div>
        </div>
      ) : (
        <div className="chip-flex">
          <div className="price-chip chip-red">
            {coin.quote?.USD?.volume_change_24h.toFixed(2)}%
          </div>
          <div className="icon-chip chip-red">
            <TrendingDownRoundedIcon />
          </div>
        </div>
      )}
      <div className="info-container"></div>
      <h3 className="coin-price" style={{
        color:
          coin.quote?.USD?.volume_change_24h < 0
            ? "var(--red)"
            : "var(--green)"
      }}>
        ${coin.quote?.USD?.price.toLocaleString()}</h3>
        <p className="total_volume">Total Volume :{coin.total_supply.toLocaleString()}</p>
        <p className="market_cap">Market Cap : ${coin.quote?.USD?.market_cap.toLocaleString()}</p>
    </div>
  );
}
export default Grid