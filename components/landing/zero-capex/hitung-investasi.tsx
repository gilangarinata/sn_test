"use client"

import React from "react";
import Image from "next/image";
import {ScopeOfWOrk} from "@/components/admin/our-business/scope-of-works/scope-of-work-table";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {redirect, useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import cookie from 'js-cookie';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Locale} from "@/i18n.config";



type PricingCategory = {
    category: string;
    categoryEn: string;
    type: string;
    tariffCode: number;
    needEmail: boolean;
    leasing20: number;
};

export const pricingData: PricingCategory[] = [
    { category: "Rumah (900 VA)", categoryEn: "House (900 VA)", type: "R-1/TR", tariffCode: 1.352, needEmail: false, leasing20:  1081.60 },
    { category: "Rumah (1300 VA)", categoryEn: "House (1300 VA)", type: "R-1/TR", tariffCode: 1444.7, needEmail: false, leasing20:  1155.76 },
    { category: "Rumah (2200 VA)", categoryEn: "House (2200 VA)", type: "R-1/TR", tariffCode: 1444.7, needEmail: false, leasing20:  1155.76 },
    { category: "Rumah (3500 VA -5500 VA)",categoryEn: "House (3500 VA -5500 VA)", type: "R-2/TR", tariffCode: 1699.53, needEmail: false, leasing20:  1359.624 },
    { category: "Rumah (6600 VA Keatas)", categoryEn: "House (6600 VA Keatas)",type: "R-3/TR", tariffCode: 1699.53, needEmail: false, leasing20:  1359.624 },
    { category: "Komersial (6600 VA-200 kVA)",categoryEn: "Commercial (6600 VA-200 kVA)", type: "B-2/TR", tariffCode: 1444.70, needEmail: true, leasing20:  1155.76 },
    { category: "Komersial (200 kVA Ke atas)",categoryEn: "Commercial (200 kVA and above)", type: "B-3/TM", tariffCode: 1065, needEmail: true, leasing20:  852 },
    { category: "Industri (200 kVA Ke atas)",categoryEn: "Industry (200 kVA and above)", type: "I-3/TM", tariffCode: 1065, needEmail: true, leasing20:  852 },
    { category: "Industri (30.000 kVA ke atas)", categoryEn: "Industry (30.000 kVA and above)",type: "I-4/TT", tariffCode: 1025.88, needEmail: true, leasing20:  820.704 },
    { category: "Tambang", type: "P-1/TR",categoryEn: "Mining", tariffCode: 5115, needEmail: true, leasing20:  4092 },
];


