import React from 'react';
import { Line } from "react-chartjs-2";
import { Chart as chartjs } from "chart.js/auto";


function LineChart({ chartData, priceType, multiAxis }) {
    const options = {
        plugins: {
            legend: {
                display: multiAxis ? true : false,
            },
        },
        responsive: true,
        interaction: {
            mode: "index",
            intersect: false,
        }
    };

    return (
        <div>
            <Line data={chartData} options={options} />
        </div>
    );
}

export default LineChart;