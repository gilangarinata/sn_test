"use client";
import { motion } from "framer-motion"
import {
    BriefcaseIcon,
    ChevronLeftCircle,
    ChevronRightCircle, FileIcon, LocateIcon, PinIcon,
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
import React, {ChangeEvent, useEffect, useState} from "react";
import Link from "next/link";
import {Banner} from "@/components/admin/home/banners/edit-banner";
import {OurBusinessBanner} from "@/components/admin/our-business/banners/banners-table";
import {Input} from "@/components/ui/input";
import {cn, convertToValidHtmlStyle, isBase64Image, isBase64PdfDocDocx} from "@/lib/utils";
import {CareerMdl} from "@/components/admin/career/add_career/career-table";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {fetchDepartements} from "@/lib/actions/admin/departement.action";
import draftToHtml from "draftjs-to-html";
import {convertToRaw} from "draft-js";
import {updateCareer} from "@/lib/actions/admin/career.action";
import {updateCareerRegister} from "@/lib/actions/admin/career_register.action";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import Spinner from "@/components/spinner";
import axiosInstance from "@/lib/axios_config";

const CareerRegisterValidation = z.object({
    firstName: z
        .string()
        .nonempty(),
    lastName: z
        .string()
        .nonempty(),
    email: z
        .string()
        .email()
        .nonempty(),
    contactNumber: z.string().nonempty(),
    address: z.string().nonempty(),
    lastEducation: z.string().nonempty(),
    campus: z.string().nonempty(),
    studyMajor: z.string().nonempty(),
    schoolStartYear1: z.string().nonempty(),
    schoolStartYear2: z.string().nonempty(),
    schoolEndYear1: z.string().nonempty(),
    schoolEndYear2: z.string().nonempty(),
    previousCompany: z.string().nonempty(),
    previousDesignation: z.string().nonempty(),
    availabilityPeriod: z.string().nonempty(),
    urlSites: z.string().optional(),
    howDidYouKnow: z.string().optional(),
    resume: z.string().nonempty(),
    portfolio: z.string().nonempty(),
    ijazah: z.string().nonempty(),
    transkrip: z.string().nonempty(),
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

    const startUpload = async (logo: File[]) : Promise<{
        message: string;
        fileUrl: string;
    }[]> => {
        var file = logo[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axiosInstance.post<{
                message: string;
                fileUrl: string;
            }[]>('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error) {
            // Handle any upload error
            console.error('File upload error:', error);
            return [{ message: 'File upload failed', fileUrl: '' }];
        }
    }

    const [logo, setLogo] = useState<File[]>([]);
    const handleLogo = (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void
    ) => {
        e.preventDefault();

        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setLogo(Array.from(e.target.files));

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl);
            };

            fileReader.readAsDataURL(file);
        }
    };

    const [portfolio, setPortfolio] = useState<File[]>([]);
    const handlePortfolio = (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void
    ) => {
        e.preventDefault();

        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setPortfolio(Array.from(e.target.files));

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl);
            };

            fileReader.readAsDataURL(file);
        }
    };

    const [ijazah, setIjazah] = useState<File[]>([]);
    const handleIjazah = (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void
    ) => {
        e.preventDefault();

        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setIjazah(Array.from(e.target.files));

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl);
            };

            fileReader.readAsDataURL(file);
        }
    };


    const [transkrip, setTranskrip] = useState<File[]>([]);
    const handleTranskrip = (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void
    ) => {
        e.preventDefault();

        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setTranskrip(Array.from(e.target.files));

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl);
            };

            fileReader.readAsDataURL(file);
        }
    };
    const onSubmit = async (values: z.infer<typeof CareerRegisterValidation>) => {
        try {
            setSaveLoading(true)

            const logoBlob = values.resume;
            const hasLogoChanged = isBase64PdfDocDocx(logoBlob);
            if(hasLogoChanged) {
                const logoRes = await startUpload(logo);
                if (logoRes && logoRes[0].fileUrl) {
                    values.resume = logoRes[0].fileUrl;
                }
            }

            const PortfolioBlob = values.portfolio;
            const hasPortfolioChanged = isBase64PdfDocDocx(PortfolioBlob);
            if(hasPortfolioChanged) {
                const logoRes = await startUpload(portfolio);
                if (logoRes && logoRes[0].fileUrl) {
                    values.portfolio = logoRes[0].fileUrl;
                }
            }

            const IjazahBlob = values.ijazah;
            const hasIjazahChanged = isBase64PdfDocDocx(IjazahBlob);
            if(hasIjazahChanged) {
                const logoRes = await startUpload(ijazah);
                if (logoRes && logoRes[0].fileUrl) {
                    values.ijazah = logoRes[0].fileUrl;
                }
            }

            const transkripBlob = values.transkrip;
            const hasTranskripChanged = isBase64PdfDocDocx(transkripBlob);
            if(hasTranskripChanged) {
                const logoRes = await startUpload(transkrip);
                if (logoRes && logoRes[0].fileUrl) {
                    values.transkrip = logoRes[0].fileUrl;
                }
            }

            await updateCareerRegister({
                id: "",
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                contactNumber: values.contactNumber,
                address: values.address,
                lastEducation: values.lastEducation,
                campus: values.campus,
                studyMajor: values.studyMajor,
                schoolStartYear1: values.schoolStartYear1,
                schoolStartYear2: values.schoolStartYear2,
                schoolEndYear1: values.schoolEndYear1,
                schoolEndYear2: values.schoolEndYear2,
                previousCompany: values.previousCompany,
                previousDesignation: values.previousDesignation,
                availabilityPeriod: values.availabilityPeriod,
                urlSites: values.urlSites ?? "",
                howDidYouKnow: values.howDidYouKnow ?? "",
                resume: values.resume,
                portfolio: values.portfolio,
                ijazah: values.ijazah,
                transkrip: values.transkrip
            })

            setSaveLoading(false)
        } catch (e) {
            setSaveLoading(false)
            //console.log(`Failed Update Banner : ${e}`)
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="w-full flex flex-col gap-4 bg-[#15537A] items-center min-h-screen justify-center">
                    <h1 className="mt-10 text-3xl text-white font-bold">{career.title}</h1>
                    <div className="flex flex-col gap-4 w-3/4">
                        <div  className="w-full h-fit border-t-white rounded-lg grid gap-2 gap-y-6 grid-cols-1 lg:grid-cols-2">
                            <div className="flex flex-col text-[#15537A] gap-2">
                                <FormField
                                    control={form.control}
                                    name='firstName'
                                    render={({ field }) => (
                                        <FormItem className='flex w-full flex-col'>
                                            <FormLabel className='text-base-semibold text-white'>
                                                Nama Depan
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='text'
                                                    className='account-form_input no-focus'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col text-[#15537A] gap-2">
                                <FormField
                                    control={form.control}
                                    name='lastName'
                                    render={({ field }) => (
                                        <FormItem className='flex w-full flex-col'>
                                            <FormLabel className='text-base-semibold text-white'>
                                                Nama Belakang (Surname)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='text'
                                                    className='account-form_input no-focus'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div  className="w-full h-fit border-t-white rounded-lg grid gap-2 gap-y-6 grid-cols-1 lg:grid-cols-2">
                            <div className="flex flex-col text-[#15537A] gap-2">
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem className='flex w-full flex-col'>
                                            <FormLabel className='text-base-semibold text-white'>
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='text'
                                                    className='account-form_input no-focus'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col text-[#15537A] gap-2">
                                <FormField
                                    control={form.control}
                                    name='contactNumber'
                                    render={({ field }) => (
                                        <FormItem className='flex w-full flex-col'>
                                            <FormLabel className='text-base-semibold text-white'>
                                                Nomor Kontak
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='text'
                                                    className='account-form_input no-focus'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div  className="w-full h-fit border-t-white rounded-lg grid gap-2 gap-y-6 grid-cols-1 lg:grid-cols-2">
                            <div className="flex flex-col text-[#15537A] gap-2">
                                <FormField
                                    control={form.control}
                                    name='address'
                                    render={({ field }) => (
                                        <FormItem className='flex w-full flex-col'>
                                            <FormLabel className='text-base-semibold text-white'>
                                                Alamat Saya
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='text'
                                                    className='account-form_input no-focus'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col text-[#15537A] gap-2">
                                <FormField
                                    control={form.control}
                                    name='lastEducation'
                                    render={({ field }) => (
                                        <FormItem className='flex w-full flex-col'>
                                            <FormLabel className='text-base-semibold text-white'>
                                                Pendidikan Terakhir
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='text'
                                                    className='account-form_input no-focus'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div  className="w-full h-fit border-t-white rounded-lg grid gap-2 gap-y-6 grid-cols-1 lg:grid-cols-2">
                            <div className="flex flex-col text-[#15537A] gap-2">
                                <FormField
                                    control={form.control}
                                    name='campus'
                                    render={({ field }) => (
                                        <FormItem className='flex w-full flex-col'>
                                            <FormLabel className='text-base-semibold text-white'>
                                                Kampus
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='text'
                                                    className='account-form_input no-focus'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col text-[#15537A] gap-2">
                                <FormField
                                    control={form.control}
                                    name='studyMajor'
                                    render={({ field }) => (
                                        <FormItem className='flex w-full flex-col'>
                                            <FormLabel className='text-base-semibold text-white'>
                                                Jurusan Studi
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='text'
                                                    className='account-form_input no-focus'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div  className="w-full h-fit border-t-white rounded-lg grid gap-2 gap-y-6 grid-cols-1 lg:grid-cols-2">
                            <div className="flex flex-col text-[#15537A] gap-2">
                                <p className="text-white">Tahun Masuk Sekolah</p>
                                <div className="flex">
                                    <FormField
                                        control={form.control}
                                        name='schoolStartYear1'
                                        render={({ field }) => (
                                            <FormItem className='flex w-full flex-col'>
                                                <FormControl>
                                                    <Input
                                                        type='text'
                                                        className='account-form_input no-focus'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <p className="text-white mx-6">-</p>
                                    <FormField
                                        control={form.control}
                                        name='schoolStartYear2'
                                        render={({ field }) => (
                                            <FormItem className='flex w-full flex-col'>
                                                <FormControl>
                                                    <Input
                                                        type='text'
                                                        className='account-form_input no-focus'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col text-[#15537A] gap-2">
                                <p className="text-white">Tahun Kelulusan</p>
                                <div className="flex">
                                    <FormField
                                        control={form.control}
                                        name='schoolEndYear1'
                                        render={({ field }) => (
                                            <FormItem className='flex w-full flex-col'>
                                                <FormControl>
                                                    <Input
                                                        type='text'
                                                        className='account-form_input no-focus'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <p className="text-white mx-6">-</p>
                                    <FormField
                                        control={form.control}
                                        name='schoolEndYear2'
                                        render={({ field }) => (
                                            <FormItem className='flex w-full flex-col'>
                                                <FormControl>
                                                    <Input
                                                        type='text'
                                                        className='account-form_input no-focus'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div  className="w-full h-fit border-t-white rounded-lg grid gap-2 gap-y-6 grid-cols-1 lg:grid-cols-2">
                            <div className="flex flex-col text-[#15537A] gap-2">
                                <FormField
                                    control={form.control}
                                    name='previousCompany'
                                    render={({ field }) => (
                                        <FormItem className='flex w-full flex-col'>
                                            <FormLabel className='text-base-semibold text-white'>
                                                Previous / Current Company
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='text'
                                                    className='account-form_input no-focus'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col text-[#15537A] gap-2">
                                <FormField
                                    control={form.control}
                                    name='previousDesignation'
                                    render={({ field }) => (
                                        <FormItem className='flex w-full flex-col'>
                                            <FormLabel className='text-base-semibold text-white'>
                                                Previous / Current Designation
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='text'
                                                    className='account-form_input no-focus'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div  className="w-full h-fit border-t-white rounded-lg gap-2 gap-y-6">
                            <div className="flex flex-col text-[#15537A] gap-2">
                                <FormField
                                    control={form.control}
                                    name='availabilityPeriod'
                                    render={({ field }) => (
                                        <FormItem className='flex w-full flex-col'>
                                            <FormLabel className='text-base-semibold text-white'>
                                                Periode Ketersediaan (Hanya untuk program magang)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='text'
                                                    className='account-form_input no-focus'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div  className="w-full h-fit border-t-white rounded-lg gap-2 gap-y-6">
                            <div className="flex flex-col text-[#15537A] gap-2">
                                <FormField
                                    control={form.control}
                                    name='urlSites'
                                    render={({ field }) => (
                                        <FormItem className='flex w-full flex-col'>
                                            <FormLabel className='text-base-semibold text-white'>
                                                URL Sites (Optional)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='text'
                                                    className='account-form_input no-focus'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div  className="w-full h-fit border-t-white rounded-lg gap-2 gap-y-6">
                            <div className="flex flex-col text-[#15537A] gap-2">
                                <FormField
                                    control={form.control}
                                    name='howDidYouKnow'
                                    render={({ field }) => (
                                        <FormItem className='flex w-full flex-col'>
                                            <FormLabel className='text-base-semibold text-white'>
                                                How did you know about SESNAs Career opportunities? (Optional)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='text'
                                                    className='account-form_input no-focus'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name='resume'
                            render={({field}) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel className='text-base-semibold text-white'>
                                        Resume (Maksimal 2 MB) (.doc,.docx,.pdf)
                                    </FormLabel>
                                    <div className="flex items-center gap-4">
                                        <FormLabel className='account-form_image-label'>
                                            {field.value ? (
                                                <div className="flex flex-col items-center justify-center">
                                                    <FileIcon color="white" width={20} height={20} />
                                                    <p className="text-white mt-2">{field.name}</p>
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </FormLabel>
                                        <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                            <Input
                                                type='file'
                                                accept='.pdf, .doc, .docx'
                                                placeholder='Add logo image'
                                                className='account-form_image-input'
                                                onChange={(e) => handleLogo(e, field.onChange)}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='portfolio'
                            render={({field}) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel className='text-base-semibold text-white'>
                                        Portfolio (Maksimal 2 MB) (.doc,.docx,.pdf)
                                    </FormLabel>
                                    <div className="flex items-center gap-4">
                                        <FormLabel className='account-form_image-label'>
                                            {field.value ? (
                                                <div className="flex flex-col items-center justify-center">
                                                    <FileIcon color="white" width={20} height={20} />
                                                    <p className="text-white mt-2">{field.name}</p>
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </FormLabel>
                                        <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                            <Input
                                                type='file'
                                                accept='.pdf, .doc, .docx'
                                                placeholder='Add logo image'
                                                className='account-form_image-input'
                                                onChange={(e) => handlePortfolio(e, field.onChange)}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='ijazah'
                            render={({field}) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel className='text-base-semibold text-white'>
                                        Ijazah (Maksimal 2 MB) (.doc,.docx,.pdf)
                                    </FormLabel>
                                    <div className="flex items-center gap-4">
                                        <FormLabel className='account-form_image-label'>
                                            {field.value ? (
                                                <div className="flex flex-col items-center justify-center">
                                                    <FileIcon color="white" width={20} height={20} />
                                                    <p className="text-white mt-2">{field.name}</p>
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </FormLabel>
                                        <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                            <Input
                                                type='file'
                                                accept='.pdf, .doc, .docx'
                                                placeholder='Add logo image'
                                                className='account-form_image-input'
                                                onChange={(e) => handleIjazah(e, field.onChange)}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='transkrip'
                            render={({field}) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel className='text-base-semibold text-white'>
                                        Transkrip (Maksimal 2 MB) (.doc,.docx,.pdf)
                                    </FormLabel>
                                    <div className="flex items-center gap-4">
                                        <FormLabel className='account-form_image-label'>
                                            {field.value ? (
                                                <div className="flex flex-col items-center justify-center">
                                                    <FileIcon color="white" width={20} height={20} />
                                                    <p className="text-white mt-2">{field.name}</p>
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </FormLabel>
                                        <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                            <Input
                                                type='file'
                                                accept='.pdf, .doc, .docx'
                                                placeholder='Add logo image'
                                                className='account-form_image-input'
                                                onChange={(e) => handleTranskrip(e, field.onChange)}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4">
                            <Input type="checkbox" className="w-5 h-5"/>
                            <p className="text-white">Dengan melanjutkan, saya mengonfirmasi bahwa saya telah membaca secara seksama dan menyetujui Persyaratan Layanan dan Kebijakan Privasi.</p>
                        </div>
                        <Button disabled={saveLoading} type='submit' className="bg-[#FAC225] text-[#15537A] w-fit mb-20">{saveLoading ? <Spinner /> : "Selanjutnya"}</Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}