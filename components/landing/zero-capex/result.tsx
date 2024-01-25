"use client"

import React, {useEffect} from "react";
import Image from "next/image";
import {ScopeOfWOrk} from "@/components/admin/our-business/scope-of-works/scope-of-work-table";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import cookie from "js-cookie";
import {cn} from "@/lib/utils";
import {ArrowRight, DownloadIcon} from "lucide-react";
import {pricingData} from "@/components/landing/zero-capex/hitung-investasi";

import { Line } from 'react-chartjs-2';
import LineChart from "@/components/landing/zero-capex/LineChart";
import Link from "next/link";
import LineChartLeasing from "@/components/landing/zero-capex/LineChartLeasing";

interface LineChartProps {
    data: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            fill: {
                target: string;
            };
            borderColor: string;
            backgroundColor: string;
        }[];
    };
}

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
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
    ],
};


const results = [
    {
        icon: '/images/icon_zero_capex_1.png',
        title: 'Co2 Avoided',
        description: "1.841.695 kg"
    },
    {
        icon: '/images/icon_zero_capex_2.png',
        title: 'Coal burned',
        description: "4.851.412 kg"
    },
    {
        icon: '/images/icon_zero_capex_3.png',
        title: 'Vehicle Driven',
        description: "676.096 kg"
    },
    {
        icon: '/images/icon_zero_capex_4.png',
        title: 'Gasoline burned',
        description: "5.622.026 kg"
    },
    {
        icon: '/images/icon_zero_capex_5.png',
        title: 'Trees Needed',
        description: "64.233.057 kg"
    },
]

const recommendations = [
    {
        title: "Rekomendasi Installasi (kWp)",
        value: ""
    },
    {
        title: "Area Potensial (m2)",
        value: ""
    },
    {
        title: "Jumlah Modul Surya (pcs)",
        value: ""
    },
    {
        title: "Produksi Energi per Tahun (kWh)",
        value: ""
    },
    {
        title: "Periode Installasi (hari)",
        value: ""
    },
]

const divStyle = {
    backgroundSize: 'cover',
}

interface SolarPanelInfo {
    PeakSunHour: number;
    LuasPanel: {
        Panjang: number;
        Lebar: number;
        Unit: string;
    };
    LuasPanelM2: number;
    DayaYangDihasilkanSatuPanel: number;
    UnitOfPower: string;
}

const solarPanelInfo: SolarPanelInfo = {
    PeakSunHour: 3.7,
    LuasPanel: {
        Panjang: 1.35,
        Lebar: 2.35,
        Unit: "m",
    },
    LuasPanelM2: 3.18,
    DayaYangDihasilkanSatuPanel: 665,
    UnitOfPower: "Wp",
};

interface CarbonInfo {
    CO2Avoided: {
        Value: number;
        Unit: string;
    };
    CoalBurned: {
        Value: number;
        Unit: string;
    };
    DieselBurned: {
        Value: number;
        Unit: string;
    };
    VehicleDriven: {
        Value: number;
        Unit: string;
    };
    GasolineBurned: {
        Value: number;
        Unit: string;
    };
    TreesPlanted: {
        Value: number;
        Unit: string;
    };
}

const carbonInfo: CarbonInfo = {
    CO2Avoided: {
        Value: 0.76,
        Unit: "kg CO2/kWh",
    },
    CoalBurned: {
        Value: 2.002,
        Unit: "kg CO2/kWh",
    },
    DieselBurned: {
        Value: 26.4,
        Unit: "liter CO2/kWh",
    },
    VehicleDriven: {
        Value: 0.279,
        Unit: "km CO2/kWh",
    },
    GasolineBurned: {
        Value: 2.32,
        Unit: "liter CO2/kWh",
    },
    TreesPlanted: {
        Value: 21.77,
        Unit: "trees CO2/kWh",
    },
};

