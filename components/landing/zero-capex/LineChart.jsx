import React from 'react';
import {Line} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const data = {
    labels: ['', '', '', '', '', '', ''],
    datasets: [
        {
            label: 'Tagihan Listrik',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],


        },
        {
            label: 'Tagihan Surya',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgb(220,187,54, 0.4)',
            borderColor: 'rgb(220,187,54)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgb(220,187,54)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgb(220,187,54)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [100, 120, 180, 81, 356, 155, 140]
        },
    ]
};

export default function LineChart() {

    var options = {
        plugins: {  // 'legend' now within object 'plugins {}'
            legend: {
                labels: {
                    color: "white",  // not 'fontColor:' anymore
                    // fontSize: 18  // not 'fontSize:' anymore
                    font: {
                        size: 18 // 'size' now within object 'font {}'
                    }
                }
            }
        },
            scales: {
                x: {
                    grid: {
                        color: 'gray',
                        borderColor: 'green'
                    }
                },
                y: {
                    grid: {
                        color: 'gray',
                        borderColor: 'green'
                    },
                    ticks: {
                        color: 'white'
                    }
                }
            }
        }


    return (
        <div>
            <Line
                className="mt-20"
                data={data}
                width={400}
                height={400}
                options={options} />
        </div>
    );
};