export const locationData = [
    {"province": "Aceh", "value1": 1283.90, "psh": 3.517534247},
    {"province": "Sumatera Utara", "value1": 1220.10, "psh": 3.342739726},
    {"province": "Sumatera Selatan", "value1": 1331.80, "psh": 3.648767123},
    {"province": "Sumatra Barat", "value1": 1364.60, "psh": 3.738630137},
    {"province": "Bengkulu", "value1": 1317.10, "psh": 3.608493151},
    {"province": "Riau", "value1": 1307.50, "psh": 3.582191781},
    {"province": "Kepulauan Riau", "value1": 1288.50, "psh": 3.530136986},
    {"province": "Jambi", "value1": 1289.40, "psh": 3.53260274},
    {"province": "Lampung", "value1": 1369.60, "psh": 3.752328767},
    {"province": "Bangka Belitung", "value1": 1281.80, "psh": 3.511780822},
    {"province": "Kalimantan Barat", "value1": 1361.50, "psh": 3.730136986},
    {"province": "Kalimantan Timur", "value1": 1406.50, "psh": 3.853424658},
    {"province": "Kalimantan Selatan", "value1": 1287.70, "psh": 3.527945205},
    {"province": "Kalimantan Tengah", "value1": 1333.60, "psh": 3.65369863},
    {"province": "Kalimantan Utara", "value1": 1358.70, "psh": 3.722465753},
    {"province": "Banten", "value1": 1359.00, "psh": 3.723287671},
    {"province": "DKI Jakarta", "value1": 1335.90, "psh": 3.66},
    {"province": "Jawa Barat", "value1": 1388.00, "psh": 3.802739726},
    {"province": "Jawa Tengah", "value1": 1429.30, "psh": 3.915890411},
    {"province": "DIY Yogyakarta", "value1": 1506.00, "psh": 4.126027397},
    {"province": "Jawa Timur", "value1": 1510.60, "psh": 4.138630137},
    {"province": "Bali", "value1": 1677.70, "psh": 4.596438356},
    {"province": "Nusa Tenggara Timur", "value1": 1733.50, "psh": 4.749315068},
    {"province": "Nusa Tenggara Barat", "value1": 1742.00, "psh": 4.77260274},
    {"province": "Gorontalo", "value1": 1631.20, "psh": 4.469041096},
    {"province": "Sulawesi Barat", "value1": 1614.60, "psh": 4.423561644},
    {"province": "Sulawesi Tengah", "value1": 1587.90, "psh": 4.350410959},
    {"province": "Sulawesi Utara", "value1": 1457.80, "psh": 3.993972603},
    {"province": "Sulawesi Tenggara", "value1": 1491.40, "psh": 4.086027397},
    {"province": "Sulawesi Selatan", "value1": 1553.20, "psh": 4.255342466},
    {"province": "Maluku Utara", "value1": 1506.80, "psh": 4.128219178},
    {"province": "Maluku", "value1": 1342.40, "psh": 3.677808219},
    {"province": "Papua Barat", "value1": 1329.60, "psh": 3.642739726},
    {"province": "Papua", "value1": 1410.90, "psh": 3.865479452},
    {"province": "Papua Tengah", "value1": 1533.00, "psh": 4.2},
    {"province": "Papua Pegunungan", "value1": 1213.50, "psh": 3.324657534},
    {"province": "Papua Selatan", "value1": 1348.80, "psh": 3.695342466},
    {"province": "Papua Barat Daya", "value1": 1364.90, "psh": 3.739452055}
]

