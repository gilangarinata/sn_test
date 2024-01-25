import React from 'react';
import {Bar, Line} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import {BarChart} from "lucide-react";
Chart.register(...registerables);

export default function LineChart(
    {solarInvestment, currentPLNTarrif, electricityUsagePerMonth, capacity}
) {

    // const solarInvestment =  13383647799;
    // const currentPLNTarrif = 1025.88;
    const plnIncreaserate = 0.03;
    // const electricityUsagePerMonth =  4873864.390;

    // const capacity =  1672.96;
    const capacityPerDay = (capacity * 1405.0) / 365.0;
    const capacityPerMonth = capacityPerDay * 30;
    const capacityPerYear = parseInt(capacityPerMonth) * 12;


    const insurance = solarInvestment * 0.4 / 100;
    const visit = 500000*12;
    const maintenance = solarInvestment * 0.5 / 100;

    const onmCost = insurance + visit + maintenance;

    console.log(capacityPerDay, capacityPerMonth, capacityPerYear)

    const electricityCost = Math.ceil(electricityUsagePerMonth * currentPLNTarrif);
    const electricityCostWithPln = Math.ceil(capacityPerYear * currentPLNTarrif);
    const offset = (electricityCost - onmCost) - electricityCostWithPln;

    const firstYearData = [{
        tahun: 1,
        electricityInKwh: Math.ceil(capacityPerYear),
        plnTarrif: Math.ceil(currentPLNTarrif),
        electricityCostWithPln: electricityCostWithPln,
        electricityCost: electricityCost,

        onmCost: Math.ceil(onmCost),
        insurance: Math.ceil(insurance),
        visit: Math.ceil(visit),
        maintenance: Math.ceil(maintenance),
        offset: Math.ceil(offset)
    }]


    //looping 25 times
    for (let i = 0; i < 25; i++) {
        if(i === 0) continue;
        const electricityInKwh = Math.ceil(firstYearData[i -1].electricityInKwh * 0.993);
        const plnTarrif = Math.ceil(firstYearData[i -1].plnTarrif * (1 + plnIncreaserate));
        const electricityCostWithPln = Math.ceil(electricityInKwh * plnTarrif);
        const electricityCost = Math.ceil(electricityUsagePerMonth * plnTarrif);
        let roundedNumber = Math.round(electricityCost / 100000) * 100000;

        const insurance = firstYearData[i -1].insurance * 0.95;
        const visit = firstYearData[i -1].visit * (1 + plnIncreaserate);
        const maintenance = firstYearData[i -1].maintenance * (1 + plnIncreaserate);

        const onmCost = insurance + visit + maintenance;


        const offset = (electricityCost - onmCost) - electricityCostWithPln;

        firstYearData.push({
            tahun: i + 1,
            electricityInKwh,
            plnTarrif,
            electricityCostWithPln,
            electricityCost: roundedNumber,

            onmCost: Math.ceil(onmCost),
            insurance: Math.ceil(insurance),
            visit: Math.ceil(visit),
            maintenance: Math.ceil(maintenance),

            offset: Math.ceil(offset)
        })
    }


    console.log(firstYearData)

    const data = {
        labels: firstYearData.map((data) => `Tahun ke ${data.tahun}`),
        datasets: [
            {
                label: 'Tagihan Listrik PLN',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192)',
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
                data: firstYearData.map((data) => data.electricityCost),
            },
            {
                label: 'PLN Bills with Solar PV',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgb(220,187,54)',
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
                data: firstYearData.map((data) => data.offset),
            },
        ]
    };

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
                    },
                    ticks: {
                        color: 'white'
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
            <Bar
                className="mt-20"
                data={data}
                width={600}
                height={600}
                options={options} />
        </div>
    );
};