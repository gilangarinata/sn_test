"use client";
import { motion } from "framer-motion"
import {
    BriefcaseIcon,
    ChevronLeftCircle,
    ChevronRightCircle, LocateIcon, PinIcon,
    SearchIcon,
    Share2Icon,
    ShareIcon,
    SignalIcon
} from "lucide-react";
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {updateBanner} from "@/lib/actions/admin/banner.action";
import React, {useEffect} from "react";
import Link from "next/link";
import {Banner} from "@/components/admin/home/banners/edit-banner";
import {OurBusinessBanner} from "@/components/admin/our-business/banners/banners-table";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";


const departenments = [
    {
        url: '/',
        title: "EPC",
        checked: false,
    },
    {
        url: '/',
        title: "Deal Maker",
        checked: false,
    },
    {
        url: '/',
        title: "Coorporate Management",
        checked: false,
    },
];

const positions = [
    {
        url: '/career/1',
        title: "Supply Chain Specialist",
        departement: "EPC",
        type: "Full Time",
        location: "Jakarta",
        id: "1"
    },
    {
        url: '/career/2',
        title: "PV Engineer",
        departement: "EPC",
        type: "Full Time",
        location: "Jakarta",
        id: "2"
    },
];

export default function CareerRegister() {
    return (
        <div className="w-full flex flex-col gap-4 bg-[#15537A] items-center min-h-screen justify-center">
            <h1 className="mt-10 text-3xl text-white font-bold">Supply Chain Specialist</h1>
            <motion.div whileInView={{scale: 1}} initial={{scale: 0}} className="flex flex-col gap-4 w-3/4">
                <div  className="w-full h-fit border-t-white rounded-lg grid gap-2 gap-y-6 grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col text-[#15537A] gap-2">
                        <p className="text-white">Nama Depan</p>
                        <Input type="text" onChange={(e) => {
                        }} />
                    </div>
                    <div className="flex flex-col text-[#15537A] gap-2">
                        <p className="text-white">Nama Belakang (Surname)</p>
                        <Input type="email" onChange={(e) => {
                        }} />
                    </div>
                </div>
                <div  className="w-full h-fit border-t-white rounded-lg grid gap-2 gap-y-6 grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col text-[#15537A] gap-2">
                        <p className="text-white">Email</p>
                        <Input type="text" onChange={(e) => {
                        }} />
                    </div>
                    <div className="flex flex-col text-[#15537A] gap-2">
                        <p className="text-white">Nomor Kontak</p>
                        <Input type="email" onChange={(e) => {
                        }} />
                    </div>
                </div>
                <div  className="w-full h-fit border-t-white rounded-lg grid gap-2 gap-y-6 grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col text-[#15537A] gap-2">
                        <p className="text-white">Alamat Saya</p>
                        <Input type="text" onChange={(e) => {
                        }} />
                    </div>
                    <div className="flex flex-col text-[#15537A] gap-2">
                        <p className="text-white">Pendidikan Terakhir</p>
                        <Input type="email" onChange={(e) => {
                        }} />
                    </div>
                </div>
                <div  className="w-full h-fit border-t-white rounded-lg grid gap-2 gap-y-6 grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col text-[#15537A] gap-2">
                        <p className="text-white">Kampus</p>
                        <Input type="text" onChange={(e) => {
                        }} />
                    </div>
                    <div className="flex flex-col text-[#15537A] gap-2">
                        <p className="text-white">Jurusan Studi</p>
                        <Input type="email" onChange={(e) => {
                        }} />
                    </div>
                </div>
                <div  className="w-full h-fit border-t-white rounded-lg grid gap-2 gap-y-6 grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col text-[#15537A] gap-2">
                        <p className="text-white">Tahun Masuk Sekolah</p>
                        <div className="flex">
                            <Input type="text" onChange={(e) => {
                            }} />
                            <p className="text-white mx-6">-</p>
                            <Input type="text" onChange={(e) => {
                            }} />
                        </div>
                    </div>
                    <div className="flex flex-col text-[#15537A] gap-2">
                        <p className="text-white">Tahun Kelulusan</p>
                        <div className="flex">
                            <Input type="text" onChange={(e) => {
                            }} />
                            <p className="text-white mx-6">-</p>
                            <Input type="text" onChange={(e) => {
                            }} />
                        </div>
                    </div>
                </div>
                <div  className="w-full h-fit border-t-white rounded-lg grid gap-2 gap-y-6 grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col text-[#15537A] gap-2">
                        <p className="text-white">Previous / Current Company</p>
                        <Input type="text" onChange={(e) => {
                        }} />
                    </div>
                    <div className="flex flex-col text-[#15537A] gap-2">
                        <p className="text-white">Pervious / Current Designation</p>
                        <Input type="email" onChange={(e) => {
                        }} />
                    </div>
                </div>
                <div  className="w-full h-fit border-t-white rounded-lg gap-2 gap-y-6">
                    <div className="flex flex-col text-[#15537A] gap-2">
                        <p className="text-white">Periode Ketersediaan (Hanya untuk program magang)</p>
                        <Input type="text" onChange={(e) => {
                        }} />
                    </div>
                </div>
                <div  className="w-full h-fit border-t-white rounded-lg gap-2 gap-y-6">
                    <div className="flex flex-col text-[#15537A] gap-2">
                        <p className="text-white">URL Sites (Optional)</p>
                        <Input type="text" onChange={(e) => {
                        }} />
                    </div>
                </div>
                <div  className="w-full h-fit border-t-white rounded-lg gap-2 gap-y-6">
                    <div className="flex flex-col text-[#15537A] gap-2">
                        <p className="text-white">How did you know about SESNA's Career opportunities?</p>
                        <Input type="text" onChange={(e) => {
                        }} />
                    </div>
                </div>
                <div className="flex bg-white py-4 px-6 justify-between text-[#15537A]">
                    <div className="flex flex-col">
                        <p>Resume (Maksimal 2 MB)</p>
                        <p>(.doc,.dox,.pdf)</p>
                    </div>
                    <div className="rounded-lg text-white outline outline-[#15537A] hover:cursor-pointer">
                        <p className="text-[#15537A] px-6 h-full flex items-center">Unggah</p>
                    </div>
                </div>
                <div className="flex bg-white py-4 px-6 justify-between text-[#15537A]">
                    <div className="flex flex-col">
                        <p>Portfolio (Maksimal 2 MB)</p>
                        <p>(.doc,.dox,.pdf)</p>
                    </div>
                    <div className="rounded-lg text-white outline outline-[#15537A] hover:cursor-pointer">
                        <p className="text-[#15537A] px-6 h-full flex items-center">Unggah</p>
                    </div>
                </div>
                <div className="flex bg-white py-4 px-6 justify-between text-[#15537A]">
                    <div className="flex flex-col">
                        <p>Ijzah (Maksimal 2 MB)</p>
                        <p>(.doc,.dox,.pdf)</p>
                    </div>
                    <div className="rounded-lg text-white outline outline-[#15537A] hover:cursor-pointer">
                        <p className="text-[#15537A] px-6 h-full flex items-center">Unggah</p>
                    </div>
                </div>
                <div className="flex bg-white py-4 px-6 justify-between text-[#15537A]">
                    <div className="flex flex-col">
                        <p>Transkrip (Maksimal 2 MB)</p>
                        <p>(.doc,.dox,.pdf)</p>
                    </div>
                    <div className="rounded-lg text-white outline outline-[#15537A] hover:cursor-pointer">
                        <p className="text-[#15537A] px-6 h-full flex items-center">Unggah</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Input type="checkbox" className="w-5 h-5"/>
                    <p className="text-white">Dengan melanjutkan, saya mengonfirmasi bahwa saya telah membaca secara seksama dan menyetujui Persyaratan Layanan dan Kebijakan Privasi.</p>
                </div>
                <Button className="bg-[#FAC225] text-[#15537A] w-fit mb-20">Selanjutnya</Button>
            </motion.div>
        </div>
    )
}