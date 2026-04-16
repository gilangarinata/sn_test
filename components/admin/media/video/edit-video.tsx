"use client"

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Check, ChevronsUpDown, PlusIcon} from "lucide-react";
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
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
    title: z.string(),
    videoUrl: z.string(),
    status: z.string().optional(),
    publishAt: z.union([z.string(), z.date(), z.undefined(), z.null()]).optional(),
});


function AddEditVideo({ achievement, onNeedRefresh}: Props) {
    const descContent = convertFromValidHtmlStyle(achievement?.description ?? "")
    const descInitState = convertHTMLToEditorState(`<p>${descContent}</p>`)
    const [categories, setCategories] = React.useState<Category[]>()
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(achievement?.category?.name ?? "")

    const [editorDescState, setEditorDescState] = useState(descInitState !== undefined ? descInitState : EditorState?.createEmpty() )
    const [saveLoading, setSaveLoading] = useState(false);
    const [activeId, setActiveId] = useState<string>(achievement?.id ?? "");
    const [lastSaved, setLastSaved] = useState<string | null>(null);

    const form = useForm<z.infer<typeof VideoValidation>>({
        resolver: zodResolver(VideoValidation),
        defaultValues: {
            title: achievement?.title ?? "",
            videoUrl: achievement?.videoUrl ?? "",
            status: achievement?.status ?? "Draft",
            publishAt: achievement?.publishAt ? new Date(achievement.publishAt).toISOString().slice(0, 16) : "",
        },
    });

    async function getCategories() {
        const cat = await fetchCategories("video")
        setCategories(cat?.categories)
    }

    useEffect(() => {
        getCategories()
    },[])


    const handleSave = async (values: z.infer<typeof VideoValidation>, isAutosave = false) => {
        try {
            if (!isAutosave) setSaveLoading(true)

            let descTitle = draftToHtml(convertToRaw(editorDescState?.getCurrentContent()));
            descTitle = convertToValidHtmlStyle(descTitle)

            const resultId = await updateVideo({
                id: activeId,
                title: values.title,
                description: descTitle,
                videoUrl: values.videoUrl,
                category: value ?? "",
                status: values.status,
                publishAt: values.status === 'Scheduled' && values.publishAt ? new Date(values.publishAt) : null,
            })

            if (resultId) {
                setActiveId(resultId);
                setLastSaved(new Date().toLocaleTimeString());
            }

            if (!isAutosave) {
                setSaveLoading(false)
                onNeedRefresh()
            }
        } catch (e) {
            setSaveLoading(false)
            console.log(`Failed Update Video : ${e}`)
        }
    };

    const onSubmit = async (values: z.infer<typeof VideoValidation>) => {
        await handleSave(values, false);
    };

    // Autosave logic
    useEffect(() => {
        if (form.watch("status") !== "Draft") return;

        const timer = setInterval(() => {
            if (form.formState.isDirty) {
                form.handleSubmit((values) => handleSave(values, true))();
            }
        }, 60000); // 1 minute

        return () => clearInterval(timer);
    }, [form, editorDescState, activeId, achievement]);



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
                    name="status"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel className="text-base-semibold text-light-2">Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Draft">Draft</SelectItem>
                                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                                    <SelectItem value="Published">Published</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {form.watch("status") === "Scheduled" && (
                    <FormField
                        control={form.control}
                        name="publishAt"
                        render={({ field }) => (
                            <FormItem className="flex w-full flex-col">
                                <FormLabel className="text-base-semibold text-light-2">Schedule Date & Time</FormLabel>
                                <FormControl>
                                    <Input type="datetime-local" className="account-form_input no-focus" {...field} value={field.value ? String(field.value) : ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                    <FormLabel className='text-base-semibold text-light-2'>
                        Category
                    </FormLabel>
                {categories?.map((framework) => (
                    <Button variant={value == framework.name ? "default" : "outline"} onClick={(b) => {
                        b.preventDefault()
                        setValue(framework.name)
                    }} key={framework.id}>{framework.name}</Button>
                ))}
                {/*<Popover open={open} onOpenChange={setOpen}>*/}
                {/*    <FormLabel className='text-base-semibold text-light-2'>*/}
                {/*        Category*/}
                {/*    </FormLabel>*/}
                {/*    <PopoverTrigger asChild>*/}
                {/*        <Button*/}
                {/*            variant="outline"*/}
                {/*            role="combobox"*/}
                {/*            aria-expanded={open}*/}
                {/*            className="w-full justify-between"*/}
                {/*        >*/}
                {/*            {value*/}
                {/*                ? value*/}
                {/*                : "Select category..."}*/}
                {/*            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />*/}
                {/*        </Button>*/}
                {/*    </PopoverTrigger>*/}
                {/*    <PopoverContent className="w-full p-0">*/}
                {/*        <Command>*/}
                {/*            <CommandInput placeholder="Search framework..." />*/}
                {/*            <CommandEmpty>No category found.</CommandEmpty>*/}
                {/*            <CommandGroup>*/}
                {/*                {categories?.map((framework) => (*/}
                {/*                    <CommandItem*/}
                {/*                        key={framework.name}*/}
                {/*                        onSelect={(currentValue) => {*/}
                {/*                            setValue(framework.name)*/}
                {/*                            setOpen(false)*/}
                {/*                        }}*/}
                {/*                    >*/}
                {/*                        <Check*/}
                {/*                            className={cn(*/}
                {/*                                "mr-2 h-4 w-4",*/}
                {/*                                value === framework.name ? "opacity-100" : "opacity-0"*/}
                {/*                            )}*/}
                {/*                        />*/}
                {/*                        {framework.name}*/}
                {/*                    </CommandItem>*/}
                {/*                ))}*/}
                {/*            </CommandGroup>*/}
                {/*        </Command>*/}
                {/*    </PopoverContent>*/}
                {/*</Popover>*/}
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
                <div className="flex items-center gap-4">
                    <Button disabled={saveLoading} type='submit' className='bg-primary-500'>
                        {saveLoading ? <Spinner /> : "Save"}
                    </Button>
                    {lastSaved && (
                        <p className="text-sm text-gray-400">Autosaved at {lastSaved}</p>
                    )}
                </div>
            </form>
        </Form>
    )

}

export default AddEditVideo;