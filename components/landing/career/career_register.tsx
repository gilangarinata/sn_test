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
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {Banner} from "@/components/admin/home/banners/edit-banner";
import {OurBusinessBanner} from "@/components/admin/our-business/banners/banners-table";
import {Input} from "@/components/ui/input";
import {cn, convertToValidHtmlStyle} from "@/lib/utils";
import {CareerMdl} from "@/components/admin/career/add_career/career-table";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {fetchDepartements} from "@/lib/actions/admin/departement.action";
import draftToHtml from "draftjs-to-html";
import {convertToRaw} from "draft-js";
import {updateCareer} from "@/lib/actions/admin/career.action";

const CareerRegisterValidation = z.object({
    firstName: z
        .string(),
    lastName: z
        .string(),
    email: z
        .string()
        .email(),
    contactNumber: z.string(),
    address: z.string(),
    lastEducation: z.string(),
    campus: z.string(),
    studyMajor: z.string(),
    schoolStartYear1: z.string(),
    schoolStartYear2: z.string(),
    schoolEndYear1: z.string(),
    schoolEndYear2: z.string(),
    previousCompany: z.string(),
    previousDesignation: z.string(),
    availabilityPeriod: z.string(),
    urlSites: z.string().optional(),
    howDidYouKnow: z.string().optional(),
    resume: z.string(),
    portfolio: z.string(),
    ijazah: z.string(),
    transkrip: z.string(),
});

export default function CareerRegister({career} : {career: CareerMdl}) {
    const [saveLoading, setSaveLoading] = useState(false);
    const form = useForm<z.infer<typeof CareerRegisterValidation>>({
        resolver: zodResolver(CareerRegisterValidation),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            contactNumber: "",
            address: "",
            lastEducation: "",
            campus: "",
            studyMajor: "",
            schoolStartYear1: "",
            schoolStartYear2: "",
            schoolEndYear1: "",
            schoolEndYear2: "",
            previousCompany: "",
            previousDesignation: "",
            availabilityPeriod: "",
            urlSites: "",
            howDidYouKnow: "",
            resume: "",
            portfolio: "",
            ijazah: "",
            transkrip: "",
        },
    });

    // const onSubmit = async (values: z.infer<typeof CareerRegisterValidation>) => {
    //     try {
    //         setSaveLoading(true)
    //
    //         await updateCareer({
    //             id: achievement?.id === undefined || achievement?.id === null ? "" : achievement?.id,
    //             title: values.title,
    //             description: descTitle,
    //             location: values.location,
    //             type: values.type,
    //             departement: value,
    //         })
    //
    //         setSaveLoading(false)
    //     } catch (e) {
    //         setSaveLoading(false)
    //         console.log(`Failed Update Banner : ${e}`)
    //     }
    // };

    return (
        <div className="w-full flex flex-col gap-4 bg-[#15537A] items-center min-h-screen justify-center">
            <h1 className="mt-10 text-3xl text-white font-bold">{career.title}</h1>
            <div className="flex flex-col gap-4 w-3/4">
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
                        <p className="text-white">How did you know about SESNAs Career opportunities?</p>
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
            </div>
        </div>
    )
}