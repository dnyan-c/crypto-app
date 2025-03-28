import React from 'react'
import "./styles.css"
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { Tooltip } from '@mui/material';
import { convertNumber } from '../../../functions/convertNumbers';
function List({ coin }) {
    return (
        <tr className="list-row">
            <Tooltip title="Coin logo" placement="bottom-start">
                <td className="td-image">
                    <img src={coin.image} className="td-coin-logo" />
                </td>
            </Tooltip>
            <Tooltip title="Coin Info" placement="bottom-start">
                <td>
                    <div className="name-col">
                        <p className="coin-symbol">{coin.symbol}</p>
                        <p className="coin-name">{coin.name}</p>
                    </div>
                </td>
            </Tooltip>
            <Tooltip title="Price Change In 24 hrs" placement="bottom-start">
                <td>
                    {coin.quote?.USD?.volume_change_24h ? (
                        <td className="chip-flex">
                            <div className="price-chip">{coin.price_change_percentage_24h}%</div>
                            <div className="icon-chip td-icon">
                                <TrendingUpRoundedIcon />
                            </div>
                        </td>
                    ) : (
                        <td className="chip-flex">
                            <div className="price-chip chip-red">{coin.price_change_percentage_24h || "N/A"}%</div>
                            <div className="icon-chip chip-red td-icon">
                                <TrendingDownRoundedIcon />
                            </div>
                        </td>
                    )}
                </td>
            </Tooltip>
            {/* <div className="info-container"></div> */}
            <Tooltip title="Current Price" placement="bottom-start">
                <td>
                    <h3 className="coin-price td-center-align" style={{
                        color: coin?.volume_change_24h < 0 ? "var(--red)" : "var(--green)"
                    }}>
                        ${coin?.current_price}
                    </h3>
                </td>
            </Tooltip>
            <Tooltip title="Total Volume" placement="bottom-start">
                <td>
                    <p className="total_volume td-right-align td-total-volume">
                        {coin?.total_supply}
                        {/* .toLocaleString() */}
                    </p>
                </td>
            </Tooltip>
            <Tooltip title="Market Cap" placement="bottom-start">
                <td className="desktop-td-mkt">
                    <p className="market_cap td-right-align">
                        ${coin?.market_cap}
                    </p>
                </td>
            </Tooltip>
            <Tooltip title="Market Cap" placement="bottom-start">
                <td className="mobile-td-mkt">
                    <p className="market_cap td-right-align">
                    ${coin?.market_cap}
                        {/* ${convertNumber(coin.quote?.USD?.market_cap)} */}
                    </p>
                </td>
            </Tooltip>
        </tr>
    )
}

export default List