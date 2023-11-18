"use client"

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Check, ChevronsUpDown, PlusIcon} from "lucide-react";
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
import {
    cn,
    convertFromValidHtmlStyle,
    convertHTMLToEditorState,
    convertToValidHtmlStyle,
    isBase64Image
} from "@/lib/utils";
import {updateBanner} from "@/lib/actions/admin/banner.action";
import Spinner from "@/components/spinner";
import {ExperienceValidation} from "@/lib/validations/experience";
import {updateExperience} from "@/lib/actions/admin/experience.action";
import {AchievementValidation} from "@/lib/validations/achievement";
import {updateAchievement} from "@/lib/actions/admin/achievement.action";
import {News} from "@/components/admin/media/news/news-table";
import {NewsValidation} from "@/lib/validations/news";
import {updateNews} from "@/lib/actions/admin/news.action";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {fetchCategories} from "@/lib/actions/admin/news-category.action";
import {Category} from "@/components/admin/media/category/category-table";
import axiosInstance from "@/lib/axios_config";
import {Video} from "@/components/admin/media/video/video-table";
import {updateVideo} from "@/lib/actions/admin/video.action";
const Editor = dynamic(() => import("react-draft-wysiwyg")
        .then((module) => module.Editor),
    {
        ssr: false
    }
);

interface Props {
    achievement?: Video;
    onNeedRefresh : () => void
}

export const VideoValidation = z.object({
    title: z
        .string(),
    videoUrl: z.string(),
});


function AddEditVideo({ achievement, onNeedRefresh}: Props) {
    const descContent = convertFromValidHtmlStyle(achievement?.description ?? "")
    const descInitState = convertHTMLToEditorState(`<p>${descContent}</p>`)
    const [categories, setCategories] = React.useState<Category[]>()
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(achievement?.category?.name ?? "")

    const [editorDescState, setEditorDescState] = useState(descInitState !== undefined ? descInitState : EditorState?.createEmpty() )
    const [saveLoading, setSaveLoading] = useState(false);

    const form = useForm<z.infer<typeof VideoValidation>>({
        resolver: zodResolver(VideoValidation),
        defaultValues: {
            title: achievement?.title ?? "",
            videoUrl: achievement?.videoUrl ?? "",
        },
    });

    async function getCategories() {
        const cat = await fetchCategories("video")
        setCategories(cat?.categories)
    }

    useEffect(() => {
        getCategories()
    },[])


    const onSubmit = async (values: z.infer<typeof VideoValidation>) => {
        try {
            setSaveLoading(true)

            let descTitle = draftToHtml(convertToRaw(editorDescState?.getCurrentContent()));
            descTitle = convertToValidHtmlStyle(descTitle)

            // const selectedCategoryId = categories?.filter((el) => el.name === value)[0].id;


            // //console.log(`selected category id : ${value} ${selectedCategoryId} ${categories?.length}`)

            await updateVideo({
                id: achievement?.id === undefined || achievement?.id === null ? "" : achievement?.id,
                title: values.title,
                description: descTitle,
                videoUrl: values.videoUrl,
                category: value ?? "",
            })

            setSaveLoading(false)
            onNeedRefresh()
        } catch (e) {
            setSaveLoading(false)
            //console.log(`Failed Update Banner : ${e}`)
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
                <Popover open={open} onOpenChange={setOpen}>
                    <FormLabel className='text-base-semibold text-light-2'>
                        Category
                    </FormLabel>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                        >
                            {value
                                ? value
                                : "Select category..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                        <Command>
                            <CommandInput placeholder="Search framework..." />
                            <CommandEmpty>No category found.</CommandEmpty>
                            <CommandGroup>
                                {categories?.map((framework) => (
                                    <CommandItem
                                        key={framework.name}
                                        onSelect={(currentValue) => {
                                            setValue(framework.name)
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === framework.name ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {framework.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
                <div className="flex flex-col gap-2">
                    <p>Description</p>
                    <RichTextEditor
                        editorState={editorDescState}
                        onEditorChange={(state) => {
                            setEditorDescState(state);
                        }}
                        isFull={true}
                    />
                </div>
                <FormField
                    control={form.control}
                    name='videoUrl'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Video Url
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

export default AddEditVideo;