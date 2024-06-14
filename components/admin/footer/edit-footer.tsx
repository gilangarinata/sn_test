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
import {FooterData} from "@/components/admin/footer/footer-table";
import {updateFooter} from "@/lib/actions/admin/footer.action";


interface Props {
    footerData?: FooterData;
    onNeedRefresh : () => void
}

export const FooterValidation = z.object({
    title: z
        .string(),
    address: z
        .string(),
    address2: z
        .string(),
    email: z
        .string(),
    phone: z
        .string(),
    whatsapp: z
        .string(),
});


function AddEditFooter({ footerData, onNeedRefresh}: Props) {

    const [saveLoading, setSaveLoading] = useState(false);


    const form = useForm<z.infer<typeof FooterValidation>>({
        resolver: zodResolver(FooterValidation),
        defaultValues: {
            title: footerData?.title ?? "",
            address: footerData?.address ?? "",
            address2: footerData?.address2 ?? "",
            email: footerData?.email ?? "",
            phone: footerData?.phone ?? "",
            whatsapp: footerData?.whatsapp ?? ""
        },
    });

    const onSubmit = async (values: z.infer<typeof FooterValidation>) => {
        try {
            setSaveLoading(true)

            await updateFooter({
                title: values.title,
                address: values.address,
                address2: values.address2,
                email: values.email,
                phone:values.phone,
                whatsapp: values.whatsapp
            })

            setSaveLoading(false)
            onNeedRefresh()
        } catch (e) {
            setSaveLoading(false)
            console.log(`Failed Update footer : ${e}`)
        }
    };

    return (
        <Form {...form}>
            <form
                className='flex flex-col justify-start gap-4 px-4'
                onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Title
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
                <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Address
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
                <FormField
                    control={form.control}
                    name='address2'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Address2
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
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col'>
                            <FormLabel className='text-base-semibold text-light-2'>
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
                <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Phone
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
                <FormField
                    control={form.control}
                    name='whatsapp'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Whatsapp
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
                <Button disabled={saveLoading} type='submit' className='bg-primary-500'>
                    {saveLoading ? <Spinner /> : "Save"}
                </Button>
            </form>
        </Form>
    )

}

export default AddEditFooter;