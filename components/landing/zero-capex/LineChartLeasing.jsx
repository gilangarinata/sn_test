import React from 'react';
import {Bar, Line} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import {BarChart} from "lucide-react";
Chart.register(...registerables);

export default function LineChartLeasing(
    {solarInvestment, currentPLNTarrif, electricityUsagePerMonth, capacity, kwhPerYear}
) {
    const leasingPercent = 0.2; //20%
    const vatPercent = 0.11; // 11%
    // const kwhPerYear =   2259327;
    // const currentPLNTarrif = 1025.88;
    const leasingTarrif = currentPLNTarrif * (1 - leasingPercent);
    const vat = leasingTarrif * vatPercent;
    const firstYearLeasingTarrif = leasingTarrif + vat;


    console.log("olok")
    console.log(solarInvestment, currentPLNTarrif, electricityUsagePerMonth, capacity, kwhPerYear)

    //=============================

    // const solarInvestment =  13383647799;
    const plnIncreaserate = 0.03;
    // const electricityUsagePerMonth =  4873864.390;
    //
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

    //===================






    const firstYearSolarLeasing = kwhPerYear * firstYearLeasingTarrif;



    const finalLeasingCost = electricityCost - firstYearSolarLeasing;

    const firstYearData = [{
        tahun: 1,
        kwhPerYear: kwhPerYear,
        leasingTarrif: leasingTarrif,
        totalPlnTarrif: currentPLNTarrif,
        firstYearLeasing: firstYearSolarLeasing,
        tarifIncludeTax: firstYearLeasingTarrif,

        preVat: leasingTarrif,
        vat: vat,


        electricityInKwh: Math.ceil(capacityPerYear),
        plnTarrif: Math.ceil(currentPLNTarrif),
        electricityCostWithPln: electricityCostWithPln,
        electricityCost: electricityCost,

        finalLeasingCost: finalLeasingCost
    }]


    //looping 25 times
    for (let i = 0; i < 25; i++) {
        if(i === 0) continue;
        let perYearPercent;
        if(i === 1) {
            perYearPercent = 0.015;
        } else {
            perYearPercent = 0.005;
        }
        const kwhPerYear = Math.ceil(firstYearData[i -1].kwhPerYear * (1 - perYearPercent));
        const totalPlnTariff = Math.ceil(firstYearData[i -1].totalPlnTarrif * (1 + 0.03));
        const solarLeasingTarif = totalPlnTariff * (1 - leasingPercent);
        const solarLeasingTarifIncludeTaxt = solarLeasingTarif * (1 + 0.11);
        const firstYearSolarLeasing = kwhPerYear * solarLeasingTarifIncludeTaxt;


        //======
        const electricityInKwh = Math.ceil(firstYearData[i -1].electricityInKwh * 0.993);
        const plnTarrif = Math.ceil(firstYearData[i -1].plnTarrif * (1 + plnIncreaserate));
        const electricityCostWithPln = Math.ceil(electricityInKwh * plnTarrif);
        const electricityCost = Math.ceil(electricityUsagePerMonth * plnTarrif);


        //======

        const finalLeasingCost = electricityCost - firstYearSolarLeasing;

        firstYearData.push({
            tahun: i + 1,
            kwhPerYear: kwhPerYear,
            totalPlnTarrif: totalPlnTariff,
            leasingTarrif: solarLeasingTarif,
            firstYearLeasing: firstYearSolarLeasing,
            tarifIncludeTax: solarLeasingTarifIncludeTaxt,


            electricityInKwh: electricityInKwh,
            plnTarrif: plnTarrif,
            electricityCostWithPln: electricityCostWithPln,
            electricityCost: electricityCost,

            finalLeasingCost: finalLeasingCost
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
                label: 'With Leasing',
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
                data: firstYearData.map((data) => data.finalLeasingCost)
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