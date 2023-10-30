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
import {convertFromValidHtmlStyle, convertHTMLToEditorState, convertToValidHtmlStyle, isBase64Image} from "@/lib/utils";
import {updateBanner} from "@/lib/actions/admin/banner.action";
import Spinner from "@/components/spinner";
import {ExperienceValidation} from "@/lib/validations/experience";
import {updateExperience} from "@/lib/actions/admin/experience.action";
import {AchievementValidation} from "@/lib/validations/achievement";
import {updateAchievement} from "@/lib/actions/admin/achievement.action";
import axiosInstance from "@/lib/axios_config";
const Editor = dynamic(() => import("react-draft-wysiwyg")
        .then((module) => module.Editor),
    {
        ssr: false
    }
);

export type Achievement = {
    id: string,
    description: string,
    icon: string
}

interface Props {
    achievement?: Achievement;
    onNeedRefresh : () => void
}

function AddEditAchievement({ achievement, onNeedRefresh}: Props) {
    const descContent = convertFromValidHtmlStyle(achievement?.description ?? "")
    const descInitState = convertHTMLToEditorState(`<p>${descContent}</p>`)

    const [editorDescState, setEditorDescState] = useState(descInitState !== undefined ? descInitState : EditorState?.createEmpty() )

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
    const [saveLoading, setSaveLoading] = useState(false);

    const [logo, setLogo] = useState<File[]>([]);

    const form = useForm<z.infer<typeof AchievementValidation>>({
        resolver: zodResolver(AchievementValidation),
        defaultValues: {
            icon: achievement?.icon ?? "",
        },
    });

    const onSubmit = async (values: z.infer<typeof AchievementValidation>) => {
        try {
            setSaveLoading(true)

            const logoBlob = values.icon;
            const hasLogoChanged = isBase64Image(logoBlob);
            if(hasLogoChanged) {
                const logoRes = await startUpload(logo);
                if (logoRes && logoRes[0].fileUrl) {
                    values.icon = logoRes[0].fileUrl;
                }
            }

            let descTitle = draftToHtml(convertToRaw(editorDescState?.getCurrentContent()));
            descTitle = convertToValidHtmlStyle(descTitle)

            await updateAchievement({
                id: achievement?.id === undefined || achievement?.id === null ? "" : achievement?.id,
                icon: values.icon,
                description: descTitle
            })

            setSaveLoading(false)
            onNeedRefresh()
        } catch (e) {
            setSaveLoading(false)
            console.log(`Failed Update Banner : ${e}`)
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
                <div className="flex flex-col gap-2">
                    <p>Description</p>
                    <RichTextEditor
                        editorState={editorDescState}
                        onEditorChange={(state) => {
                            setEditorDescState(state);
                        }}
                        isFull={false}
                    />
                </div>

                <FormField
                    control={form.control}
                    name='icon'
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

export default AddEditAchievement;