"use client"

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import {Input} from "@/components/ui/input";
import RichTextEditor from "@/components/rich-text-editor";
import Image from "next/image";
import React, {ChangeEvent, useEffect, useState} from "react";
import {EditorState} from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import * as z from "zod";
import {usePathname, useRouter} from "next/navigation";
import {useUploadThing} from "@/lib/uploadthing";
import {useForm} from "react-hook-form";
import {convertFromHTML, convertFromRaw, convertToRaw} from "draft-js";
import dynamic from "next/dynamic";
import {UploadButton, UploadDropzone} from "@/utils/uploadthing";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {BannerValidation} from "@/lib/validations/banner";
import {zodResolver} from "@hookform/resolvers/zod";
import {convertHTMLToEditorState, isBase64Image} from "@/lib/utils";
import {updateBanner} from "@/lib/actions/admin/banner.action";
import Spinner from "@/components/spinner";
import axiosInstance from "@/lib/axios_config";
const Editor = dynamic(() => import("react-draft-wysiwyg")
        .then((module) => module.Editor),
    {
        ssr: false
    }
);

export type Banner = {
    id: string,
    image: string,
    url: string,
    headingTitle: string,
    subHeading: string,
    description: string,
    isCustomBanner: boolean,
    logo: string
}

interface Props {
    banner?: Banner;
    onNeedRefresh : () => void
}

const content = {
    "entityMap": {},
    "blocks": [{
        "key": "637gr",
        "text": "Initialized from content state.",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
    }]
};

function AddEditBanner({banner, onNeedRefresh}: Props) {
    console.log(`state change gilang ${banner}`)
    const descContent = banner?.description
        ?.replaceAll('<b class=\'text-[#199FD6]\'>', "<strong>")
        .replaceAll('</b>', "</strong>")
    const initState = convertHTMLToEditorState(`<p>${descContent}</p>`)

    const [editorState, setEditorState] = useState(initState !== undefined ? initState : EditorState?.createEmpty() )
    const router = useRouter();
    const pathname = usePathname();
    const [saveLoading, setSaveLoading] = useState(false);
    const [selectedId, setSelectedId] = useState(-1)
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
    const [files, setFiles] = useState<File[]>([]);
    const [logo, setLogo] = useState<File[]>([]);

    const form = useForm<z.infer<typeof BannerValidation>>({
        resolver: zodResolver(BannerValidation),
        defaultValues: {
            url: banner?.url ? banner.url : "",
            image: banner?.image ? banner.image : "",
            logo: banner?.logo ? banner.logo : "",
        },
    });

    const onSubmit = async (values: z.infer<typeof BannerValidation>) => {
        try {
            setSaveLoading(true)
            console.log(`submitting`)
            const bannerBlob = values.image;
            const logoBlob = values.logo;

            const hasImageChanged = isBase64Image(bannerBlob);
            const hasLogoChanged = isBase64Image(logoBlob);
            if (hasImageChanged) {
                const imgRes = await startUpload(files);

                if (imgRes && imgRes[0].fileUrl) {
                    values.image = imgRes[0].fileUrl;
                }
            }

            if(hasLogoChanged) {
                const logoRes = await startUpload(logo);
                if (logoRes && logoRes[0].fileUrl) {
                    values.logo = logoRes[0].fileUrl;
                }
            }

            let headingTitle = draftToHtml(convertToRaw(editorState?.getCurrentContent()));


            headingTitle = headingTitle
                .replaceAll('<p>','')
                .replaceAll('</p>','')
                .replaceAll('<strong>', "<b class='text-[#199FD6]'>")
                .replaceAll('</strong>', "</b>")

            await updateBanner({
                id: banner?.id === undefined || banner?.id === null ? "" : banner?.id,
                image: values.image,
                headingTitle: headingTitle,
                subHeading: "",
                isCustomBanner: true,
                logo: values.logo,
                url: values.url,
                description: headingTitle
            })

            setSaveLoading(false)
            onNeedRefresh()
        } catch (e) {
            setSaveLoading(false)
            console.log(`Failed Update Banner : ${e}`)
        }
    };

    const handleImage = (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void
    ) => {
        e.preventDefault();

        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFiles(Array.from(e.target.files));

            if (!file.type.includes("image")) return;

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl);
            };

            fileReader.readAsDataURL(file);
        }
    };

    const handleLogo = (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void
    ) => {
        e.preventDefault();

        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setLogo(Array.from(e.target.files));

            if (!file.type.includes("image")) return;

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl);
            };

            fileReader.readAsDataURL(file);
        }
    };

    return (
        <Form {...form}>
            <form
                className='flex flex-col justify-start gap-4 px-4'
                onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name='url'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Url
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
                <div className="flex flex-col gap-2">
                    <p>Description</p>
                    <RichTextEditor
                        editorState={editorState}
                        onEditorChange={(state) => {
                            setEditorState(state);
                        }}
                        isFull={false}
                    />
                </div>
                <FormField
                    control={form.control}
                    name='image'
                    render={({field}) => (
                        <FormItem className='flex flex-col'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Banner
                            </FormLabel>
                            <div className="flex items-center">
                                <FormLabel className='account-form_image-label'>
                                    {field.value ? (
                                        <Image
                                            src={field.value}
                                            alt='profile_icon'
                                            width={96}
                                            height={96}
                                            priority
                                            className='object-contain mr-4'
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </FormLabel>
                                <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                    <Input
                                        type='file'
                                        accept='image/*'
                                        placeholder='Add logo image'
                                        className='account-form_image-input'
                                        onChange={(e) => handleImage(e, field.onChange)}
                                    />
                                </FormControl>
                            </div>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='logo'
                    render={({field}) => (
                        <FormItem className='flex flex-col'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Logo
                            </FormLabel>
                            <div className="flex items-center">
                                <FormLabel className='account-form_image-label'>
                                    {field.value ? (
                                        <Image
                                            src={field.value}
                                            alt='profile_icon'
                                            width={96}
                                            height={96}
                                            priority
                                            className='object-contain mr-4'
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </FormLabel>
                                <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                    <Input
                                        type='file'
                                        accept='image/*'
                                        placeholder='Add logo image'
                                        className='account-form_image-input'
                                        onChange={(e) => handleLogo(e, field.onChange)}
                                    />
                                </FormControl>
                            </div>
                        </FormItem>
                    )}
                />
                <Button disabled={saveLoading} type='submit' className='bg-primary-500'>
                    {saveLoading ? <Spinner /> : "Save"}
                </Button>
            </form>
        </Form>
    )
}

export default AddEditBanner;