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
import { Line } from 'react-chartjs-2';
import LineChart from "@/components/landing/zero-capex/LineChart";
import Link from "next/link";
import LineChartLeasing from "@/components/landing/zero-capex/LineChartLeasing";
import { useReactToPrint } from 'react-to-print';
import ReactPDF, {Page, Text, View, Document, StyleSheet, PDFViewer} from '@react-pdf/renderer';
import {useRouter} from "next/navigation";
import ImageComponent from "@/components/landing/zero-capex/image-component";
import {Locale} from "@/i18n.config";

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
    LuasPanel: {
        Panjang: 2.38,
        Lebar: 1.3,
        Unit: "m",
    },
    LuasPanelM2: 3.106352,
    DayaYangDihasilkanSatuPanel: 695.0,
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


export default function ZeroCapexResult({ lang, dictionary} : { lang: Locale, dictionary: any}) {
    const router = useRouter();
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

    const [isDownload, setIsDownload] = React.useState(false)

    const convertNextPageToPDF = () => {
        setIsDownload(true)
        const input = document.getElementById('page-content');
        if(input === null) return;

        const input2 = document.getElementById('page-content2');
        if(input2 === null) return;

        let plan: HTMLElement | null;
        if(selectedPlan == 0) {
            plan = document.getElementById('solar-rental');
        } else if (selectedPlan == 1) {
            plan = document.getElementById('turnkey-epc');
        }

        let rekomendasi: HTMLElement | null;
        if(selectedRecommendation == 0) {
            rekomendasi = document.getElementById('rekomendasi1');
        } else if (selectedRecommendation == 1) {
            rekomendasi = document.getElementById('rekomendasi2');
        }

        // @ts-ignore

        // Capture the content of the page as an image using html2canvas
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();

                html2canvas(input2)
                    .then(async (canvas2) => {
                        if(plan === null) return;
                        if(rekomendasi === null) return;
                        const planz = await html2canvas(plan)
                        const rekomendasiz = await html2canvas(rekomendasi)
                        const imgRekomendasi = rekomendasiz.toDataURL('image/png');
                        pdf.addImage(imgRekomendasi, 'PNG', 50, 0, 120, 300);
                        pdf.addPage();

                        const imgPlan = planz.toDataURL('image/png');
                        pdf.addImage(imgPlan, 'PNG', 50, 0, 120, 200);
                        pdf.addPage();

                        const imgData2 = canvas2.toDataURL('image/png');
                        pdf.addImage(imgData2, 'PNG', 0, 0, 210, 300);
                        pdf.addPage();
                        // Add the captured image to the PDF
                        pdf.addImage(imgData, 'PNG', 0, 0, 210, 260);

                        // Save the PDF file
                        pdf.save('next_page.pdf');
                        setIsDownload(false)
                    })
            });
    };

    const convertNextPageToPDF2 = () => {
        setIsDownload(true)
        const chart = document.getElementById('chart');
        if(chart === null) return;

        // @ts-ignore

        // Capture the content of the page as an image using html2canvas
        html2canvas(chart)
            .then(async (canvas) => {

                // const bg = await html2canvas(<ImageComponent />);
                const selectedJenisProperty = pricingData.find(e => e.categoryEn === cookie.get("jenisProperty"))

                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();

                const justifyText = (pdf: jsPDF, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
                    const words = text.split(' ');
                    let line = '';
                    let newY = y;
                    words.forEach(word => {
                        const testLine = line + word + ' ';
                        const { w } = pdf.getTextDimensions(testLine);
                        if (w > maxWidth) {
                            pdf.text(line, x, newY);
                            line = word + ' ';
                            newY += lineHeight;
                        } else {
                            line = testLine;
                        }
                    });
                    pdf.text(line, x, newY);
                };

                pdf.addImage(lang === "id" ? "/images/zero_capex_br_en.png" : "/images/zero_capex_br_id.png", 'PNG', 0, 0, 210, 297);
                pdf.setFontSize(9);
                pdf.setTextColor(39, 73, 105);
                pdf.text(cookie.get("lokasi") ?? "", 58, 117);
                pdf.text(selectedJenisProperty?.categoryEn ?? "", 58, 122.7);
                pdf.text((cookie.get("dayaListrik") ?? "") + " kVA", 58, 128.5);
                pdf.text((cookie.get("luasArea") ?? "") + " m2", 58, 134.2);
                pdf.text("Rp "+(cookie.get("tagihanListrik") ?? "") + " ", 58, 140);
                pdf.text("Rp "+(cookie.get("tarifListrik") ?? "") + " per kWh", 58, 146);
                pdf.text((Number(cookie.get("estimatedpowerusage")).toFixed(2) ?? "") + " kWh", 58, 152);
                pdf.text(cookie.get("lokasiPemasangan") ?? "", 58, 157.5);
                pdf.text(cookie.get("youremail") ?? "-", 58, 163);

                const rekomendasi = selectedRecommendation === 0 ? rekomendasiInstallasi : rekomendasiInstallasi2;
                const area = selectedRecommendation === 0 ? areaPotensial : areaPotensial2;
                const jumlah = selectedRecommendation === 0 ? jumlahModulSurya : jumlahModulSurya2;
                const produksi = selectedRecommendation === 0 ? produksiEnergiPerTahun : produksiEnergiPerTahun2;
                const periode = selectedRecommendation === 0 ? periodeInstallasi : periodeInstallasi2;

                pdf.text((rekomendasi ?? "") + " kWp", 170, 117);
                pdf.text(area + " m2", 170, 122.7);
                pdf.text(jumlah + " pcs", 170, 128.5);
                pdf.text(produksi + " kWp", 170, 134.2);
                pdf.text(periode + " month", 170, 140);

                pdf.setFontSize(12);
                pdf.setTextColor(255, 255, 255);
                pdf.setFont('helvetica', 'bold');

                pdf.text(co2Avoided, 22, 198);
                pdf.text(coalBurned, 61, 198);
                pdf.text(vehicleDriven, 100, 198);
                pdf.text(gasolineBurned, 139, 198);
                pdf.text(treesNeeded, 178, 198);

                pdf.setFontSize(15);
                if(selectedPlan === 0) {
                    pdf.text("Solar Rental\nZero Capex",10, 228)
                } else if (selectedPlan === 1) {
                    pdf.text("Turnkey EPC Direct\nPurchase",10, 228)
                }

                pdf.setFontSize(9);
                pdf.setFont('helvetica', 'normal');

                if(selectedPlan === 0) {
                    if(lang === "id") {
                        pdf.text("Zero advance, Monthly fee",14, 243)
                        pdf.text("Long-term Cooperation",14, 250)
                        pdf.text("Minimum installed Capacity 500 kWp",14, 257)
                        pdf.text("Warranty & OM Service",14, 264)
                        pdf.text("Digital Performance Monitoring",14, 271)
                    } else {
                        pdf.text("Tanpa uang muka, Biaya bulanan", 14, 243);
                        pdf.text("Kerjasama jangka panjang", 14, 250);
                        pdf.text("Kapasitas minimum terpasang 500 kWp", 14, 257);
                        pdf.text("Jaminan & Layanan OM", 14, 264);
                        pdf.text("Pemantauan Kinerja Digital", 14, 271);

                    }

                } else if(selectedPlan === 1) {
                    if(lang === "id") {
                        pdf.text("Zero advance, Monthly fee",14, 243)
                        pdf.text("Short-term Cooperation",14, 250)
                        pdf.text("Unlimited installed Capacity",14, 257)
                        pdf.text("Warranty & OM Service",14, 264)
                        pdf.text("Digital Performance Monitoring",14, 271)
                    } else {
                        pdf.text("Tanpa uang muka, Biaya bulanan", 14, 243);
                        pdf.text("Kerjasama jangka pendek", 14, 250);
                        pdf.text("Kapasitas terpasang tanpa batas", 14, 257);
                        pdf.text("Jaminan & Layanan OM", 14, 264);
                        pdf.text("Pemantauan Kinerja Digital", 14, 271);
                    }
                }

                pdf.setFont('helvetica', 'bold');
                pdf.setFontSize(12);

                if(selectedPlan === 0) {
                    if(lang === "id") {
                        pdf.text(`Start from ${priceSolarRental}/month`,8, 281)
                    } else {
                        pdf.text(`Mulai Dari ${priceSolarRental}/bulan`,8, 281)
                    }
                } else if(selectedPlan === 1) {
                    if(lang === "id") {
                        pdf.text(`Start from ${priceTurnkeyEPC}/month`,8, 281)
                    } else {
                        pdf.text(`Mulai dari ${priceTurnkeyEPC}/bulan`,8, 281)
                    }
                }

                pdf.addImage(imgData, 'PNG', 95, 225, 60, 60);

                pdf.setFontSize(9);
                pdf.setFont('helvetica', 'normal');

                const text = lang === "id" ? "*This graph shows a comparison of the client's expenditure if using solar leasing compared to using only PLN electricity from year to year. You can see this comparison, using a solar power plant can save electricity expenses every year." : '*Grafik ini menunjukkan perband- ingan jumlah pengeluaran klien jika menggunakan solar leasing dibandingkan dengan hanya menggunakan listrik PLN dari tahun ke tahun. Bisa dilihat perbandingan tersebut, menggu- nakan Pembangkit Listri Tenaga Surya dapat menghemat pengel- uaran listrik setiap tahun.';
                justifyText(pdf, text, 160, 227, 48, 4);

                pdf.save('zero_capex_result.pdf');
                setIsDownload(false)
            });
    };

    useEffect(() => {
        cookie.set("selectedPlan", String(selectedPlan))
    }, [selectedPlan])


    useEffect(() => {
        // Data dari klien
        const dayaListrikPLN = Number(cookie.get("dayaListrik")); // Kapasitas PLN dalam kVa
        const tarifListrik = Number(cookie.get("tarifListrik")); // Tarif listrik per kwh dalam rupiah
        const tagihanListrikPerBulan = Number(cookie.get("tagihanListrik")); // Tagihan listrik per bulan dalam rupiah
        const luasAreaProperty = Number(cookie.get("luasArea")); // Luas area property dalam m2
        const estimatedPowerUsage = Number(cookie.get("estimatedpowerusage"));
        const lokasi = cookie.get("lokasi");

        // Rekomendasi Installasi (kWp)

        function ceilingMath(value: number, factor: number): number {
            // Assuming value and factor are both numbers
            return Math.ceil(value / factor) * factor;
        }

        // Area Potensial (m2) & Jumlah Modul Surya (Pcs)


        const psh = locationData.find(e => e.province === lokasi)?.psh ?? 0;
        const jumlahModulSurya = (luasAreaProperty - (luasAreaProperty*20/100)) / solarPanelInfo.LuasPanelM2;
        const areaPotensial = jumlahModulSurya * solarPanelInfo.LuasPanelM2; // Satu modul surya memiliki dimensi 3 m
        const rekomendasiInstallasi =  parseFloat((Math.floor(luasAreaProperty / 1.3 / 2.4) * 0.695).toFixed(2));

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


        cookie.set("selectedRecommendation", String(selectedRecommendation))

    }, [selectedRecommendation])


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

    // "hasil": "HASIL",
    //     "pilih_pendekatan": "Pilih Pendekatan",
    //     "rekomendasi_installasi_luasan": "Rekomendasi Installasi\nSesuai Luasan Tersedia",
    //     "rekomendasi_installasi_profil_beban": "Rekomendasi Installasi\nSesuai Profil Beban",
    //     "rekomendasi_luasan_desc": "Dengan memilih pendekatan ini, data akan menyesuaikan dengan luasan lahan yang tersedia",
    //     "rekomendasi_profil_desc": "Dengan memilih pendekatan ini, data akan menyesuaikan dengan daya yang dibutuhkan untuk memenuhi beban yang ada",
    //     "rekomendasi_installasi": "Rekomendasi Installasi (kWp)",
    //     "area_potensial": "Area Potensial (m2)",
    //     "jumlah_modul_surya": "Jumlah Modul Surya (pcs)",
    //     "produksi_energi_per_tahun": "Produksi Energi per Tahun (kWh)",
    //     "periode_installasi": "Periode Installasi",
    //     "dampak_lingkungan": "Dampak Lingkungan\ndalam 25 tahun",
    //     "co2_avoided": "Co2 yang Dihindari (kg Co2/kWh)",
    //     "coal_burned": "Batubara Terbakar (kg Co2/kWh)",
    //     "vehicle_driven": "Kendaraan Dikendarai (km Co2/kWh)",
    //     "gasoline_burned": "Bensin Terbakar (liter Co2/kWh)",
    //     "tree_needed": "Kebutuhan Pohon (pohon Co2/kWh)",
    //     "choose_best_plan": "Pilih paket terbaik untuk bisnis Anda",
    //     "choose_best_plan_desc": "Silakan pilih layanan kami yang paling sesuai untuk bisnis Anda.\nJelajahi rencana kami dan jadikan itu sebagai referensi Anda",
    //     "download_hasil": "Download Hasil"

        // @ts-ignore
    return (
            <div className="w-full flex flex-col bg-[#15537A] items-center justify-center">
                <h1 className="mt-10 text-3xl text-white font-bold">{dictionary.hasil}</h1>
                <div className="w-full mt-20 mb-32">
                    <div className="mx-auto mt-[300px] lg:mt-0 flex flex-col lg:flex-row gap-4 justify-center lg:justify-between lg:px-20">
                        <div className="flex-1">
                            <div className="flex flex-col items-center justify-center">
                                <h1 className="text-2xl text-white">{dictionary.pilih_pendekatan}</h1>
                                <div className="flex">
                                    <div className="flex-1">
                                        <div className="flex flex-col items-center px-4 py-6 gap-4">
                                            <div id="rekomendasi1" className={cn("rounded-2xl  px-4 py-6 w-full shadow-xl bg-[#f9c329] flex flex-col items-center gap-4", selectedRecommendation === 0 ? "border-white border-4" : "")}>
                                                <h1 className="text-lg text-center">{dictionary.rekomendasi_installasi_luasan}</h1>
                                                <p className="text-xs text-gray-700 text-center h-[80px]">{dictionary.rekomendasi_luasan_desc}</p>

                                                <hr className="w-full border-white"/>
                                                <div className="flex flex-col w-full gap-2">
                                                    <h1 className="text-[#15537A]">
                                                        {dictionary.rekomendasi_installasi}
                                                    </h1>
                                                    <div className="bg-white rounded-lg flex py-2 px-4">
                                                        <p>{rekomendasiInstallasi}</p>
                                                    </div>
                                                    {/*<Input value={rekomendasiInstallasi} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {*/}

                                                    {/*}} />*/}
                                                </div>
                                                <div className="flex flex-col w-full gap-2">
                                                    <h1 className="text-[#15537A]">
                                                        {dictionary.area_potensial }
                                                    </h1>
                                                    {/*<Input value={areaPotensial} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {*/}

                                                    {/*}} />*/}
                                                    <div className="bg-white rounded-lg flex py-2 px-4">
                                                        <p>{areaPotensial}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col w-full gap-2">
                                                    <h1 className="text-[#15537A]">
                                                        {dictionary.jumlah_modul_surya }
                                                    </h1>
                                                    {/*<Input value={jumlahModulSurya} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {*/}

                                                    {/*}} />*/}
                                                    <div className="bg-white rounded-lg flex py-2 px-4">
                                                        <p>{jumlahModulSurya}</p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col w-full gap-2">
                                                    <h1 className="text-[#15537A]">
                                                        {dictionary.produksi_energi_per_tahun }
                                                    </h1>
                                                    {/*<Input value={produksiEnergiPerTahun} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {*/}

                                                    {/*}} />*/}
                                                    <div className="bg-white rounded-lg flex py-2 px-4">
                                                        <p>{produksiEnergiPerTahun}</p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col w-full gap-2">
                                                    <h1 className="text-[#15537A]">
                                                        {dictionary.periode_installasi }
                                                    </h1>
                                                    {/*<Input value={periodeInstallasi} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {*/}

                                                    {/*}} />*/}
                                                    <div className="bg-white rounded-lg flex py-2 px-4">
                                                        <p>{periodeInstallasi}</p>
                                                    </div>
                                                </div>

                                                {isDownload ? <></> : (
                                                    <Button className="w-full mt-4" onClick={() => {
                                                        setSelectedRecommendation(0)
                                                    }}>{lang === "id" ? "Choose Plan" : "Pilih Paket"}</Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col items-center px-4 py-6 gap-4">
                                            <div id="rekomendasi2" className={cn("rounded-2xl  px-4 py-6 w-full shadow-xl bg-[#f9c329] flex flex-col items-center gap-4", selectedRecommendation === 1 ? "border-white border-4" : "")}>
                                                <h1 className="text-lg text-center">{dictionary.rekomendasi_installasi_profil_beban}</h1>
                                                <p className="text-xs text-gray-700 text-center h-[80px]">{dictionary.rekomendasi_profil_desc}</p>

                                                <hr className="w-full border-white"/>
                                                <div className="flex flex-col w-full gap-2">
                                                    <h1 className="text-[#15537A]">
                                                        {dictionary.rekomendasi_installasi}
                                                    </h1>
                                                    {/*<Input value={rekomendasiInstallasi2} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {*/}

                                                    {/*}} />*/}
                                                    <div className="bg-white rounded-lg flex py-2 px-4">
                                                        <p>{rekomendasiInstallasi2}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col w-full gap-2">
                                                    <h1 className="text-[#15537A]">
                                                        {dictionary.area_potensial }
                                                    </h1>
                                                    {/*<Input value={areaPotensial2} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {*/}

                                                    {/*}} />*/}
                                                    <div className="bg-white rounded-lg flex py-2 px-4">
                                                        <p>{areaPotensial2}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col w-full gap-2">
                                                    <h1 className="text-[#15537A]">
                                                        {dictionary.jumlah_modul_surya }
                                                    </h1>
                                                    {/*<Input value={jumlahModulSurya2} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {*/}

                                                    {/*}} />*/}
                                                    <div className="bg-white rounded-lg flex py-2 px-4">
                                                        <p>{jumlahModulSurya2}</p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col w-full gap-2">
                                                    <h1 className="text-[#15537A]">
                                                        {dictionary.produksi_energi_per_tahun }
                                                    </h1>
                                                    {/*<Input value={produksiEnergiPerTahun2} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {*/}

                                                    {/*}} />*/}
                                                    <div className="bg-white rounded-lg flex py-2 px-4">
                                                        <p>{produksiEnergiPerTahun2}</p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col w-full gap-2">
                                                    <h1 className="text-[#15537A]">
                                                        {dictionary.periode_installasi }
                                                    </h1>
                                                    {/*<Input value={periodeInstallasi2} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {*/}

                                                    {/*}} />*/}
                                                    <div className="bg-white rounded-lg flex py-2 px-4">
                                                        <p>{periodeInstallasi2}</p>
                                                    </div>
                                                </div>
                                                {isDownload ?<></> :(
                                                    <Button className="w-full mt-4" onClick={() => {
                                                        setSelectedRecommendation(1)
                                                    }}>{lang === "id" ? "Choose Plan" : "Pilih Paket"}</Button>
                                                    )}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="h-full border-l border-solid border-white"></div>
                        <div className="flex-1 bg-[#15537A]" id="page-content2">
                            <div className="flex flex-col items-center justify-center">
                                <h1 className="text-2xl text-white text-center">{dictionary.dampak_lingkungan}</h1>
                                {selectedRecommendation !== -1 ? (
                                    <div className={cn("flex flex-col py-6 gap-8 mx-10","")}>
                                        <div className="flex gap-4">
                                            <img className="w-[50px] h-[50px]" src="/images/icon_zero_capex_1.png" alt="" width={50} height={30} />
                                            <div className="flex flex-col">
                                                <p className="text-white text-sm">{dictionary.co2_avoided}</p>
                                                <h4 className="text-white text-2xl font-bold">{`${co2Avoided}`}</h4>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <Image src="/images/icon_zero_capex_2.png" alt="" width={50} height={30} />
                                            <div className="flex flex-col">
                                                <p className="text-white text-sm">{dictionary.coal_burned}</p>
                                                <h4 className="text-white text-2xl font-bold">{`${coalBurned}`}</h4>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <Image src="/images/icon_zero_capex_2.png" alt="" width={50} height={30} />
                                            <div className="flex flex-col">
                                                <p className="text-white text-sm">{dictionary.vehicle_driven}</p>
                                                <h4 className="text-white text-2xl font-bold">{`${vehicleDriven}`}</h4>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <Image src="/images/icon_zero_capex_2.png" alt="" width={50} height={30} />
                                            <div className="flex flex-col">
                                                <p className="text-white text-sm">{dictionary.gasoline_burned}</p>
                                                <h4 className="text-white text-2xl font-bold">{`${gasolineBurned}`}</h4>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <Image src="/images/icon_zero_capex_2.png" alt="" width={50} height={30} />
                                            <div className="flex flex-col">
                                                <p className="text-white text-sm">{dictionary.tree_needed}</p>
                                                <h4 className="text-white text-2xl font-bold">{`${treesNeeded}`}</h4>
                                            </div>
                                        </div>
                                    </div>
                                ) : (<div className="text-white mt-20">{lang === "id" ? "Please choose an Approach" : "Silahkan pilih pendekatan"}</div>)}
                            </div>
                        </div>
                        {/*<Image className="h-fit pb-[600px]" src="/images/zero-capex-banner-2.png" alt="" width={500} height={500} />*/}
                    </div>
                </div>

                {selectedRecommendation === -1 ? (<div></div>) : (
                    <div className="flex flex-col mt-64 md:mt-0 md:flex-row w-full px-10 md:px-60 gap-4">
                        <div className="px-8 py-8 flex-1 bg-[#2190AE] rounded-sm flex flex-col gap-4">
                            <h1 className="text-white text-xl font-bold">{dictionary.choose_best_plan}</h1>
                            <p className="text-white/80 text-sm">{dictionary.choose_best_plan_desc}</p>
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
                        <div id="solar-rental" className={cn("px-8 py-8 flex-1 bg-[#FCBA28] rounded-sm flex flex-col", selectedPlan === 0 ? "border-white border-4" : "")}>
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
                                <p className="text-sm w-full">{lang === "id" ? "Zero advance, Monthly fee" : "Tanpa uang muka, biaya bulanan"}</p>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <Input type="checkbox" className="w-5 h-5" checked={true}/>
                                <p className="text-sm w-full">{lang === "id" ? "Long-term Cooperation" : "Kerja Sama Jangka Panjang"}</p>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <Input type="checkbox" className="w-5 h-5" checked={true}/>
                                <p className="text-sm w-full">{lang === "id" ? "Minimum installed Capacity 500 kWp" : "Kapasitas terpasang minimal 500 kWp"}</p>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <Input type="checkbox" className="w-5 h-5" checked={true}/>
                                <p className="text-sm w-full">{lang === "id" ? "Warranty & OM Service" : "Garansi & Layanan OM"}</p>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <Input type="checkbox" className="w-5 h-5" checked={true}/>
                                <p className="text-sm w-full">{lang === "id" ? "Digital Performance Monitoring" : "Pemantauan Kinerja Digital"}</p>
                            </div>
                            <div className="flex-1"></div>
                            <h1 className="w-full text-center text-lg font-black mt-4">{lang === "id" ? "Start from" : "Mulai dari"}<br/>{priceSolarRental}<br/>/{lang === "id" ? "Month" : "Bulan"}</h1>
                            {isDownload ?<></> : (
                                <Button onClick={(a) => setSelectedPlan(0)} className="text-white text-lg font-bold mt-4">{dictionary.choose_plan}</Button>
                            )}

                        </div>

                        <div id="turnkey-epc" className={cn("px-8 py-8 flex-1 bg-[#FCBA28] rounded-sm flex flex-col", selectedPlan === 1 ? "border-white border-4" : "")}>
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
                                <p className="text-sm w-full">{lang === "id" ? "Low advance, Monthly fee" : "Uang muka rendah, biaya bulanan"}</p>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <Input type="checkbox" className="w-5 h-5" checked={true}/>
                                <p className="text-sm w-full">{lang === "id" ? "Short-term Cooperation" : "Kerja Sama Jangka Pendek"}</p>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <Input type="checkbox" className="w-5 h-5" checked={true}/>
                                <p className="text-sm w-full">{lang === "id" ? "Unlimited installed Capacity" : "Kapasitas terpasang tidak terbatas"}</p>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <Input type="checkbox" className="w-5 h-5" checked={true}/>
                                <p className="text-sm w-full">{lang === "id" ? "Warranty & OM Training" : "Garansi & Pelatihan OM"}</p>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <Input type="checkbox" className="w-5 h-5" checked={true}/>
                                <p className="text-sm w-full">{lang === "id" ? "Digital Performance Monitoring" : "Pemantauan Kinerja Digital"}</p>
                            </div>
                            <div className="flex-1"></div>
                            <h1 className="w-full text-center text-lg font-black mt-4">{lang === "id" ? "Start from" : "Mulai dari"}<br/>{priceTurnkeyEPC}<br/>/{lang === "id" ? "Month" : "Bulan"}</h1>
                            {isDownload ?<></> : (
                                <Button onClick={(a) => setSelectedPlan(1)} className="text-white text-lg font-bold mt-4">{dictionary.choose_plan}</Button>
                            )}
                        </div>
                    </div>
                )}

                <div className="bg-[#15537A]" id="chart">
                    {selectedPlan === 1 ? (
                        <LineChart
                            currentPLNTarrif={parseFloat(cookie.get("tarifListrik") ?? "0.0")}
                            solarInvestment={parseFloat(priceTurnkeyEPC.replaceAll(".","").replaceAll("Rp", "").replaceAll(",", ".").trim())}
                            electricityUsagePerMonth = {parseFloat(cookie.get("tagihanListrik") ?? "0.0") / parseFloat(cookie.get("tarifListrik") ?? "0.0")}
                            capacity={parseFloat( selectedRecommendation === 0 ? rekomendasiInstallasi.replaceAll(",", "") : rekomendasiInstallasi2.replaceAll(",", ""))}
                            size={600}
                        />) : (
                        <div></div>
                    )}

                    {selectedPlan === 0 ? (<LineChartLeasing
                        currentPLNTarrif={parseFloat(cookie.get("tarifListrik") ?? "0.0")}
                        solarInvestment={parseFloat(priceTurnkeyEPC.replaceAll(".","").replaceAll("Rp", "").replaceAll(",", ".").trim())}
                        electricityUsagePerMonth = {parseFloat(cookie.get("tagihanListrik") ?? "0.0") / parseFloat(cookie.get("tarifListrik") ?? "0.0")}
                        capacity={parseFloat( selectedRecommendation === 0 ? rekomendasiInstallasi.replaceAll(",", "") : rekomendasiInstallasi2.replaceAll(",", ""))}
                        kwhPerYear={parseFloat( selectedRecommendation === 0 ? produksiEnergiPerTahun.replaceAll(",", "") : produksiEnergiPerTahun2.replaceAll(",", ""))}
                        size={600}
                    />) : (
                        <div></div>
                    )}
                </div>



                {selectedRecommendation === -1 ? (<div></div>) : (
                    <div className="w-full bg-[#f9c329] flex justify-center mt-20">
                        <Button className="my-4" onClick={convertNextPageToPDF2}><DownloadIcon/> {dictionary.download_hasil}</Button>
                        {/*<Link href="/zero-capex-pdf"><Button className="my-4"><DownloadIcon/> Download Hasil</Button></Link>*/}
                    </div>
                )}
            </div>
    )
}