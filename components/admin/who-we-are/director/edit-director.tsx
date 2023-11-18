"use client"

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {FileIcon, PlusIcon} from "lucide-react";
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
import {convertHTMLToEditorState, convertToValidHtmlStyle, isBase64Image} from "@/lib/utils";
import {updateBanner} from "@/lib/actions/admin/banner.action";
import Spinner from "@/components/spinner";
import WhoWeAreBanner, {WhoWeAreBannerContent} from "@/components/admin/who-we-are/banner/who-we-are-banner";
import {WhoWeAreValidation} from "@/lib/validations/who-we-are";
import {updateDirector, updateWhoWeAreBanner} from "@/lib/actions/admin/who-we-are-banner.action";
import {Director} from "@/components/admin/who-we-are/director/director-table";
import {DirectorValidation} from "@/lib/validations/director";
const Editor = dynamic(() => import("react-draft-wysiwyg")
        .then((module) => module.Editor),
    {
        ssr: false
    }
);


interface Props {
    banner?: Director;
    onNeedRefresh : () => void
}

function AddEditDirector({banner, onNeedRefresh}: Props) {
    const descContent = banner?.messageDirectorDescription
        ?.replaceAll('<b class=\'text-[#199FD6]\'>', "<strong>")
        .replaceAll('</b>', "</strong>")
    const descInitState = convertHTMLToEditorState(`<p>${descContent}</p>`)
    const [descEditorState, setDescEditorState] = useState(descInitState !== undefined ? descInitState : EditorState?.createEmpty() )

    const headingContent = banner?.messageDirectorTitle
        ?.replaceAll('<b class=\'text-[#199FD6]\'>', "<strong>")
        .replaceAll('</b>', "</strong>")
    const headingInitState = convertHTMLToEditorState(`<p>${headingContent}</p>`)
    const [headingEditorState, setHeadingEditorState] = useState(headingInitState !== undefined ? headingInitState : EditorState?.createEmpty() )

    const [saveLoading, setSaveLoading] = useState(false);

    const [files, setFiles] = useState<File[]>([]);
    const [logo, setLogo] = useState<File[]>([]);

    const form = useForm<z.infer<typeof DirectorValidation>>({
        resolver: zodResolver(DirectorValidation),
        defaultValues: {
            companyProfile: banner?.companyProfileUrl ? banner.companyProfileUrl : "",
        },
    });

    const onSubmit = async (values: z.infer<typeof DirectorValidation>) => {
        try {
            setSaveLoading(true)

            let headingTitle = draftToHtml(convertToRaw(headingEditorState?.getCurrentContent()));
            headingTitle = convertToValidHtmlStyle(headingTitle)

            let descTitle = draftToHtml(convertToRaw(descEditorState?.getCurrentContent()));
            descTitle = convertToValidHtmlStyle(descTitle)

            await updateDirector({
                messageDirectorDescription: descTitle,
                messageDirectorTitle: headingTitle,
                companyProfileUrl: values.companyProfile
            })
            setSaveLoading(false)
            onNeedRefresh()
        } catch (e) {
            setSaveLoading(false)
            //console.log("FAIL EDIT")
            //console.log(`Failed Update Banner : ${e}`)
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

            if (!file.type.includes("pdf")) return;

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
                <div className="flex flex-col gap-2">
                    <p>Title</p>
                    <RichTextEditor
                        editorState={headingEditorState}
                        onEditorChange={(state) => {
                            setHeadingEditorState(state);
                        }}
                        isFull={false}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Description</p>
                    <RichTextEditor
                        editorState={descEditorState}
                        onEditorChange={(state) => {
                            setDescEditorState(state);
                        }}
                        isFull={false}
                    />
                </div>

                <FormField
                    control={form.control}
                    name='companyProfile'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Company Profile
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

export default AddEditDirector;