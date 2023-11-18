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
import {Category} from "@/components/admin/media/category/category-table";
import {CategoryValidation} from "@/lib/validations/category";
import {updateNewsCategory} from "@/lib/actions/admin/news-category.action";
import {Departement} from "@/components/admin/career/departement/departement-table";
import {updateDepartement} from "@/lib/actions/admin/departement.action";
const Editor = dynamic(() => import("react-draft-wysiwyg")
        .then((module) => module.Editor),
    {
        ssr: false
    }
);


interface Props {
    achievement?: Departement;
    onNeedRefresh : () => void
}

const DepartementValidation = z.object({
    name: z
        .string(),
});

function AddEditDepartement({ achievement, onNeedRefresh}: Props) {
    const [saveLoading, setSaveLoading] = useState(false);

    const [logo, setLogo] = useState<File[]>([]);

    const form = useForm<z.infer<typeof DepartementValidation>>({
        resolver: zodResolver(DepartementValidation),
        defaultValues: {
            name: achievement?.name ?? "",
        },
    });

    const onSubmit = async (values: z.infer<typeof DepartementValidation>) => {
        try {
            setSaveLoading(true)

            // const logoBlob = values.banner;
            // const hasLogoChanged = isBase64Image(logoBlob);
            // if(hasLogoChanged) {
            //     const logoRes = await startUpload(logo);
            //     if (logoRes && logoRes[0].fileUrl) {
            //         values.banner = logoRes[0].fileUrl;
            //     }
            // }


            await updateDepartement({
                id: achievement?.id === undefined || achievement?.id === null ? "" : achievement?.id,
                name: values.name,
            })

            setSaveLoading(false)
            onNeedRefresh()
        } catch (e) {
            setSaveLoading(false)
            //console.log(`Failed Update Banner : ${e}`)
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
                    name='name'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Name
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

export default AddEditDepartement;