const divStyle = {
    backgroundSize: 'cover',
}
export default function HistungInvestasi({lang, dictionary} : {lang: Locale, dictionary: any}) {
    const router = useRouter();
    const [jenisProperty, setJenisProperty] = React.useState<PricingCategory>();
    const [dayaListrik, setDayaListrik] = React.useState('');
    // const [tarifListrik, setTarifListrik] = React.useState(1025.88);
    const [tagihanListrik, setTagihanListrik] = React.useState('');
    const [luasArea, setLuasArea] = React.useState('');
    const [yourEmail, setYourEmail] = React.useState('');
    const [lokasiPemasangan, setLokasiPemasangan] = React.useState('');
    const [lokasi, setLokasi] = React.useState('');

    const [estimatedPowerUsage, setEstimatedPowerUsage] = React.useState(0);

    const [error, setError] = React.useState('');

    const rataRataHarian = "1";


    //function to calculate estimated power usage
    const calculateEstimatedPowerUsage = () => {
        console.log("tagihanListrik : " + parseFloat(tagihanListrik))
        console.log("jenisProperty?.tariffCode : " + jenisProperty?.tariffCode ?? 0.0)
        console.log("rataRataHarian : " + parseFloat(rataRataHarian))
        const result = (parseFloat(tagihanListrik.replaceAll(",","")) / (jenisProperty?.tariffCode ?? 0.0))
        console.log("setEstimatedPowerUsage : " + result)
        setEstimatedPowerUsage(result)
    }

    React.useEffect(() => {
        calculateEstimatedPowerUsage()
    }, [tagihanListrik, jenisProperty, rataRataHarian, luasArea])

    const currencyFormatter = new Intl.NumberFormat(window.navigator.language, {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
    });

    return (
            <div className="w-full flex flex-col items-center min-h-screen justify-center" style={{ ...divStyle, 'backgroundImage': `url("/images/banner_1.jpg")`}}>
                <div className="bg-white/70 lg:hidden w-full h-full">
                    <h1 className="w-full text-center p-[60px] text-3xl font-bold text-[#f9c329] text-shadow-lg" dangerouslySetInnerHTML={{__html: dictionary.hitung_investasi}}></h1>
                </div>
                <div className="bg-white/70 w-full h-full">
                    <div className="max-w-7xl mx-auto h-full flex">
                        <div className="w-full lg:w-[600px] h-full pb-20">
                            <div className="flex flex-col items-center px-4 py-6 gap-4">
                                <div className="rounded-2xl px-4 py-6 w-full shadow-xl bg-[#f9c329] flex flex-col items-center gap-4">
                                    <h1>{dictionary.mohon_input}</h1>
                                    {/*<Input type="text" placeholder="Jenis Property" onChange={(e) => {*/}
                                    {/*    setJenisProperty(e.target.value);*/}
                                    {/*}} />*/}
                                    {/*<Input type="text" value={lokasi} placeholder="Lokasi" onChange={(e) => {*/}
                                    {/*    // setDayaListrik(e.target.value)*/}
                                    {/*    // const vl = isNaN(parseFloat(e.target.value.replace(/,/g, ''))) ? "0" : parseFloat(e.target.value.replace(/,/g, '')).toLocaleString();*/}
                                    {/*    setLokasi(e.target.value);*/}
                                    {/*}} />*/}
                                    <Select onValueChange={(val) => {
                                        const lokasi = locationData.find(item => item.province === val)?.province
                                        setLokasi(lokasi ?? "")
                                    }}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder={lang === "id" ? "Location*" : "Lokasi*" } />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {locationData.map((item, index) => (
                                                    <SelectItem key={item.province} value={item.province}>{lang === "en" ? item.province : item.province}</SelectItem>
                                                ))}

                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <Select onValueChange={(val) => {
                                        setJenisProperty(pricingData.find(item => item.categoryEn === val))
                                    }}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder={lang === "id" ? "PLN Installation Power*" : "Daya Terpasang PLN*" } />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {pricingData.map((item, index) => (
                                                    <SelectItem key={item.categoryEn} value={item.categoryEn}>{lang === "id" ? item.categoryEn : item.category}</SelectItem>
                                                ))}


                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <Input type="text" value={dayaListrik} placeholder={dictionary.daya_listrik} onChange={(e) => {
                                        // setDayaListrik(e.target.value)
                                        const vl = isNaN(parseFloat(e.target.value.replace(/,/g, ''))) ? "0" : parseFloat(e.target.value.replace(/,/g, '')).toLocaleString();
                                        setDayaListrik(vl === "0" ? "" : vl)
                                    }} />
                                    <Input type="text" value={luasArea} placeholder={dictionary.luas_area} onChange={(e) => {
                                        // setLuasArea(e.target.value)
                                        const vl = isNaN(parseFloat(e.target.value.replace(/,/g, ''))) ? "0" : parseFloat(e.target.value.replace(/,/g, '')).toLocaleString();
                                        setLuasArea(vl === "0" ? "" : vl)
                                    }} />
                                    <Input type="text" value={tagihanListrik} placeholder={dictionary.tagihan_listrik + "*"} onChange={(e) => {
                                        // setTagihanListrik(e.target.value)
                                        const vl = isNaN(parseFloat(e.target.value.replace(/,/g, ''))) ? "0" : parseFloat(e.target.value.replace(/,/g, '')).toLocaleString();
                                        setTagihanListrik(vl === "0" ? "" : vl)
                                    }} />
                                    <p>{dictionary.tarif_listrik + "*"}</p>
                                    <Input readOnly={true} type="text" value={jenisProperty ?  "Rp " +jenisProperty?.tariffCode : ""}  onChange={(e) => {
                                    }} />
                                    <p>{lang === "id" ? "Estimated Power Usage*" : "Estimasi Daya Terpakai*"}</p>
                                    <Input readOnly={true} type="text" value={estimatedPowerUsage ?  Math.ceil(estimatedPowerUsage) + " kWh" : ""}  onChange={(e) => {
                                    }} />
                                    <p>{dictionary.lokasi_pemasangan + "*"}</p>
                                    <div className="flex gap-4">
                                        <div className={cn("flex flex-col items-center hover:cursor-pointer", lokasiPemasangan === "rooftop" ? "bg-yellow-500" : "")} onClick={()=> setLokasiPemasangan("rooftop")}>
                                            <Image width={50} height={50} src="/images/ic_zero_capex_1.png" alt="" />
                                            <p>{dictionary.rooftop}</p>
                                        </div>
                                        <div className={cn("flex flex-col items-center", lokasiPemasangan === "ground_mounted" ? "bg-yellow-500" : "")} onClick={() => setLokasiPemasangan("ground_mounted")}>
                                            <Image width={50} height={50} src="/images/ic_zero_capex_2.png" alt="" />
                                            <p>{dictionary.ground_mounted}</p>
                                        </div>
                                    </div>

                                    {jenisProperty?.needEmail && (
                                        <Input type="text" placeholder={dictionary.your_email} onChange={(e) => {
                                            setYourEmail(e.target.value)
                                        }} />
                                    )}

                                    <p className="text-red-500">{error}</p>
                                </div>

                                <Button onClick={(bt) => {
                                    bt.preventDefault()

                                    if (!jenisProperty) {
                                        setError(lang === "id" ? "Please fill electricity installed PLN" : "Mohon isi daya terpasang PLN")
                                        return;
                                    }

                                    if (lokasi === "") {
                                        setError(lang === "id" ? "Please fill your location" : "Mohon isi lokasi anda")
                                        return;
                                    }

                                    // if (dayaListrik === "") {
                                    //     setError(lang === "en" ? "Please fill electricity power" : "Mohon isi daya listrik")
                                    //     return;
                                    // }


                                    // if (tarifListrik === "") {
                                    //     setError(lang === "en" ? "Please fill electricity tariff" :"Mohon isi tarif listrik")
                                    //     return;
                                    // }

                                    if (tagihanListrik === "") {
                                        setError(lang === "id" ? "Please fill electricity bill" :"Mohon isi tagihan listrik")
                                        return;
                                    }

                                    // if (luasArea === "") {
                                    //     setError(lang === "en" ? "Please fill property area" :"Mohon isi luas area")
                                    //     return;
                                    // }

                                    if (lokasiPemasangan === "") {
                                        setError(lang === "id" ? "Please fill installation location" :"Mohon pilih lokasi pemasangan")
                                        return;
                                    }

                                    if (lokasi === "") {
                                        setError(lang === "id" ? "Please fill location" :"Mohon pilih lokasi")
                                        return;
                                    }

                                    if (jenisProperty.needEmail && yourEmail === "") {
                                        setError(lang === "id" ? "Please fill your email" :"Mohon isi email anda")
                                        return;
                                    }

                                    let dl = "";
                                    if(dayaListrik === "") {
                                        dl = "30000"
                                    } else {
                                        dl = dayaListrik.replaceAll(",","")
                                    }

                                    let la = "";
                                    if(luasArea === "") {
                                        la = "1000"
                                    } else {
                                        la = luasArea.replaceAll(",","")
                                    }


                                    cookie.set("jenisProperty",jenisProperty.categoryEn);
                                    cookie.set("lokasi",lokasi);
                                    cookie.set("dayaListrik",dl);
                                    cookie.set("tarifListrik",jenisProperty.tariffCode.toString());
                                    cookie.set("tagihanListrik",tagihanListrik.replaceAll(",",""));
                                    cookie.set("luasArea",la);
                                    cookie.set("lokasiPemasangan",lokasiPemasangan);
                                    cookie.set("estimatedpowerusage",estimatedPowerUsage.toString().replaceAll(",",""));
                                    cookie.set("youremail",yourEmail.toString());
                                    cookie.set("rataRataHarian",rataRataHarian.toString().replaceAll(",",""));

                                     if(lang === "en") {
                                         router.push(`/zero-capex-result`);
                                     } else {
                                         router.push(`/${lang}/zero-capex-result`);
                                     }
                                    // router.push(`/zero-capex-result`);
                                }} className="bg-[#f9c329] text-blue-950 font-bold w-full">{dictionary.next}</Button>
                            </div>
                        </div>
                        <h1 className="w-full hidden lg:block text-center lg:text-end p-[60px] lg:text-7xl font-bold text-[#f9c329] text-shadow-lg" dangerouslySetInnerHTML={{__html: dictionary.hitung_investasi}}></h1>
                    </div>
                </div>
            </div>
    )
}