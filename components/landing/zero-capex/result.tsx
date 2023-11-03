"use client"

import React, {useEffect} from "react";
import Image from "next/image";
import {ScopeOfWOrk} from "@/components/admin/our-business/scope-of-works/scope-of-work-table";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import cookie from "js-cookie";


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
export default function ZeroCapexResult() {
    const [rekomendasiInstallasi, setRekomendasiInstallasi] = React.useState('');
    const [areaPotensial, setAreaPotensial] = React.useState('');
    const [jumlahModulSurya, setJumlahModulSurya] = React.useState('');
    const [produksiEnergiPerTahun, setProduksiEnergiPerTahun] = React.useState('');
    const [periodeInstallasi, setPeriodeInstallasi] = React.useState('');

    const [co2Avoided, setCo2Avoided] = React.useState('');
    const [coalBurned, setCoalBurned] = React.useState('');
    const [vehicleDriven, setVehicleDriven] = React.useState('');
    const [gasolineBurned, setGasolineBurned] = React.useState('');
    const [treesNeeded, setTreesNeeded] = React.useState('');


    useEffect(() => {
        // Data dari klien
        const dayaListrikPLN = Number(cookie.get("dayaListrik")); // Kapasitas PLN dalam kVa
        const tarifListrik = Number(cookie.get("tarifListrik")); // Tarif listrik per kwh dalam rupiah
        const tagihanListrikPerBulan = Number(cookie.get("tagihanListrik")); // Tagihan listrik per bulan dalam rupiah
        const luasAreaProperty = Number(cookie.get("luasArea")); // Luas area property dalam m2

        // Rekomendasi Installasi (kWp)
        const rekomendasiInstallasi = dayaListrikPLN; // Kapasitas PLTS tidak boleh melebihi PLN dalam kWp
        const rekomendasiInstallasiWp = rekomendasiInstallasi * 1000; // Konversi kWp ke Wp
        // Area Potensial (m2) & Jumlah Modul Surya (Pcs)
        const kapasitasSatuModulSurya = 650; // Kapasitas satu modul surya dalam Wp
        const jumlahModulSurya = rekomendasiInstallasiWp / kapasitasSatuModulSurya;
        const areaPotensial = jumlahModulSurya * 3; // Satu modul surya memiliki dimensi 3 m

        // Produksi Energi per Tahun (kWh)
        const specificEnergyProduction = 1346; // Contoh nilai SEP, sesuaikan dengan lokasi
        const produksiEnergiPerTahun = rekomendasiInstallasi * specificEnergyProduction;

        // Periode Installasi
        let periodeInstallasi;
        if (rekomendasiInstallasi < 1000) {
            periodeInstallasi = '3 - 5 Bulan';
        } else {
            periodeInstallasi = '6 Bulan atau Lebih';
        }

        const co2Avoided = produksiEnergiPerTahun * 0.76;
        const coalBurned = produksiEnergiPerTahun * 2.002;
        const vehicleDriven = produksiEnergiPerTahun * 26.4;
        const gasolineBurned = produksiEnergiPerTahun * 0.279;
        const treesNeeded = produksiEnergiPerTahun * 0.023;

        setCo2Avoided(Math.floor(co2Avoided).toLocaleString('en-US').replace(/,/g, '.').toString())
        setCoalBurned(Math.floor(coalBurned).toLocaleString('en-US').replace(/,/g, '.').toString())
        setVehicleDriven(Math.floor(vehicleDriven).toLocaleString('en-US').replace(/,/g, '.').toString())
        setGasolineBurned(Math.floor(gasolineBurned).toLocaleString('en-US').replace(/,/g, '.').toString())
        setTreesNeeded(Math.floor(treesNeeded).toLocaleString('en-US').replace(/,/g, '.').toString())


// Output hasil perhitungan
        console.log('Rekomendasi Installasi (kWp):', rekomendasiInstallasi);
        console.log('Area Potensial (m2):', areaPotensial);
        console.log('Jumlah Modul Surya (Pcs):', jumlahModulSurya);
        console.log('Produksi Energi per Tahun (kWh):', produksiEnergiPerTahun);
        console.log('Periode Installasi:', periodeInstallasi);

        setRekomendasiInstallasi(rekomendasiInstallasi.toString())
        setAreaPotensial(areaPotensial.toFixed(2).toString())
        setJumlahModulSurya(Math.round(jumlahModulSurya).toString())
        setProduksiEnergiPerTahun(produksiEnergiPerTahun.toString())
        setPeriodeInstallasi(periodeInstallasi.toString())


    }, [])

    return (
            <div className="w-full flex flex-col bg-[#15537A] items-center min-h-screen justify-center">
                <h1 className="mt-10 text-3xl text-white font-bold">HASIL</h1>
                <div className="w-full">
                    <div className="mx-auto mt-[800px] lg:mt-0 h-screen flex flex-col lg:flex-row gap-4 justify-center lg:justify-between lg:px-20">
                        <div className="lg:w-[400px]">
                            <div className="flex flex-col items-center px-4 py-6 gap-4">
                                <div className="rounded-2xl px-4 py-6 w-full shadow-xl bg-[#f9c329] flex flex-col items-center gap-4">
                                    <h1>Rekomendasi Installasi</h1>
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

                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col py-6 gap-8 mx-10">
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
                        <Image className="h-fit pb-[600px]" src="/images/zero-capex-banner-2.png" alt="" width={500} height={500} />
                    </div>
                </div>
            </div>
    )
}