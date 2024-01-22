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
    needEmail: boolean
};

export const pricingData: PricingCategory[] = [
    { category: "Rumah (900 VA)", categoryEn: "House (900 VA)", type: "R-1/TR", tariffCode: 1.352, needEmail: false },
    { category: "Rumah (1300 VA)", categoryEn: "House (1300 VA)", type: "R-1/TR", tariffCode: 1444.7, needEmail: false },
    { category: "Rumah (2200 VA)", categoryEn: "House (2200 VA)", type: "R-1/TR", tariffCode: 1444.7, needEmail: false },
    { category: "Rumah (3500 VA -5500 VA)",categoryEn: "House (3500 VA -5500 VA)", type: "R-2/TR", tariffCode: 1699.53, needEmail: false },
    { category: "Rumah (6600 VA Keatas)", categoryEn: "House (6600 VA Keatas)",type: "R-3/TR", tariffCode: 1699.53, needEmail: false },
    { category: "Komersial (6600 VA-200 kVA)",categoryEn: "Commercial (6600 VA-200 kVA)", type: "B-2/TR", tariffCode: 1444.70, needEmail: true },
    { category: "Komersial (200 kVA Ke atas)",categoryEn: "Commercial (200 kVA and above)", type: "B-3/TM", tariffCode: 1065, needEmail: true },
    { category: "Industri (200 kVA Ke atas)",categoryEn: "Industry (200 kVA and above)", type: "I-3/TM", tariffCode: 1065, needEmail: true },
    { category: "Industri (30.000 kVA ke atas)", categoryEn: "Industry (30.000 kVA and above)",type: "I-4/TT", tariffCode: 1025.88, needEmail: true },
    { category: "Tambang", type: "P-1/TR",categoryEn: "Mining", tariffCode: 5115, needEmail: true },
];

const divStyle = {
    backgroundSize: 'cover',
}
export default function HistungInvestasi({lang, dictionary} : {lang: Locale, dictionary: any}) {
    const router = useRouter();
    const [jenisProperty, setJenisProperty] = React.useState<PricingCategory>();
    const [dayaListrik, setDayaListrik] = React.useState('');
    const [rataRataHarian, setRataRataHarian] = React.useState('');
    // const [tarifListrik, setTarifListrik] = React.useState(1025.88);
    const [tagihanListrik, setTagihanListrik] = React.useState('');
    const [luasArea, setLuasArea] = React.useState('');
    const [yourEmail, setYourEmail] = React.useState('');
    const [lokasiPemasangan, setLokasiPemasangan] = React.useState('');

    const [estimatedPowerUsage, setEstimatedPowerUsage] = React.useState(0);

    const [error, setError] = React.useState('');

    //function to calculate estimated power usage
    const calculateEstimatedPowerUsage = () => {
        const result = (parseFloat(tagihanListrik) / (jenisProperty?.tariffCode ?? 0.0)) / 26.0 / parseFloat(rataRataHarian)
        setEstimatedPowerUsage(result)
    }

    React.useEffect(() => {
        calculateEstimatedPowerUsage()
    }, [tagihanListrik, jenisProperty, rataRataHarian])

    return (
            <div className="w-full flex flex-col items-center min-h-screen justify-center" style={{ ...divStyle, 'backgroundImage': `url("/images/banner_1.jpg")`}}>
                <div className="bg-white/70 lg:hidden w-full h-full">
                    <h1 className="w-full text-end p-[60px] text-3xl font-bold text-[#f9c329] text-shadow-lg">{dictionary.hitung_investasi}</h1>
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
                                    <Select onValueChange={(val) => {
                                        setJenisProperty(pricingData.find(item => item.categoryEn === val))
                                    }}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder={dictionary.jenis_properti} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {pricingData.map((item, index) => (
                                                    <SelectItem key={item.categoryEn} value={item.categoryEn}>{lang === "en" ? item.categoryEn : item.category}</SelectItem>
                                                ))}


                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <Input type="number" placeholder={dictionary.daya_listrik} onChange={(e) => {
                                        setDayaListrik(e.target.value)
                                    }} />
                                    <Input type="number" placeholder="Average Daily Operations" onChange={(e) => {
                                        setRataRataHarian(e.target.value)
                                    }} />
                                    <Input type="number" placeholder={dictionary.tagihan_listrik} onChange={(e) => {
                                        setTagihanListrik(e.target.value)
                                    }} />
                                    <Input type="number" placeholder={dictionary.luas_area} onChange={(e) => {
                                        setLuasArea(e.target.value)
                                    }} />
                                    <p>{dictionary.tarif_listrik}</p>
                                    <Input readOnly={true} type="text" value={jenisProperty ?  "Rp " +jenisProperty?.tariffCode : ""}  onChange={(e) => {
                                    }} />
                                    <p>{lang === "en" ? "Estimated Power Usage" : "Estimasi Daya Terpakai"}</p>
                                    <Input readOnly={true} type="text" value={estimatedPowerUsage ?  Math.ceil(estimatedPowerUsage) + " kW" : ""}  onChange={(e) => {
                                    }} />
                                    <p>{dictionary.lokasi_pemasangan}</p>
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
                                        setError(lang === "en" ? "Please fill property type" : "Mohon isi jenis property")
                                        return;
                                    }

                                    if (dayaListrik === "") {
                                        setError(lang === "en" ? "Please fill electricity power" : "Mohon isi daya listrik")
                                        return;
                                    }

                                    if (rataRataHarian === "") {
                                        setError(lang === "en" ? "Please fill daily average" : "Mohon isi rata-rata operasi harian")
                                        return;
                                    }

                                    // if (tarifListrik === "") {
                                    //     setError(lang === "en" ? "Please fill electricity tariff" :"Mohon isi tarif listrik")
                                    //     return;
                                    // }

                                    if (tagihanListrik === "") {
                                        setError(lang === "en" ? "Please fill electricity bill" :"Mohon isi tagihan listrik")
                                        return;
                                    }

                                    if (luasArea === "") {
                                        setError(lang === "en" ? "Please fill property area" :"Mohon isi luas area")
                                        return;
                                    }

                                    if (lokasiPemasangan === "") {
                                        setError(lang === "en" ? "Please fill installation location" :"Mohon pilih lokasi pemasangan")
                                        return;
                                    }

                                    if (jenisProperty.needEmail && yourEmail === "") {
                                        setError(lang === "en" ? "Please fill your email" :"Mohon isi email anda")
                                        return;
                                    }

                                    cookie.set("jenisProperty",jenisProperty.categoryEn);
                                    cookie.set("dayaListrik",dayaListrik);
                                    cookie.set("tarifListrik",jenisProperty.tariffCode.toString());
                                    cookie.set("tagihanListrik",tagihanListrik);
                                    cookie.set("luasArea",luasArea);
                                    cookie.set("lokasiPemasangan",lokasiPemasangan);
                                    cookie.set("estimatedpowerusage",estimatedPowerUsage.toString());
                                    cookie.set("youremail",yourEmail.toString());
                                    cookie.set("rataRataHarian",rataRataHarian.toString());


                                    router.push('/zero-capex-result');
                                }} className="bg-[#f9c329] text-blue-950 font-bold w-full">{dictionary.next}</Button>
                            </div>
                        </div>
                        <h1 className="w-full hidden lg:block text-center lg:text-end p-[60px] lg:text-7xl font-bold text-[#f9c329] text-shadow-lg" dangerouslySetInnerHTML={{__html: dictionary.hitung_investasi}}></h1>
                    </div>
                </div>
            </div>
    )
}