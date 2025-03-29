import React from 'react'
import "./styles.css"
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { Tooltip } from '@mui/material';
import { convertNumber } from '../../../functions/convertNumbers';
import { Link } from 'react-router-dom';

function ListsDashboard({ coin }) {
    return (
        <Link to={`/coin/${coin.id}`}>
            <tr className="list-row">
                <Tooltip title="Coin logo" placement="bottom-start">
                    <td className="td-image">
                        <p className="td-coin-logo">{coin.slug}</p>
                    </td>
                </Tooltip>
                {/* <Tooltip title="Coin logo">
                <td>
                    <div className="name-col">
                        <p className="coin-name">{coin.name}</p>
                    </div>
                </td>
            </Tooltip> */}
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
                        {coin.quote?.USD?.volume_change_24h > 0 ? (
                            <td className="chip-flex">
                                <div className="price-chip ">{coin.quote?.USD?.volume_change_24h.toFixed(2)}%
                                </div>
                                <div className="icon-chip td-icon">
                                    <TrendingUpRoundedIcon />
                                </div>
                            </td>
                        ) : (
                            <td className="chip-flex">
                                <div className="price-chip chip-red">
                                    {coin.quote?.USD?.volume_change_24h.toFixed(2)}%
                                </div>
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
                            color:
                                coin.quote?.USD?.volume_change_24h < 0
                                    ? "var(--red)"
                                    : "var(--green)"
                        }}>
                            ${coin.quote?.USD?.price.toLocaleString()}</h3>
                    </td>
                </Tooltip>
                <Tooltip title="Total Volume" placement="bottom-start">
                    <td>
                        <p className="total_volume td-right-align td-total-volume">
                            {coin.total_supply.toLocaleString()}
                        </p>
                    </td>
                </Tooltip>
                <Tooltip title="Market Cap" placement="bottom-start">
                    <td className="desktop-td-mkt">
                        <p className="market_cap td-right-align">
                            ${coin.quote?.USD?.market_cap.toLocaleString()}
                        </p>
                    </td>
                </Tooltip>
                <Tooltip title="Market Cap" placement="bottom-start">
                    <td className="mobile-td-mkt">
                        <p className="market_cap td-right-align">
                            ${convertNumber(coin.quote?.USD?.market_cap)}
                        </p>
                    </td>
                </Tooltip>
            </tr>
        </Link>
    )
}

export default ListsDashboard