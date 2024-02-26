"use client"

import React, {ReactDOM, useEffect, useRef} from "react";
import Image from "next/image";
import {ScopeOfWOrk} from "@/components/admin/our-business/scope-of-works/scope-of-work-table";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import cookie from "js-cookie";
import {cn} from "@/lib/utils";
import {ArrowRight, DownloadIcon} from "lucide-react";
import {locationData, pricingData} from "@/components/landing/zero-capex/hitung-investasi";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {Line} from 'react-chartjs-2';
import LineChart from "@/components/landing/zero-capex/LineChart";
import Link from "next/link";
import LineChartLeasing from "@/components/landing/zero-capex/LineChartLeasing";
import {useReactToPrint} from 'react-to-print';
import ReactPDF, {Page, Text, View, Document, StyleSheet, PDFViewer} from '@react-pdf/renderer';
import {delay} from "framer-motion";
import {useRouter} from "next/navigation";
import {createFileName, useScreenshot} from 'use-react-screenshot'

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

// Create Document Component


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

const solarPanelInfo = {
    LuasPanel: {
        Panjang: 2.38,
        Lebar: 1.3,
        Unit: "m",
    },
    LuasPanelM2: 3.106352,
    DayaYangDihasilkanSatuPanel: 695.0,
    UnitOfPower: "Wp",
};


