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
const Editor = dynamic(() => import("react-draft-wysiwyg")
        .then((module) => module.Editor),
    {
        ssr: false
    }
);

interface Props {
    achievement?: News;
    onNeedRefresh : () => void
}

function AddEditNews({ achievement, onNeedRefresh}: Props) {
    const descContent = convertFromValidHtmlStyle(achievement?.content ?? "")
    const descInitState = convertHTMLToEditorState(`<p>${descContent}</p>`)

    const [editorDescState, setEditorDescState] = useState(descInitState !== undefined ? descInitState : EditorState?.createEmpty() )
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(achievement?.category?.name ?? "")
    const [categories, setCategories] = React.useState<Category[]>()
    const {startUpload} = useUploadThing("media");
    const [saveLoading, setSaveLoading] = useState(false);

    const [logo, setLogo] = useState<File[]>([]);

    const form = useForm<z.infer<typeof NewsValidation>>({
        resolver: zodResolver(NewsValidation),
        defaultValues: {
            title: achievement?.title ?? "",
            image: achievement?.image ?? "",
            tags: achievement?.tags?.map(t => t.tag).join(",") ?? "",
            relatedNews: achievement?.relatedNews?.map(t => t._id).join(",") ?? "",
        },
    });

    async function getCategories() {
       const cat = await fetchCategories()
        setCategories(cat?.categories)
    }

    useEffect(() => {
        getCategories()
    },[])

    const onSubmit = async (values: z.infer<typeof NewsValidation>) => {
        try {
            setSaveLoading(true)

            const logoBlob = values.image;
            const hasLogoChanged = isBase64Image(logoBlob);
            if(hasLogoChanged) {
                const logoRes = await startUpload(logo);
                if (logoRes && logoRes[0].fileUrl) {
                    values.image = logoRes[0].fileUrl;
                }
            }

            const tags = values.tags.split(",")
            const related = values.relatedNews.split(",")


            let descTitle = draftToHtml(convertToRaw(editorDescState?.getCurrentContent()));
            descTitle = convertToValidHtmlStyle(descTitle)

            // const selectedCategoryId = categories?.filter((el) => el.name === value)[0].id;


            // console.log(`selected category id : ${value} ${selectedCategoryId} ${categories?.length}`)

            await updateNews({
                id: achievement?.id === undefined || achievement?.id === null ? "" : achievement?.id,
                title: values.title,
                content: descTitle,
                category: value ?? "",
                image:values.image,
                tags: tags,
                relatedNews: related
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
                    name='relatedNews'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Related News ID (Seperated by comma ,)
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
                    name='tags'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Tags (Seperated by comma ,)
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
                    name='image'
                    render={({field}) => (
                        <FormItem className='flex flex-col'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Image
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

export default AddEditNews;