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
import {convertHTMLToEditorState, convertToValidHtmlStyle, isBase64Image} from "@/lib/utils";
import {updateBanner} from "@/lib/actions/admin/banner.action";
import Spinner from "@/components/spinner";
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

function AddEditMainBanner({banner, onNeedRefresh}: Props) {
    const descContent = banner?.description
        ?.replaceAll('<b class=\'text-[#199FD6]\'>', "<strong>")
        .replaceAll('</b>', "</strong>")
    const descInitState = convertHTMLToEditorState(`<p>${descContent}</p>`)
    const [descEditorState, setDescEditorState] = useState(descInitState !== undefined ? descInitState : EditorState?.createEmpty() )

    const headingContent = banner?.headingTitle
        ?.replaceAll('<b class=\'text-[#199FD6]\'>', "<strong>")
        .replaceAll('</b>', "</strong>")
    const headingInitState = convertHTMLToEditorState(`<p>${headingContent}</p>`)
    const [headingEditorState, setHeadingEditorState] = useState(headingInitState !== undefined ? headingInitState : EditorState?.createEmpty() )

    const subheadingContent = banner?.subHeading
        ?.replaceAll('<b class=\'text-[#199FD6]\'>', "<strong>")
        .replaceAll('</b>', "</strong>")
    const subheadingInitState = convertHTMLToEditorState(`<p>${subheadingContent}</p>`)
    const [subheadingEditorState, setSubHeadingEditorState] = useState(subheadingInitState !== undefined ? subheadingInitState : EditorState?.createEmpty() )

    const [saveLoading, setSaveLoading] = useState(false);

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

            let headingTitle = draftToHtml(convertToRaw(headingEditorState?.getCurrentContent()));
            headingTitle = convertToValidHtmlStyle(headingTitle)

            let subheadingTitle = draftToHtml(convertToRaw(subheadingEditorState?.getCurrentContent()));
            subheadingTitle = convertToValidHtmlStyle(subheadingTitle)

            let descTitle = draftToHtml(convertToRaw(descEditorState?.getCurrentContent()));
            descTitle = convertToValidHtmlStyle(descTitle)

            await updateBanner({
                id: "main-banner",
                image: values.image,
                headingTitle: headingTitle,
                subHeading: subheadingTitle,
                isCustomBanner: true,
                logo: values.logo,
                url: values.url,
                description: descTitle
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
                    <p>Heading</p>
                    <RichTextEditor
                        editorState={headingEditorState}
                        onEditorChange={(state) => {
                            setHeadingEditorState(state);
                        }}
                        isFull={false}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Subheading</p>
                    <RichTextEditor
                        editorState={subheadingEditorState}
                        onEditorChange={(state) => {
                            setSubHeadingEditorState(state);
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

                <Button disabled={saveLoading} type='submit' className='bg-primary-500'>
                    {saveLoading ? <Spinner /> : "Save"}
                </Button>
            </form>
        </Form>
    )
}

export default AddEditMainBanner;