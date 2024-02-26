import React from 'react';
import {Bar, Line} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import {BarChart} from "lucide-react";
import {cn} from "@/lib/utils";
Chart.register(...registerables);

export default function LineChartLeasing(
    {solarInvestment, currentPLNTarrif, electricityUsagePerMonth, capacity, kwhPerYear,size}
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
    // const currentPLNTarrif = 1025.88;
    const plnIncreaserate = 0.03;
    // const electricityUsagePerMonth =  4873864.390;

    // const capacity =  1672.96;
    const capacityPerDay = parseFloat(((capacity * 1406.5) / 365.0).toFixed(6));
    const capacityPerMonth = parseFloat((capacityPerDay * 30).toFixed(4));
    const capacityPerYear = parseFloat((capacityPerMonth * 12).toFixed(3));

    console.log("olek2")
    console.log(capacityPerDay, capacityPerMonth, capacityPerYear)


    const insurance = solarInvestment * 0.33 / 100;
    const visit = 1500000*3;
    const maintenance =   0.003 * capacity * solarInvestment * 1000; //solarInvestment * 0.5 / 100;

    const onmCost = insurance + visit + maintenance;

    // console.log(capacityPerDay, capacityPerMonth, capacityPerYear)

    const electricityCost = Math.ceil(electricityUsagePerMonth * currentPLNTarrif);
    const electricityCostWithPln = Math.ceil(capacityPerYear * currentPLNTarrif);

    const plnTarriff = electricityCost;

    const yearlyElectricityCost = electricityUsagePerMonth.toFixed(4) * plnTarriff * 12;

    //===================






    const firstYearSolarLeasing = kwhPerYear * firstYearLeasingTarrif;



    const finalLeasingCost = electricityCost - firstYearSolarLeasing;

    const finalLeasingOffset = yearlyElectricityCost - (firstYearSolarLeasing + onmCost);

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
        plnTarriff: plnTarriff,
        electricityCostWithPln: capacityPerYear * plnTarriff,
        electricityCost: electricityCost,
        yearlyElectricityCost: yearlyElectricityCost,
        offset: (yearlyElectricityCost + plnTarriff) - (capacityPerYear * plnTarriff),

        finalLeasingCost: finalLeasingCost,

        insurance: insurance,
        visit: visit,
        maintenance: maintenance,
        onmCost: onmCost,
        finalLeasingOffset:finalLeasingOffset,
        log: `${yearlyElectricityCost}  ${firstYearSolarLeasing}   ${onmCost}`
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
        const kwhPerYear = firstYearData[i -1].kwhPerYear * (1 - perYearPercent);
        const totalPlnTariff = firstYearData[i -1].totalPlnTarrif * (1 + 0.03);
        const solarLeasingTarif = totalPlnTariff * (1 - leasingPercent);
        const solarLeasingTarifIncludeTaxt = solarLeasingTarif * (1 + 0.11);
        const firstYearSolarLeasing = kwhPerYear * solarLeasingTarifIncludeTaxt;


        //======
        const electricityInKwh = Math.ceil(firstYearData[i -1].electricityInKwh * 0.993);
        const plnTarriff = Math.ceil(firstYearData[i -1].plnTarriff * (1 + plnIncreaserate));
        const electricityCostWithPln = Math.ceil(electricityInKwh * plnTarriff);
        const electricityCost = Math.ceil(electricityUsagePerMonth * plnTarriff);
        const yearlyElectricityCost = electricityUsagePerMonth.toFixed(4) * plnTarriff * 12;
        let roundedNumber = Math.round(electricityCost / 100000) * 100000;


        //======

        const finalLeasingCost = electricityCost - firstYearSolarLeasing;


        const insurance = firstYearData[i -1].insurance * 0.95;
        const visit = firstYearData[i -1].visit * (1 + plnIncreaserate);
        const maintenance = firstYearData[i -1].maintenance * (1 + plnIncreaserate);

        const onmCost = insurance + visit + maintenance;
        const finalLeasingOffset = yearlyElectricityCost - (firstYearSolarLeasing + onmCost);

        firstYearData.push({
            tahun: i + 1,
            kwhPerYear: kwhPerYear,
            totalPlnTarrif: totalPlnTariff,
            leasingTarrif: solarLeasingTarif,
            firstYearLeasing: firstYearSolarLeasing,
            tarifIncludeTax: solarLeasingTarifIncludeTaxt,


            electricityInKwh,
            plnTarriff,
            electricityCostWithPln,
            electricityCost: roundedNumber,
            yearlyElectricityCost: yearlyElectricityCost,
            offset: (yearlyElectricityCost + plnTarriff) - electricityCostWithPln,

            finalLeasingCost: finalLeasingCost,

            insurance: insurance,
            visit: visit,
            maintenance: maintenance,
            onmCost: onmCost,
            finalLeasingOffset: finalLeasingOffset
        })
    }


    console.log("leasing")

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
                data: firstYearData.map((data) => data.finalLeasingOffset)
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
                className={cn("mt-20", size === 200 ? "mt-0" : "mt-20")}
                data={data}
                width={size}
                height={size}
                options={options} />
        </div>
    );
};