function calculateDiscount(rekomendasiInstallasi: number): number {
    if (rekomendasiInstallasi > 1000) {
        return 0.5;
    } else if (rekomendasiInstallasi >= 750) {
        return 0.55;
    } else if (rekomendasiInstallasi >= 550) {
        return 0.6;
    } else if (rekomendasiInstallasi >= 400) {
        return 0.65;
    } else if (rekomendasiInstallasi >= 250) {
        return 0.7;
    } else {
        return 0.8;
    }
}


export default function ZeroCapexResult() {
    const [rekomendasiInstallasi, setRekomendasiInstallasi] = React.useState('');
    const [areaPotensial, setAreaPotensial] = React.useState('');
    const [jumlahModulSurya, setJumlahModulSurya] = React.useState('');
    const [produksiEnergiPerTahun, setProduksiEnergiPerTahun] = React.useState('');
    const [periodeInstallasi, setPeriodeInstallasi] = React.useState('');


    const [rekomendasiInstallasi2, setRekomendasiInstallasi2] = React.useState('');
    const [areaPotensial2, setAreaPotensial2] = React.useState('');
    const [jumlahModulSurya2, setJumlahModulSurya2] = React.useState('');
    const [produksiEnergiPerTahun2, setProduksiEnergiPerTahun2] = React.useState('');
    const [periodeInstallasi2, setPeriodeInstallasi2] = React.useState('');

    const [co2Avoided, setCo2Avoided] = React.useState('');
    const [coalBurned, setCoalBurned] = React.useState('');
    const [vehicleDriven, setVehicleDriven] = React.useState('');
    const [gasolineBurned, setGasolineBurned] = React.useState('');
    const [treesNeeded, setTreesNeeded] = React.useState('');

    const [selectedRecommendation, setSelectedRecommendation] = React.useState(-1)
    const [selectedPlan, setSelectedPlan] = React.useState(-1)

    const [priceSolarRental, setPriceSolarRental] = React.useState('')
    const [priceTurnkeyEPC, setPriceTurnkeyEPC] = React.useState('')

    useEffect(() => {
        // Data dari klien
        const dayaListrikPLN = Number(cookie.get("dayaListrik")); // Kapasitas PLN dalam kVa
        const tarifListrik = Number(cookie.get("tarifListrik")); // Tarif listrik per kwh dalam rupiah
        const tagihanListrikPerBulan = Number(cookie.get("tagihanListrik")); // Tagihan listrik per bulan dalam rupiah
        const luasAreaProperty = Number(cookie.get("luasArea")); // Luas area property dalam m2
        const estimatedPowerUsage = Number(cookie.get("estimatedpowerusage"));

        // Rekomendasi Installasi (kWp)

        function ceilingMath(value: number, factor: number): number {
            // Assuming value and factor are both numbers
            return Math.ceil(value / factor) * factor;
        }

        // Area Potensial (m2) & Jumlah Modul Surya (Pcs)
        const jumlahModulSurya = (luasAreaProperty - (luasAreaProperty*20/100)) / solarPanelInfo.LuasPanelM2;
        const areaPotensial = jumlahModulSurya * solarPanelInfo.LuasPanelM2; // Satu modul surya memiliki dimensi 3 m
        const rekomendasiInstallasi = (jumlahModulSurya * solarPanelInfo.DayaYangDihasilkanSatuPanel) / 1000; // Kapasitas PLTS tidak boleh melebihi PLN dalam kWp


        const rekomendasiInstallasi2 = estimatedPowerUsage; // Kapasitas PLTS tidak boleh melebihi PLN dalam kWp
        const areaPotensial2 = rekomendasiInstallasi2 * solarPanelInfo.LuasPanelM2; // Satu modul surya memiliki dimensi 3 m
        const jumlahModulSurya2 = ceilingMath(rekomendasiInstallasi2 / solarPanelInfo.DayaYangDihasilkanSatuPanel * 1000, 1); // Satu modul surya memiliki dimensi 3 m


        // Produksi Energi per Tahun (kWh)
        const produksiEnergiPerTahun = (rekomendasiInstallasi * solarPanelInfo.PeakSunHour) * 365;

        const produksiEnergiPerTahun2 = (rekomendasiInstallasi2 * solarPanelInfo.PeakSunHour) * 365;

        // Periode Installasi
        let periodeInstallasi;
        if (rekomendasiInstallasi < 1000) {
            periodeInstallasi = '3 - 5 Bulan';
        } else {
            periodeInstallasi = '6 Bulan atau Lebih';
        }


        // Periode Installasi
        let periodeInstallasi2;
        if (rekomendasiInstallasi2 < 1000) {
            periodeInstallasi2 = '3 - 5 Bulan';
        } else {
            periodeInstallasi2 = '6 Bulan atau Lebih';
        }

        const co2Avoided = (carbonInfo.CO2Avoided.Value * ((selectedRecommendation === 0 ? rekomendasiInstallasi : rekomendasiInstallasi2) * 3.7 ) * 365) * 20;
        const coalBurned = (carbonInfo.CoalBurned.Value * ((selectedRecommendation === 0 ? rekomendasiInstallasi : rekomendasiInstallasi2) * 3.7 ) * 365) * 20;
        const vehicleDriven = (carbonInfo.VehicleDriven.Value * ((selectedRecommendation === 0 ? rekomendasiInstallasi : rekomendasiInstallasi2) * 3.7 ) * 365) * 20;
        const gasolineBurned = (carbonInfo.GasolineBurned.Value * ((selectedRecommendation === 0 ? rekomendasiInstallasi : rekomendasiInstallasi2) * 3.7 ) * 365) * 20;
        const treesNeeded = (carbonInfo.TreesPlanted.Value * ((selectedRecommendation === 0 ? rekomendasiInstallasi : rekomendasiInstallasi2) * 3.7 ) * 365) * 20;

        setCo2Avoided(Math.floor(co2Avoided).toLocaleString('en-US').replace(/,/g, '.').toString())
        setCoalBurned(Math.floor(coalBurned).toLocaleString('en-US').replace(/,/g, '.').toString())
        setVehicleDriven(Math.floor(vehicleDriven).toLocaleString('en-US').replace(/,/g, '.').toString())
        setGasolineBurned(Math.floor(gasolineBurned).toLocaleString('en-US').replace(/,/g, '.').toString())
        setTreesNeeded(Math.floor(treesNeeded).toLocaleString('en-US').replace(/,/g, '.').toString())


        console.log('Luas are property:', luasAreaProperty);
// Output hasil perhitungan
        console.log('Rekomendasi Installasi (kWp):', rekomendasiInstallasi);
        console.log('Area Potensial (m2):', areaPotensial);
        console.log('Jumlah Modul Surya (Pcs):', jumlahModulSurya);
        console.log('Produksi Energi per Tahun (kWh):', produksiEnergiPerTahun);
        console.log('Periode Installasi:', periodeInstallasi);


        const a1 = isNaN(parseFloat(rekomendasiInstallasi.toFixed(2).toString().replace(/,/g, ''))) ? "" : parseFloat(rekomendasiInstallasi.toFixed(2).toString().replace(/,/g, '')).toLocaleString();
        const a2 = isNaN(parseFloat(areaPotensial.toFixed(0).toString().replace(/,/g, ''))) ? "" : parseFloat(areaPotensial.toFixed(0).toString().replace(/,/g, '')).toLocaleString();
        const a3 = isNaN(parseFloat(jumlahModulSurya.toFixed(0).toString().replace(/,/g, ''))) ? "" : parseFloat(jumlahModulSurya.toFixed(0).toString().replace(/,/g, '')).toLocaleString();
        const a4 = isNaN(parseFloat(produksiEnergiPerTahun.toFixed(4).toString().replace(/,/g, ''))) ? "" : parseFloat(produksiEnergiPerTahun.toFixed(4).toString().replace(/,/g, '')).toLocaleString();
        const a5 = isNaN(parseFloat(periodeInstallasi.toString().replace(/,/g, ''))) ? "" : parseFloat(periodeInstallasi.toString().replace(/,/g, '')).toLocaleString();

        const a6 = isNaN(parseFloat(rekomendasiInstallasi2.toFixed(2).toString().replace(/,/g, ''))) ? "" : parseFloat(rekomendasiInstallasi2.toFixed(2).toString().replace(/,/g, '')).toLocaleString();
        const a7 = isNaN(parseFloat(areaPotensial2.toFixed(0).toString().replace(/,/g, ''))) ? "" : parseFloat(areaPotensial2.toFixed(0).toString().replace(/,/g, '')).toLocaleString();
        const a8 = isNaN(parseFloat(jumlahModulSurya2.toFixed(0).toString().replace(/,/g, ''))) ? "" : parseFloat(jumlahModulSurya2.toFixed(0).toString().replace(/,/g, '')).toLocaleString();
        const a9 = isNaN(parseFloat(produksiEnergiPerTahun2.toFixed(4).toString().replace(/,/g, ''))) ? "" : parseFloat(produksiEnergiPerTahun2.toFixed(4).toString().replace(/,/g, '')).toLocaleString();
        const a10 = isNaN(parseFloat(periodeInstallasi2.toString().replace(/,/g, ''))) ? "" : parseFloat(periodeInstallasi2.toString().replace(/,/g, '')).toLocaleString();

        setRekomendasiInstallasi(a1)
        setAreaPotensial(a2)
        setJumlahModulSurya(a3)
        setProduksiEnergiPerTahun(a4)
        setPeriodeInstallasi(a5)

        setRekomendasiInstallasi2(a6)
        setAreaPotensial2(a7)
        setJumlahModulSurya2(a8)
        setProduksiEnergiPerTahun2(a9)
        setPeriodeInstallasi2(a10)


        const selectedJenisProperty = pricingData.find(e => e.categoryEn === cookie.get("jenisProperty"))
        const tarrif = selectedJenisProperty?.tariffCode ?? 0.0;
        const leasing20Percent = tarrif - (tarrif * 20 / 100);

        const priceLeasingBulanan = (leasing20Percent * (rekomendasiInstallasi * solarPanelInfo.PeakSunHour)) * 30;
        const priceLeasingBulanan2 = (leasing20Percent * (rekomendasiInstallasi2 * solarPanelInfo.PeakSunHour)) * 30;
        const hargaDolar = calculateDiscount(rekomendasiInstallasi);
        const hargaDolar2 = calculateDiscount(rekomendasiInstallasi);
        const priceLeasingTahunan = (rekomendasiInstallasi * 16000) * hargaDolar * 1000;
        const priceLeasingTahunan2 = (rekomendasiInstallasi2 * 16000) * hargaDolar2 * 1000;


        if(selectedRecommendation === 0) {
            setPriceSolarRental(Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(priceLeasingBulanan))
            setPriceTurnkeyEPC(Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(priceLeasingTahunan))
        } else if(selectedRecommendation === 1) {
            setPriceSolarRental(Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(priceLeasingBulanan2))
            setPriceTurnkeyEPC(Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(priceLeasingTahunan2))
        }

    }, [selectedRecommendation])

    return (
            <div className="w-full flex flex-col bg-[#15537A] items-center justify-center">
                <h1 className="mt-10 text-3xl text-white font-bold">HASIL</h1>
                <div className="w-full mt-20 mb-32">
                    <div className="mx-auto mt-[300px] lg:mt-0 flex flex-col lg:flex-row gap-4 justify-center lg:justify-between lg:px-20">
                        <div className="flex-1">
                            <div className="flex flex-col items-center justify-center">
                                <h1 className="text-2xl text-white">Pilih Pendekatan</h1>
                                <div className="flex">
                                    <div className="flex-1">
                                        <div className="flex flex-col items-center px-4 py-6 gap-4">
                                            <div className={cn("rounded-2xl  px-4 py-6 w-full shadow-xl bg-[#f9c329] flex flex-col items-center gap-4", selectedRecommendation === 0 ? "border-white border-4" : "")}>
                                                <h1 className="text-lg text-center">Rekomendasi Installasi<br/>Sesuai Luasan Tersedia</h1>
                                                <p className="text-xs text-gray-700 text-center h-[80px]">Dengan memilih pendekatan ini, data akan menyesuaikan dengan luasan lahan yang tersedia</p>

                                                <hr className="w-full border-white"/>
                                                <div className="flex flex-col w-full gap-2">
                                                    <h1 className="text-[#15537A]">
                                                        Rekomendasi Installasi (kWp)
                                                    </h1>
                                                    <Input value={rekomendasiInstallasi} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {

                                                    }} />
                                                </div>
                                                <div className="flex flex-col w-full gap-2">
                                                    <h1 className="text-[#15537A]">
                                                        Area Potensial (m2)
                                                    </h1>
                                                    <Input value={areaPotensial} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {

                                                    }} />
                                                </div>
                                                <div className="flex flex-col w-full gap-2">
                                                    <h1 className="text-[#15537A]">
                                                        Jumlah Modul Surya (pcs)
                                                    </h1>
                                                    <Input value={jumlahModulSurya} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {

                                                    }} />
                                                </div>

                                                <div className="flex flex-col w-full gap-2">
                                                    <h1 className="text-[#15537A]">
                                                        Produksi Energi per Tahun (kWh)
                                                    </h1>
                                                    <Input value={produksiEnergiPerTahun} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {

                                                    }} />
                                                </div>

                                                <div className="flex flex-col w-full gap-2">
                                                    <h1 className="text-[#15537A]">
                                                        Periode Installasi
                                                    </h1>
                                                    <Input value={periodeInstallasi} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {

                                                    }} />
                                                </div>

                                                <Button className="w-full mt-4" onClick={() => {
                                                    setSelectedRecommendation(0)
                                                }}>Choose Plan</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col items-center px-4 py-6 gap-4">
                                            <div className={cn("rounded-2xl  px-4 py-6 w-full shadow-xl bg-[#f9c329] flex flex-col items-center gap-4", selectedRecommendation === 1 ? "border-white border-4" : "")}>
                                                <h1 className="text-lg text-center">Rekomendasi Installasi<br/>Sesuai Profil Beban</h1>
                                                <p className="text-xs text-gray-700 text-center h-[80px]">Dengan memilih pendekatan ini, data akan menyesuaikan dengan daya yang dibutuhkan untuk memenuhi beban yang ada</p>

                                                <hr className="w-full border-white"/>
                                                <div className="flex flex-col w-full gap-2">
                                                    <h1 className="text-[#15537A]">
                                                        Rekomendasi Installasi (kWp)
                                                    </h1>
                                                    <Input value={rekomendasiInstallasi2} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {

                                                    }} />
                                                </div>
                                                <div className="flex flex-col w-full gap-2">
                                                    <h1 className="text-[#15537A]">
                                                        Area Potensial (m2)
                                                    </h1>
                                                    <Input value={areaPotensial2} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {

                                                    }} />
                                                </div>
                                                <div className="flex flex-col w-full gap-2">
                                                    <h1 className="text-[#15537A]">
                                                        Jumlah Modul Surya (pcs)
                                                    </h1>
                                                    <Input value={jumlahModulSurya2} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {

                                                    }} />
                                                </div>

                                                <div className="flex flex-col w-full gap-2">
                                                    <h1 className="text-[#15537A]">
                                                        Produksi Energi per Tahun (kWh)
                                                    </h1>
                                                    <Input value={produksiEnergiPerTahun2} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {

                                                    }} />
                                                </div>

                                                <div className="flex flex-col w-full gap-2">
                                                    <h1 className="text-[#15537A]">
                                                        Periode Installasi
                                                    </h1>
                                                    <Input value={periodeInstallasi2} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {

                                                    }} />
                                                </div>

                                                <Button className="w-full mt-4" onClick={() => {
                                                    setSelectedRecommendation(1)
                                                }}>Choose Plan</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-full border-l border-solid border-white"></div>
                        <div className="flex-1">
                            <div className="flex flex-col items-center justify-center">
                                <h1 className="text-2xl text-white text-center">Dampak Lingkungan<br/>dalam 25 tahun</h1>
                                {selectedRecommendation !== -1 ? (
                                    <div className={cn("flex flex-col py-6 gap-8 mx-10","")}>
                                        <div className="flex gap-4">
                                            <Image src="/images/icon_zero_capex_1.png" alt="" width={50} height={30} />
                                            <div className="flex flex-col">
                                                <p className="text-white text-sm">Co2 Avoided (kg Co2/kWh)</p>
                                                <h4 className="text-white text-2xl font-bold">{`${co2Avoided}`}</h4>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <Image src="/images/icon_zero_capex_2.png" alt="" width={50} height={30} />
                                            <div className="flex flex-col">
                                                <p className="text-white text-sm">Coal Burned (kg Co2/kWh)</p>
                                                <h4 className="text-white text-2xl font-bold">{`${coalBurned}`}</h4>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <Image src="/images/icon_zero_capex_2.png" alt="" width={50} height={30} />
                                            <div className="flex flex-col">
                                                <p className="text-white text-sm">Vehicle Driven (km Co2/kWh)</p>
                                                <h4 className="text-white text-2xl font-bold">{`${vehicleDriven}`}</h4>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <Image src="/images/icon_zero_capex_2.png" alt="" width={50} height={30} />
                                            <div className="flex flex-col">
                                                <p className="text-white text-sm">Gasoline Burned (liter Co2/kWh)</p>
                                                <h4 className="text-white text-2xl font-bold">{`${gasolineBurned}`}</h4>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <Image src="/images/icon_zero_capex_2.png" alt="" width={50} height={30} />
                                            <div className="flex flex-col">
                                                <p className="text-white text-sm">Tree Needed (trees Co2/kWh)</p>
                                                <h4 className="text-white text-2xl font-bold">{`${treesNeeded}`}</h4>
                                            </div>
                                        </div>
                                    </div>
                                ) : (<div className="text-white mt-20">Silahkan pilih pendekatan</div>)}
                            </div>
                        </div>
                        {/*<Image className="h-fit pb-[600px]" src="/images/zero-capex-banner-2.png" alt="" width={500} height={500} />*/}
                    </div>
                </div>

                {selectedRecommendation === -1 ? (<div></div>) : (
                    <div className="flex flex-col mt-64 md:mt-0 md:flex-row w-full px-10 md:px-60 gap-4">
                        <div className="px-8 py-8 flex-1 bg-[#2190AE] rounded-sm flex flex-col gap-4">
                            <h1 className="text-white text-xl font-bold">Choose best plan for your business</h1>
                            <p className="text-white/80 text-sm">Please choose our service that is most suitable for your business.<br/>Explore our plan and have it as your reference</p>
                            <ArrowRight color="#ffffff"></ArrowRight>
                            <Image
                                alt='Mountains'
                                src='/images/img_plan.png'
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto' }} // optional
                            />
                        </div>
                        <div className={cn("px-8 py-8 flex-1 bg-[#FCBA28] rounded-sm flex flex-col", selectedPlan === 0 ? "border-white border-4" : "")}>
                            <div className="flex">
                                <h1 className="text-xl font-bold">Solar Rental Zero Capex</h1>
                                <Image src="/images/ic_plan_1.png" alt="" width={0}
                                       height={0}
                                       sizes="50vw"
                                       style={{ width: '20%', height: 'auto' }}  />
                            </div>
                            <hr className="my-3"/>
                            <div className="flex gap-4">
                                <Input type="checkbox" className="w-5 h-5" checked={true}/>
                                <p className="text-sm w-full">Zero advance, Monthly fee</p>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <Input type="checkbox" className="w-5 h-5" checked={true}/>
                                <p className="text-sm w-full">Long-term Cooperation</p>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <Input type="checkbox" className="w-5 h-5" checked={true}/>
                                <p className="text-sm w-full">Minimum installed Capacity 500 kWp</p>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <Input type="checkbox" className="w-5 h-5" checked={true}/>
                                <p className="text-sm w-full">Warranty & OM Service</p>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <Input type="checkbox" className="w-5 h-5" checked={true}/>
                                <p className="text-sm w-full">Digital Performance Monitoring</p>
                            </div>
                            <div className="flex-1"></div>
                            <h1 className="w-full text-center text-lg font-black mt-4">Start from<br/>{priceSolarRental}<br/>/Month</h1>
                            <Button onClick={(a) => setSelectedPlan(0)} className="text-white text-lg font-bold mt-4">Choose Plan</Button>
                        </div>

                        <div className={cn("px-8 py-8 flex-1 bg-[#FCBA28] rounded-sm flex flex-col", selectedPlan === 1 ? "border-white border-4" : "")}>
                            <div className="flex">
                                <h1 className="text-xl font-bold">Turnkey EPC Direct Purchase</h1>
                                <Image src="/images/ic_plan_2.png" alt="" width={0}
                                       height={0}
                                       sizes="50vw"
                                       style={{ width: '20%', height: 'auto' }}  />
                            </div>
                            <hr className="my-3"/>
                            <div className="flex gap-4">
                                <Input type="checkbox" className="w-5 h-5" checked={true}/>
                                <p className="text-sm w-full">Low advance, Monthly fee</p>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <Input type="checkbox" className="w-5 h-5" checked={true}/>
                                <p className="text-sm w-full">Short-term Cooperation</p>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <Input type="checkbox" className="w-5 h-5" checked={true}/>
                                <p className="text-sm w-full">Unlimited installed Capacity</p>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <Input type="checkbox" className="w-5 h-5" checked={true}/>
                                <p className="text-sm w-full">Warranty & OM Training</p>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <Input type="checkbox" className="w-5 h-5" checked={true}/>
                                <p className="text-sm w-full">Digital Performance Monitoring</p>
                            </div>
                            <div className="flex-1"></div>
                            <h1 className="w-full text-center text-lg font-black mt-4">Start from<br/>{priceTurnkeyEPC}</h1>
                            <Button onClick={(a) => setSelectedPlan(1)} className="text-white text-lg font-bold mt-4">Choose Plan</Button>
                        </div>
                    </div>
                )}


                {selectedPlan === 1 ? (
                    <LineChart
                        currentPLNTarrif={parseFloat(cookie.get("tarifListrik") ?? "0.0")}
                        solarInvestment={parseFloat(priceTurnkeyEPC.replaceAll(".","").replaceAll("Rp", "").replaceAll(",", ".").trim())}
                        electricityUsagePerMonth = {parseFloat(cookie.get("tagihanListrik") ?? "0.0") / parseFloat(cookie.get("tarifListrik") ?? "0.0")}
                        capacity={parseFloat( selectedRecommendation === 0 ? rekomendasiInstallasi.replaceAll(",", "") : rekomendasiInstallasi2.replaceAll(",", ""))}
                    />) : (
                    <div></div>
                    )}

                {selectedPlan === 0 ? (<LineChartLeasing
                    currentPLNTarrif={parseFloat(cookie.get("tarifListrik") ?? "0.0")}
                    solarInvestment={parseFloat(priceTurnkeyEPC.replaceAll(".","").replaceAll("Rp", "").replaceAll(",", ".").trim())}
                    electricityUsagePerMonth = {parseFloat(cookie.get("tagihanListrik") ?? "0.0") / parseFloat(cookie.get("tarifListrik") ?? "0.0")}
                    capacity={parseFloat( selectedRecommendation === 0 ? rekomendasiInstallasi.replaceAll(",", "") : rekomendasiInstallasi2.replaceAll(",", ""))}
                    kwhPerYear={parseFloat( selectedRecommendation === 0 ? produksiEnergiPerTahun.replaceAll(",", "") : produksiEnergiPerTahun2.replaceAll(",", ""))}
                />) : (
                    <div></div>
                )}

                {selectedRecommendation === -1 ? (<div></div>) : (
                    <div className="w-full bg-[#f9c329] flex justify-center mt-20">
                        <Link className="my-4" href="" ><Button><DownloadIcon/> Download Hasil</Button></Link>
                    </div>

                )}


            </div>
    )
}