import React from 'react';
import {Bar, Line} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import {BarChart} from "lucide-react";
Chart.register(...registerables);

export default function LineChart(
    {solarInvestment, currentPLNTarrif, electricityUsagePerMonth, capacity}
) {


    console.log("olek")
    console.log(solarInvestment, currentPLNTarrif, electricityUsagePerMonth, capacity)

    // const solarInvestment =  13383647799;
    // const currentPLNTarrif = 1025.88;
    const plnIncreaserate = 0.03;
    // const electricityUsagePerMonth =  4873864.390;

    // const capacity =  1672.96;
    const capacityPerDay = parseFloat(((capacity * 1406.5) / 365.0).toFixed(6));
    const capacityPerMonth = parseFloat((capacityPerDay * 30).toFixed(4));
    const capacityPerYear = parseFloat((capacityPerMonth * 12).toFixed(3));

    console.log("olek2")
    console.log(capacityPerDay, capacityPerMonth, capacityPerYear)


    const insurance = solarInvestment * 0.4 / 100;
    const visit = 500000*12;
    const maintenance = solarInvestment * 0.5 / 100;

    const onmCost = insurance + visit + maintenance;

    // console.log(capacityPerDay, capacityPerMonth, capacityPerYear)

    const electricityCost = Math.ceil(electricityUsagePerMonth * currentPLNTarrif);
    const electricityCostWithPln = Math.ceil(capacityPerYear * currentPLNTarrif);
    const offset = (electricityCost - onmCost) - electricityCostWithPln;

    const plnTarriff = electricityCost;

    const yearlyElectricityCost = electricityUsagePerMonth.toFixed(4) * plnTarriff * 12;

    const firstYearData = [{
        tahun: 1,
        electricityInKwh: Math.ceil(capacityPerYear),
        plnTarriff: plnTarriff,
        electricityCostWithPln: capacityPerYear * plnTarriff,
        electricityCost: electricityCost,
        yearlyElectricityCost: yearlyElectricityCost,


        onmCost: Math.ceil(onmCost),
        insurance: Math.ceil(insurance),
        visit: Math.ceil(visit),
        maintenance: Math.ceil(maintenance),
        offset: (yearlyElectricityCost + plnTarriff) - (capacityPerYear * plnTarriff)
    }]


    //looping 25 times
    for (let i = 0; i < 25; i++) {
        if(i === 0) continue;
        const electricityInKwh = Math.ceil(firstYearData[i -1].electricityInKwh * 0.993);
        const plnTarriff = Math.ceil(firstYearData[i -1].plnTarriff * (1 + plnIncreaserate));
        const electricityCostWithPln = Math.ceil(electricityInKwh * plnTarriff);
        const electricityCost = Math.ceil(electricityUsagePerMonth * plnTarriff);
        let roundedNumber = Math.round(electricityCost / 100000) * 100000;

        const insurance = firstYearData[i -1].insurance * 0.95;
        const visit = firstYearData[i -1].visit * (1 + plnIncreaserate);
        const maintenance = firstYearData[i -1].maintenance * (1 + plnIncreaserate);

        const onmCost = insurance + visit + maintenance;


        const offset = (electricityCost - onmCost) - electricityCostWithPln;

        const yearlyElectricityCost = electricityUsagePerMonth.toFixed(4) * plnTarriff * 12;

        firstYearData.push({
            tahun: i + 1,
            electricityInKwh,
            plnTarriff,
            electricityCostWithPln,
            electricityCost: roundedNumber,
            yearlyElectricityCost: yearlyElectricityCost,
            log: `${electricityUsagePerMonth.toFixed(4)}   ${plnTarriff}    ${firstYearData[i -1].plnTarrif}`,

            onmCost: Math.ceil(onmCost),
            insurance: Math.ceil(insurance),
            visit: Math.ceil(visit),
            maintenance: Math.ceil(maintenance),

            offset: (yearlyElectricityCost + plnTarriff) - electricityCostWithPln
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
                data: firstYearData.map((data) => data.yearlyElectricityCost),
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