const carbonInfo = {
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

function calculateDiscount(rekomendasiInstallasi) {
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


export default function ZeroCapexResultPdf() {
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

    const selectedR = Number.parseInt(cookie.get("selectedRecommendation") ?? "-1");
    const selectedP = Number.parseInt(cookie.get("selectedPlan") ?? "-1");


    const [selectedRecommendation, setSelectedRecommendation] = React.useState(selectedR)
    const [selectedPlan, setSelectedPlan] = React.useState(selectedP)

    const [priceSolarRental, setPriceSolarRental] = React.useState('')
    const [priceTurnkeyEPC, setPriceTurnkeyEPC] = React.useState('')


    const convertNextPageToPDF = () => {
        const input = document.getElementById('page-content');
        if (input === null) return;
        // Capture the content of the page as an image using html2canvas
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();

                // Add the captured image to the PDF
                pdf.addImage(imgData, 'PNG', 0, 0, 200, 300);

                // Save the PDF file
                pdf.save('next_page.pdf');
            });
    };

    const router = useRouter();
    useEffect(() => {
        // Data dari klien
        const dayaListrikPLN = Number(cookie.get("dayaListrik")); // Kapasitas PLN dalam kVa
        const tarifListrik = Number(cookie.get("tarifListrik")); // Tarif listrik per kwh dalam rupiah
        const tagihanListrikPerBulan = Number(cookie.get("tagihanListrik")); // Tagihan listrik per bulan dalam rupiah
        const luasAreaProperty = Number(cookie.get("luasArea")); // Luas area property dalam m2
        const estimatedPowerUsage = Number(cookie.get("estimatedpowerusage"));
        const lokasi = cookie.get("lokasi");

        // Rekomendasi Installasi (kWp)

        function ceilingMath(value, factor) {
            // Assuming value and factor are both numbers
            return Math.ceil(value / factor) * factor;
        }

        // Area Potensial (m2) & Jumlah Modul Surya (Pcs)


        const psh = locationData.find(e => e.province === lokasi)?.psh ?? 0;
        const jumlahModulSurya = (luasAreaProperty - (luasAreaProperty * 20 / 100)) / solarPanelInfo.LuasPanelM2;
        const areaPotensial = jumlahModulSurya * solarPanelInfo.LuasPanelM2; // Satu modul surya memiliki dimensi 3 m
        const rekomendasiInstallasi = parseFloat((Math.floor(luasAreaProperty / 1.3 / 2.4) * 0.695).toFixed(2));

        const rekomendasiInstallasi2 = parseFloat(((estimatedPowerUsage / 26 / psh) * 0.8).toFixed(2));
        const areaPotensial2 = rekomendasiInstallasi2 * solarPanelInfo.LuasPanelM2; // Satu modul surya memiliki dimensi 3 m
        const jumlahModulSurya2 = ceilingMath(rekomendasiInstallasi2 / solarPanelInfo.DayaYangDihasilkanSatuPanel * 1000, 1); // Satu modul surya memiliki dimensi 3 m


        // Produksi Energi per Tahun (kWh)
        const produksiEnergiPerTahun = parseFloat(((rekomendasiInstallasi * psh) * 365).toFixed(2));


        console.log("rekomendasi installasi" + rekomendasiInstallasi)
        const produksiEnergiPerTahun2 = parseFloat(((rekomendasiInstallasi2 * psh) * 365).toFixed(2));

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

        const co2Avoided = (carbonInfo.CO2Avoided.Value * ((selectedRecommendation === 0 ? rekomendasiInstallasi : rekomendasiInstallasi2) * 3.7) * 365) * 20;
        const coalBurned = (carbonInfo.CoalBurned.Value * ((selectedRecommendation === 0 ? rekomendasiInstallasi : rekomendasiInstallasi2) * 3.7) * 365) * 20;
        const vehicleDriven = (carbonInfo.VehicleDriven.Value * ((selectedRecommendation === 0 ? rekomendasiInstallasi : rekomendasiInstallasi2) * 3.7) * 365) * 20;
        const gasolineBurned = (carbonInfo.GasolineBurned.Value * ((selectedRecommendation === 0 ? rekomendasiInstallasi : rekomendasiInstallasi2) * 3.7) * 365) * 20;
        const treesNeeded = (carbonInfo.TreesPlanted.Value * ((selectedRecommendation === 0 ? rekomendasiInstallasi : rekomendasiInstallasi2) * 3.7) * 365) * 20;

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
        const a4 = isNaN(parseFloat(produksiEnergiPerTahun.toFixed(2).toString().replace(/,/g, ''))) ? "" : parseFloat(produksiEnergiPerTahun.toFixed(4).toString().replace(/,/g, '')).toLocaleString();
        const a5 = isNaN(parseFloat(periodeInstallasi.toString().replace(/,/g, ''))) ? "" : parseFloat(periodeInstallasi.toString().replace(/,/g, '')).toLocaleString();

        const a6 = isNaN(parseFloat(rekomendasiInstallasi2.toFixed(2).toString().replace(/,/g, ''))) ? "" : parseFloat(rekomendasiInstallasi2.toFixed(2).toString().replace(/,/g, '')).toLocaleString();
        const a7 = isNaN(parseFloat(areaPotensial2.toFixed(0).toString().replace(/,/g, ''))) ? "" : parseFloat(areaPotensial2.toFixed(0).toString().replace(/,/g, '')).toLocaleString();
        const a8 = isNaN(parseFloat(jumlahModulSurya2.toFixed(0).toString().replace(/,/g, ''))) ? "" : parseFloat(jumlahModulSurya2.toFixed(0).toString().replace(/,/g, '')).toLocaleString();
        const a9 = isNaN(parseFloat(produksiEnergiPerTahun2.toFixed(2).toString().replace(/,/g, ''))) ? "" : parseFloat(produksiEnergiPerTahun2.toFixed(4).toString().replace(/,/g, '')).toLocaleString();
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

        const priceLeasingBulanan = ((selectedJenisProperty?.leasing20 ?? 0) * (rekomendasiInstallasi * psh)) * 30;
        const priceLeasingBulanan2 = ((selectedJenisProperty?.leasing20 ?? 0) * (rekomendasiInstallasi2 * psh)) * 30;
        const hargaDolar = calculateDiscount(rekomendasiInstallasi);
        const hargaDolar2 = calculateDiscount(rekomendasiInstallasi);
        const priceLeasingTahunan = (rekomendasiInstallasi * 16000) * hargaDolar * 1000;
        const priceLeasingTahunan2 = (rekomendasiInstallasi2 * 15800) * hargaDolar2 * 1000;


        console.log("check1 " + selectedJenisProperty?.leasing20);
        console.log("check2 " + rekomendasiInstallasi);
        console.log("check3 " + psh);


        if (selectedRecommendation === 0) {
            setPriceSolarRental(Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(priceLeasingBulanan))
            setPriceTurnkeyEPC(Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(priceLeasingTahunan))
        } else if (selectedRecommendation === 1) {
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

    const ref = useRef(null)
    const [image, takeScreenshot] = useScreenshot()
    const getImage = () => takeScreenshot(ref.current)

    const download = (iImage, {name = 'img', extension = 'png'} = {}) => {
        const a = document.createElement('a')
        a.href = iImage
        a.download = createFileName(extension, name)
        a.click()
    }

    useEffect(() => {
        if (image) {
            download(image, {name: 'zero-capex-result', extension: 'png'})
        }
    }, [image])

    useEffect(() => {
        setTimeout(() => {
            getImage();
        }, 2000);
    }, [])


    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Section #1</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                </View>
            </Page>
        </Document>
    );

    // cookie.set("jenisProperty",jenisProperty.categoryEn);
    // cookie.set("lokasi",lokasi);
    // cookie.set("dayaListrik",dl);
    // cookie.set("tarifListrik",jenisProperty.tariffCode.toString());
    // cookie.set("tagihanListrik",tagihanListrik.replaceAll(",",""));
    // cookie.set("luasArea",la);
    // cookie.set("lokasiPemasangan",lokasiPemasangan);
    // cookie.set("estimatedpowerusage",estimatedPowerUsage.toString().replaceAll(",",""));
    // cookie.set("youremail",yourEmail.toString());
    // cookie.set("rataRataHarian",rataRataHarian.toString().replaceAll(",",""));


    const selectedJenisProperty = pricingData.find(e => e.categoryEn === cookie.get("jenisProperty"))

    const dataYangDimasukkan = [
        {
            title: "Lokasi",
            value: cookie.get("lokasi")
        },
        {
            title: "Daya Terpasang",
            value: `${selectedJenisProperty.categoryEn}`
        },
        {
            title: "Electricity Power",
            value: `${cookie.get("dayaListrik")} kVa`
        },
        {
            title: "Property Area",
            value: `${cookie.get("luasArea")} m2`
        },
        {
            title: "Electricity Bill per Month",
            value: `Rp ${cookie.get("tagihanListrik")}`
        },
        {
            title: "Tarif Listrik",
            value: `Rp ${cookie.get("tarifListrik")}`
        },
        {
            title: "Estimasi Penggunaan Listrik",
            value: `${cookie.get("estimatedpowerusage")} kWh`
        },
        {
            title: "Installation Location",
            value: cookie.get("lokasiPemasangan")
        },
        {
            title: "Email",
            value: cookie.get("youremail")
        },
    ]

    const pendekatan = [
        {
            title: "Pendekatan yang dipilih",
            value: selectedRecommendation === 0 ? rekomendasiInstallasi : rekomendasiInstallasi2
        },
        {
            title: "Area Potensial",
            value: selectedRecommendation === 0 ? areaPotensial : areaPotensial2
        },
        {
            title: "Jumlah Modul Surya",
            value: selectedRecommendation === 0 ? jumlahModulSurya : jumlahModulSurya2
        },
        {
            title: "Produksi Energi Per Tahun",
            value: selectedRecommendation === 0 ? produksiEnergiPerTahun : produksiEnergiPerTahun2
        },
        {
            title: "Periode Installasi",
            value: selectedRecommendation === 0 ? periodeInstallasi : periodeInstallasi2
        },
    ]

    const dampakLingkunan = [
        {
            title: "Co2 Avoided (kg)",
            value: co2Avoided,
            icon: '/images/icon_zero_capex_1.png'
        },
        {
            title: "Coal Burned (kg)",
            value: coalBurned,
            icon: '/images/icon_zero_capex_2.png'
        },
        {
            title: "Vehicle Driven (km)",
            value: vehicleDriven,
            icon: '/images/icon_zero_capex_3.png'
        },
        {
            title: "Gasoline Burned (liter)",
            value: gasolineBurned,
            icon: '/images/icon_zero_capex_4.png'
        },
        {
            title: "Trees Needed",
            value: treesNeeded,
            icon: '/images/icon_zero_capex_5.png'
        },

    ]

    return (
        <div className="w-full flex items-center justify-center flex-col">
            <div ref={ref}>
                <img width={800} src="/images/banner_pdf.png" alt=""/>
                <div className="flex w-[800px]">
                    <div className="w-full flex-col p-4 gap-4">
                        <h1 className="font-bold">Data yang dimasukkan</h1>
                        {/*<hr className="w-full border-yellow-500"/>*/}
                        {dataYangDimasukkan.map((e, i) => (
                            <div className="flex mt-2" key={e.title}>
                                <div className="w-full">
                                    <h1>{e.title}</h1>
                                </div>
                                <h1>:</h1>
                                <div className="w-full ml-4">
                                    <h1>{e.value}</h1>
                                </div>
                            </div>
                        ))}

                    </div>

                    <div className="w-full p-4 gap-2">
                        <h1 className="font-bold">Pendekatan yang dipilih</h1>
                        {/*<hr className="w-full border-yellow-500"/>*/}
                        {pendekatan.map((e, i) => (
                            <div className="flex mt-2" key={e.title}>
                                <div className="w-full">
                                    <h1>{e.title}</h1>
                                </div>
                                <h1>:</h1>
                                <div className="w-full ml-4">
                                    <h1>{e.value}</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {/*<div className="w-[800px] h-[200px]">*/}
                {/*    <img src="/images/banner_co2.png" width={800}/>*/}
                {/*    <div className="absolute w-full py-2.5 bottom-0 inset-x-0 bg-blue-400 text-white text-xs text-center leading-4">this is a text</div>*/}
                {/*</div>*/}

                <div className="relative w-[800px] h-[150px]">
                    <img src="/images/banner_co2.png" alt="Avatar" width={800} height={150} className="object-cover"/>
                    <div
                        className="absolute w-full top-0 inset-x-0 h-full px-4 text-white text-xs text-center leading-4 flex flex-col justify-center">
                        <h1 className="font-bold text-lg">Dampak Lingkungan dalam 25 tahun</h1>
                        <div className="flex justify-between mt-2">
                            {dampakLingkunan.map((e, i) => (
                                <div className="flex gap-2" key={i}>
                                    <Image src={e.icon} alt="" width={30} height={30}/>
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-white text-[10px]">{e.title}</p>
                                        <h4 className="text-white text-sm font-bold">{`${e.value}`}</h4>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
                <div className="flex w-[800px] bg-[#15537a] text-white">
                    <div className="w-full flex-col p-4 gap-4 bg-blue-800">
                        <h1 className="font-bold">Plan Terbaik Untuk Bisnis Anda</h1>
                        {/*<hr className="w-full border-red-600 mt-5"/>*/}
                        {selectedPlan === 0 ? (
                            <div className="flex flex-col">
                                <div className="flex w-[800px]">
                                    <h1 className="text-xl font-bold flex-1">Solar Rental Zero Capex</h1>
                                    <div style={{width: '30px', height: '30px', position: 'relative'}}>
                                        <Image src="/images/ic_plan_1.png" layout='fill'/>
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-4">
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
                                <h1 className="w-full text-center text-lg mt-4">Start from<br/>{priceSolarRental}<br/>/Month</h1>
                            </div>
                        ) : (<div></div>)}

                        {selectedPlan === 1 ? (
                            <div className="flex flex-col">
                                <div className="flex w-[800px]">
                                    <h1 className="text-xl font-bold flex-1">Turnkey EPC Direct Purchase</h1>
                                    <Image src="/images/ic_plan_2.png" alt="" width={30}
                                           height={30}/>
                                </div>
                                <div className="flex gap-4 mt-4">
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
                                <h1 className="w-full text-center text-lg mt-4">Start from<br/>{priceTurnkeyEPC}</h1>
                            </div>
                        ) : (<div></div>)}
                    </div>

                    <div className="w-full p-4 gap-2">
                        <h1 className="font-bold">Grafik Efisiensi Penggunaan</h1>
                        {/*<hr className="w-full border-yellow-500"/>*/}
                        {selectedPlan === 1 ? (
                            <div className="w-[230px]">
                                    <LineChart
                                        currentPLNTarrif={parseFloat(cookie.get("tarifListrik") ?? "0.0")}
                                        solarInvestment={parseFloat(priceTurnkeyEPC.replaceAll(".","").replaceAll("Rp", "").replaceAll(",", ".").trim())}
                                        electricityUsagePerMonth = {parseFloat(cookie.get("tagihanListrik") ?? "0.0") / parseFloat(cookie.get("tarifListrik") ?? "0.0")}
                                        capacity={parseFloat( selectedRecommendation === 0 ? rekomendasiInstallasi.replaceAll(",", "") : rekomendasiInstallasi2.replaceAll(",", ""))}
                                        size={200}
                                    />
                            </div>

                        ) : (
                            <div></div>
                        )}

                        {selectedPlan === 0 ? (<LineChartLeasing
                            currentPLNTarrif={parseFloat(cookie.get("tarifListrik") ?? "0.0")}
                            solarInvestment={parseFloat(priceTurnkeyEPC.replaceAll(".","").replaceAll("Rp", "").replaceAll(",", ".").trim())}
                            electricityUsagePerMonth = {parseFloat(cookie.get("tagihanListrik") ?? "0.0") / parseFloat(cookie.get("tarifListrik") ?? "0.0")}
                            capacity={parseFloat( selectedRecommendation === 0 ? rekomendasiInstallasi.replaceAll(",", "") : rekomendasiInstallasi2.replaceAll(",", ""))}
                            kwhPerYear={parseFloat( selectedRecommendation === 0 ? produksiEnergiPerTahun.replaceAll(",", "") : produksiEnergiPerTahun2.replaceAll(",", ""))}
                            size={200}
                        />) : (
                            <div></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

    // @ts-ignore
    // return (
    //         <div id="page-content" className="w-full flex flex-col bg-[#15537A] items-center justify-center">
    //             <h1 className="mt-10 text-3xl text-white font-bold">HASIL</h1>
    //             <div className="w-full mt-20 mb-32">
    //                 <div className="mx-auto mt-[300px] lg:mt-0 flex flex-col lg:flex-row gap-4 justify-center lg:justify-between lg:px-20">
    //                     <div className="flex-1">
    //                         <div className="flex flex-col items-center justify-center">
    //                             <h1 className="text-2xl text-white">Pilih Pendekatan</h1>
    //                             <div className="flex">
    //                                 <div className="flex-1">
    //                                     <div className="flex flex-col items-center px-4 py-6 gap-4">
    //                                         <div className={cn("rounded-2xl  px-4 py-6 w-full shadow-xl bg-[#f9c329] flex flex-col items-center gap-4", selectedRecommendation === 0 ? "border-white border-4" : "")}>
    //                                             <h1 className="text-lg text-center">Rekomendasi Installasi<br/>Sesuai Luasan Tersedia</h1>
    //                                             <p className="text-xs text-gray-700 text-center h-[80px]">Dengan memilih pendekatan ini, data akan menyesuaikan dengan luasan lahan yang tersedia</p>
    //
    //                                             <hr className="w-full border-white"/>
    //                                             <div className="flex flex-col w-full gap-2">
    //                                                 <h1 className="text-[#15537A]">
    //                                                     Rekomendasi Installasi (kWp)
    //                                                 </h1>
    //                                                 <Input value={rekomendasiInstallasi} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {
    //
    //                                                 }} />
    //                                             </div>
    //                                             <div className="flex flex-col w-full gap-2">
    //                                                 <h1 className="text-[#15537A]">
    //                                                     Area Potensial (m2)
    //                                                 </h1>
    //                                                 <Input value={areaPotensial} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {
    //
    //                                                 }} />
    //                                             </div>
    //                                             <div className="flex flex-col w-full gap-2">
    //                                                 <h1 className="text-[#15537A]">
    //                                                     Jumlah Modul Surya (pcs)
    //                                                 </h1>
    //                                                 <Input value={jumlahModulSurya} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {
    //
    //                                                 }} />
    //                                             </div>
    //
    //                                             <div className="flex flex-col w-full gap-2">
    //                                                 <h1 className="text-[#15537A]">
    //                                                     Produksi Energi per Tahun (kWh)
    //                                                 </h1>
    //                                                 <Input value={produksiEnergiPerTahun} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {
    //
    //                                                 }} />
    //                                             </div>
    //
    //                                             <div className="flex flex-col w-full gap-2">
    //                                                 <h1 className="text-[#15537A]">
    //                                                     Periode Installasi
    //                                                 </h1>
    //                                                 <Input value={periodeInstallasi} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {
    //
    //                                                 }} />
    //                                             </div>
    //
    //                                             <Button className="w-full mt-4" onClick={() => {
    //                                                 setSelectedRecommendation(0)
    //                                             }}>Choose Plan</Button>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                                 <div className="flex-1">
    //                                     <div className="flex flex-col items-center px-4 py-6 gap-4">
    //                                         <div className={cn("rounded-2xl  px-4 py-6 w-full shadow-xl bg-[#f9c329] flex flex-col items-center gap-4", selectedRecommendation === 1 ? "border-white border-4" : "")}>
    //                                             <h1 className="text-lg text-center">Rekomendasi Installasi<br/>Sesuai Profil Beban</h1>
    //                                             <p className="text-xs text-gray-700 text-center h-[80px]">Dengan memilih pendekatan ini, data akan menyesuaikan dengan daya yang dibutuhkan untuk memenuhi beban yang ada</p>
    //
    //                                             <hr className="w-full border-white"/>
    //                                             <div className="flex flex-col w-full gap-2">
    //                                                 <h1 className="text-[#15537A]">
    //                                                     Rekomendasi Installasi (kWp)
    //                                                 </h1>
    //                                                 <Input value={rekomendasiInstallasi2} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {
    //
    //                                                 }} />
    //                                             </div>
    //                                             <div className="flex flex-col w-full gap-2">
    //                                                 <h1 className="text-[#15537A]">
    //                                                     Area Potensial (m2)
    //                                                 </h1>
    //                                                 <Input value={areaPotensial2} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {
    //
    //                                                 }} />
    //                                             </div>
    //                                             <div className="flex flex-col w-full gap-2">
    //                                                 <h1 className="text-[#15537A]">
    //                                                     Jumlah Modul Surya (pcs)
    //                                                 </h1>
    //                                                 <Input value={jumlahModulSurya2} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {
    //
    //                                                 }} />
    //                                             </div>
    //
    //                                             <div className="flex flex-col w-full gap-2">
    //                                                 <h1 className="text-[#15537A]">
    //                                                     Produksi Energi per Tahun (kWh)
    //                                                 </h1>
    //                                                 <Input value={produksiEnergiPerTahun2} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {
    //
    //                                                 }} />
    //                                             </div>
    //
    //                                             <div className="flex flex-col w-full gap-2">
    //                                                 <h1 className="text-[#15537A]">
    //                                                     Periode Installasi
    //                                                 </h1>
    //                                                 <Input value={periodeInstallasi2} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {
    //
    //                                                 }} />
    //                                             </div>
    //
    //                                             <Button className="w-full mt-4" onClick={() => {
    //                                                 setSelectedRecommendation(1)
    //                                             }}>Choose Plan</Button>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className="h-full border-l border-solid border-white"></div>
    //                     <div className="flex-1">
    //                         <div className="flex flex-col items-center justify-center">
    //                             <h1 className="text-2xl text-white text-center">Dampak Lingkungan<br/>dalam 25 tahun</h1>
    //                             {selectedRecommendation !== -1 ? (
    //                                 <div className={cn("flex flex-col py-6 gap-8 mx-10","")}>
    //                                     <div className="flex gap-4">
    //                                         <Image src="/images/icon_zero_capex_1.png" alt="" width={50} height={30} />
    //                                         <div className="flex flex-col">
    //                                             <p className="text-white text-sm">Co2 Avoided (kg Co2/kWh)</p>
    //                                             <h4 className="text-white text-2xl font-bold">{`${co2Avoided}`}</h4>
    //                                         </div>
    //                                     </div>
    //                                     <div className="flex gap-4">
    //                                         <Image src="/images/icon_zero_capex_2.png" alt="" width={50} height={30} />
    //                                         <div className="flex flex-col">
    //                                             <p className="text-white text-sm">Coal Burned (kg Co2/kWh)</p>
    //                                             <h4 className="text-white text-2xl font-bold">{`${coalBurned}`}</h4>
    //                                         </div>
    //                                     </div>
    //                                     <div className="flex gap-4">
    //                                         <Image src="/images/icon_zero_capex_2.png" alt="" width={50} height={30} />
    //                                         <div className="flex flex-col">
    //                                             <p className="text-white text-sm">Vehicle Driven (km Co2/kWh)</p>
    //                                             <h4 className="text-white text-2xl font-bold">{`${vehicleDriven}`}</h4>
    //                                         </div>
    //                                     </div>
    //                                     <div className="flex gap-4">
    //                                         <Image src="/images/icon_zero_capex_2.png" alt="" width={50} height={30} />
    //                                         <div className="flex flex-col">
    //                                             <p className="text-white text-sm">Gasoline Burned (liter Co2/kWh)</p>
    //                                             <h4 className="text-white text-2xl font-bold">{`${gasolineBurned}`}</h4>
    //                                         </div>
    //                                     </div>
    //                                     <div className="flex gap-4">
    //                                         <Image src="/images/icon_zero_capex_2.png" alt="" width={50} height={30} />
    //                                         <div className="flex flex-col">
    //                                             <p className="text-white text-sm">Tree Needed (trees Co2/kWh)</p>
    //                                             <h4 className="text-white text-2xl font-bold">{`${treesNeeded}`}</h4>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             ) : (<div className="text-white mt-20">Silahkan pilih pendekatan</div>)}
    //                         </div>
    //                     </div>
    //                     {/*<Image className="h-fit pb-[600px]" src="/images/zero-capex-banner-2.png" alt="" width={500} height={500} />*/}
    //                 </div>
    //             </div>
    //
    //             {selectedRecommendation === -1 ? (<div></div>) : (
    //                 <div className="flex flex-col mt-64 md:mt-0 md:flex-row w-full px-10 md:px-60 gap-4">
    //                     <div className="px-8 py-8 flex-1 bg-[#2190AE] rounded-sm flex flex-col gap-4">
    //                         <h1 className="text-white text-xl font-bold">Choose best plan for your business</h1>
    //                         <p className="text-white/80 text-sm">Please choose our service that is most suitable for your business.<br/>Explore our plan and have it as your reference</p>
    //                         <ArrowRight color="#ffffff"></ArrowRight>
    //                         <Image
    //                             alt='Mountains'
    //                             src='/images/img_plan.png'
    //                             width={0}
    //                             height={0}
    //                             sizes="100vw"
    //                             style={{ width: '100%', height: 'auto' }} // optional
    //                         />
    //                     </div>
    //                     <div className={cn("px-8 py-8 flex-1 bg-[#FCBA28] rounded-sm flex flex-col", selectedPlan === 0 ? "border-white border-4" : "")}>
    //                         <div className="flex">
    //                             <h1 className="text-xl font-bold">Solar Rental Zero Capex</h1>
    //                             <Image src="/images/ic_plan_1.png" alt="" width={0}
    //                                    height={0}
    //                                    sizes="50vw"
    //                                    style={{ width: '20%', height: 'auto' }}  />
    //                         </div>
    //                         <hr className="my-3"/>
    //                         <div className="flex gap-4">
    //                             <Input type="checkbox" className="w-5 h-5" checked={true}/>
    //                             <p className="text-sm w-full">Zero advance, Monthly fee</p>
    //                         </div>
    //                         <div className="flex gap-4 mt-4">
    //                             <Input type="checkbox" className="w-5 h-5" checked={true}/>
    //                             <p className="text-sm w-full">Long-term Cooperation</p>
    //                         </div>
    //                         <div className="flex gap-4 mt-4">
    //                             <Input type="checkbox" className="w-5 h-5" checked={true}/>
    //                             <p className="text-sm w-full">Minimum installed Capacity 500 kWp</p>
    //                         </div>
    //                         <div className="flex gap-4 mt-4">
    //                             <Input type="checkbox" className="w-5 h-5" checked={true}/>
    //                             <p className="text-sm w-full">Warranty & OM Service</p>
    //                         </div>
    //                         <div className="flex gap-4 mt-4">
    //                             <Input type="checkbox" className="w-5 h-5" checked={true}/>
    //                             <p className="text-sm w-full">Digital Performance Monitoring</p>
    //                         </div>
    //                         <div className="flex-1"></div>
    //                         <h1 className="w-full text-center text-lg font-black mt-4">Start from<br/>{priceSolarRental}<br/>/Month</h1>
    //                         <Button onClick={(a) => setSelectedPlan(0)} className="text-white text-lg font-bold mt-4">Choose Plan</Button>
    //                     </div>
    //
    //                     <div className={cn("px-8 py-8 flex-1 bg-[#FCBA28] rounded-sm flex flex-col", selectedPlan === 1 ? "border-white border-4" : "")}>
    //                         <div className="flex">
    //                             <h1 className="text-xl font-bold">Turnkey EPC Direct Purchase</h1>
    //                             <Image src="/images/ic_plan_2.png" alt="" width={0}
    //                                    height={0}
    //                                    sizes="50vw"
    //                                    style={{ width: '20%', height: 'auto' }}  />
    //                         </div>
    //                         <hr className="my-3"/>
    //                         <div className="flex gap-4">
    //                             <Input type="checkbox" className="w-5 h-5" checked={true}/>
    //                             <p className="text-sm w-full">Low advance, Monthly fee</p>
    //                         </div>
    //                         <div className="flex gap-4 mt-4">
    //                             <Input type="checkbox" className="w-5 h-5" checked={true}/>
    //                             <p className="text-sm w-full">Short-term Cooperation</p>
    //                         </div>
    //                         <div className="flex gap-4 mt-4">
    //                             <Input type="checkbox" className="w-5 h-5" checked={true}/>
    //                             <p className="text-sm w-full">Unlimited installed Capacity</p>
    //                         </div>
    //                         <div className="flex gap-4 mt-4">
    //                             <Input type="checkbox" className="w-5 h-5" checked={true}/>
    //                             <p className="text-sm w-full">Warranty & OM Training</p>
    //                         </div>
    //                         <div className="flex gap-4 mt-4">
    //                             <Input type="checkbox" className="w-5 h-5" checked={true}/>
    //                             <p className="text-sm w-full">Digital Performance Monitoring</p>
    //                         </div>
    //                         <div className="flex-1"></div>
    //                         <h1 className="w-full text-center text-lg font-black mt-4">Start from<br/>{priceTurnkeyEPC}</h1>
    //                         <Button onClick={(a) => setSelectedPlan(1)} className="text-white text-lg font-bold mt-4">Choose Plan</Button>
    //                     </div>
    //                 </div>
    //             )}
    //
    //
    //             {selectedPlan === 1 ? (
    //                 <LineChart
    //                     currentPLNTarrif={parseFloat(cookie.get("tarifListrik") ?? "0.0")}
    //                     solarInvestment={parseFloat(priceTurnkeyEPC.replaceAll(".","").replaceAll("Rp", "").replaceAll(",", ".").trim())}
    //                     electricityUsagePerMonth = {parseFloat(cookie.get("tagihanListrik") ?? "0.0") / parseFloat(cookie.get("tarifListrik") ?? "0.0")}
    //                     capacity={parseFloat( selectedRecommendation === 0 ? rekomendasiInstallasi.replaceAll(",", "") : rekomendasiInstallasi2.replaceAll(",", ""))}
    //                 />) : (
    //                 <div></div>
    //                 )}
    //
    //             {selectedPlan === 0 ? (<LineChartLeasing
    //                 currentPLNTarrif={parseFloat(cookie.get("tarifListrik") ?? "0.0")}
    //                 solarInvestment={parseFloat(priceTurnkeyEPC.replaceAll(".","").replaceAll("Rp", "").replaceAll(",", ".").trim())}
    //                 electricityUsagePerMonth = {parseFloat(cookie.get("tagihanListrik") ?? "0.0") / parseFloat(cookie.get("tarifListrik") ?? "0.0")}
    //                 capacity={parseFloat( selectedRecommendation === 0 ? rekomendasiInstallasi.replaceAll(",", "") : rekomendasiInstallasi2.replaceAll(",", ""))}
    //                 kwhPerYear={parseFloat( selectedRecommendation === 0 ? produksiEnergiPerTahun.replaceAll(",", "") : produksiEnergiPerTahun2.replaceAll(",", ""))}
    //             />) : (
    //                 <div></div>
    //             )}
    //
    //             {selectedRecommendation === -1 ? (<div></div>) : (
    //                 <div className="w-full bg-[#f9c329] flex justify-center mt-20">
    //                     <Button onClick={convertNextPageToPDF}><DownloadIcon/> Download Hasil</Button>
    //                 </div>
    //             )}
    //         </div>
    // )
}