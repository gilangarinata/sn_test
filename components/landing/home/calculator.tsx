"use client";

import {motion} from "framer-motion";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";


export default function Calculator() {
    const [electricityBills, setElectricityBills] = useState('');
    const [powerInstall, setPowerInstall] = useState('');
    const [txt3, setTxt3] = useState('');
    const [txt4, setTxt4] = useState('');
    const [txt5, setTxt5] = useState('');
    const [txt6, setTxt6] = useState('');

    useEffect(() => {
        const calculateValues = () => {
            const electricityBillsNumber = parseFloat(electricityBills);
            const powerInstallNumber = parseFloat(powerInstall);

            if (!isNaN(powerInstallNumber)) {
                const maximum = (powerInstallNumber / 330) * 330 / 1000;
                setTxt3(maximum.toFixed(2));

                const space = (powerInstallNumber / 330) * 330 / 1000 * 6.06;
                setTxt4(space.toFixed(2) + ' m²');

                const saving = (1304 * (powerInstallNumber / 330) * 330 / 1000 * 1467) / 12;
                setTxt5('Rp. ' + saving.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));

                const bill = electricityBillsNumber - saving;
                setTxt6('Rp. ' + bill.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }
        };

        calculateValues();
    }, [electricityBills, powerInstall]);
    const formatRupiah = (angka: any, prefix:any) => {
        var number_string = angka.replace(/[^,\d]/g, "").toString();
        var split = number_string.split(",");
        var sisa = split[0].length % 3;
        var rupiah = split[0].substr(0, sisa);
        var ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        if (ribuan) {
            var separator = sisa ? "." : "";
            rupiah += separator + ribuan.join(".");
        }

        rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
        return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
    };

    return (
        <section>
            <div className="w-full flex flex-col px-6 md:px-20 bg-[#FABD24] py-20 h-fit lg:h-screen justify-center">
                <h1 className="w-full text-[#15537A] text-center text-2xl font-bold mb-8">TRY OUR CALCULATOR</h1>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <motion.div whileInView={{scale: 1, transition: { duration: 1 }}} initial={{scale: 0}} className="w-1/2 flex flex-row items-center justify-center">
                        <Image width={250} height={250} src="/images/celengan.png" alt="celengan"/>
                    </motion.div>
                    <motion.div whileInView={{scale: 1, transition: { duration: 1 }}} initial={{scale: 0}} className="w-full font-semibold h-fit border-t-white rounded-lg mx-10 border-2 p-6 grid gap-2 gap-y-6 grid-cols-1 lg:grid-cols-2">
                        <div className="flex flex-col text-[#15537A] gap-2">
                            <p>Your monthly electricity bills (Rupiah)</p>
                            <Input type="number" placeholder="" onChange={(e) => {
                                setElectricityBills(e.target.value)
                            }} />
                        </div>
                        <div className="flex flex-col text-[#15537A] gap-2">
                            <p>Electric power installed (Watt)</p>
                            <Input type="number" placeholder="" onChange={(e) => {
                                setPowerInstall(e.target.value)
                            }} />
                        </div>
                        <div className="flex flex-col text-[#15537A] gap-2">
                            <p>Max solar panel capacity installed (kWp)</p>
                            <Input value={txt3} disabled={true} type="text" placeholder="" />
                        </div>
                        <div className="flex flex-col text-[#15537A] gap-2">
                            <p>Available space (in m2)</p>
                            <Input value={txt4} disabled={true} type="text" placeholder="" />
                        </div>
                        <div className="flex flex-col text-[#15537A] gap-2">
                            <p>Your saving electricity bills</p>
                            <Input value={txt5} disabled={true} type="text" placeholder="" />
                        </div>
                        <div className="flex flex-col text-[#15537A] gap-2">
                            <p>Monthly electricity bills with solar panel</p>
                            <Input value={txt6} disabled={true} type="text" placeholder="" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
