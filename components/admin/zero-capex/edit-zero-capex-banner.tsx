"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ZeroCapexBannerValidation } from "@/lib/validations/zero-capex-banner";
import { isBase64Image } from "@/lib/utils";
import Spinner from "@/components/spinner";
import axiosInstance from "@/lib/axios_config";
import { updateZeroCapexBanner } from "@/lib/actions/admin/zero-capex-banner.action";

interface Props {
    banner?: {
        id: string;
        image: string;
        backgroundImage: string;
        headingTitle: string;
        description: string;
    } | null;
    onNeedRefresh: () => void;
}

function AddEditZeroCapexBanner({ banner, onNeedRefresh }: Props) {
    const [saveLoading, setSaveLoading] = useState(false);
    const [fgFiles, setFgFiles] = useState<File[]>([]);
    const [bgFiles, setBgFiles] = useState<File[]>([]);

    const form = useForm<z.infer<typeof ZeroCapexBannerValidation>>({
        resolver: zodResolver(ZeroCapexBannerValidation),
        defaultValues: {
            image: banner?.image || "/images/zero-capex-banner-1.webp",
            backgroundImage: banner?.backgroundImage || "",
            headingTitle: banner?.headingTitle || "",
            description: banner?.description || "",
        },
    });

    const handleImage = (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void,
        isBg: boolean = false
    ) => {
        e.preventDefault();
        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (isBg) {
                setBgFiles(Array.from(e.target.files));
            } else {
                setFgFiles(Array.from(e.target.files));
            }

            if (!file.type.includes("image")) return;

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl);
            };

            fileReader.readAsDataURL(file);
        }
    };

    const startUpload = async (files: File[]): Promise<string> => {
        if (!files.length) return '';
        const formData = new FormData();
        formData.append('file', files[0]);

        try {
            const response = await axiosInstance.post<{
                message: string;
                fileUrl: string;
            }[]>('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data[0].fileUrl;
        } catch (error) {
            console.error('File upload error:', error);
            return '';
        }
    }

    const onSubmit = async (values: z.infer<typeof ZeroCapexBannerValidation>) => {
        try {
            setSaveLoading(true);

            let imageUrl = values.image || "";
            if (isBase64Image(imageUrl)) {
                const uploadedUrl = await startUpload(fgFiles);
                if (uploadedUrl) imageUrl = uploadedUrl;
            }

            let bgImageUrl = values.backgroundImage || "";
            if (isBase64Image(bgImageUrl)) {
                const uploadedUrl = await startUpload(bgFiles);
                if (uploadedUrl) bgImageUrl = uploadedUrl;
            }

            await updateZeroCapexBanner({
                id: banner?.id,
                image: imageUrl,
                backgroundImage: bgImageUrl,
                headingTitle: values.headingTitle || "",
                description: values.description || "",
            });

            setSaveLoading(false);
            onNeedRefresh();
        } catch (error) {
            setSaveLoading(false);
            console.error(`Failed to update banner: ${error}`);
        }
    };

    return (
        <Form {...form}>
            <form
                className='flex flex-col justify-start gap-6 pt-4'
                onSubmit={form.handleSubmit(onSubmit)}>
                
                <FormField
                    control={form.control}
                    name='headingTitle'
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-2'>
                            <FormLabel className='font-semibold text-sm'>
                                Heading Title
                            </FormLabel>
                            <FormControl>
                                <Input 
                                    {...field} 
                                    placeholder="Enter title (HTML tags allowed, e.g. <b>...</b>)"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-2'>
                            <FormLabel className='font-semibold text-sm'>
                                Description / Subtext
                            </FormLabel>
                            <FormControl>
                                <Textarea 
                                    {...field} 
                                    rows={4}
                                    placeholder="Enter description (HTML tags allowed)"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name='image'
                        render={({ field }) => (
                            <FormItem className='flex flex-col gap-2'>
                                <FormLabel className='font-semibold text-sm'>
                                    Visual Image (Foreground)
                                </FormLabel>
                                <div className="flex flex-col gap-3">
                                    {field.value && (
                                        <div className="relative w-full aspect-video border rounded overflow-hidden bg-muted/20">
                                            <Image
                                                src={field.value}
                                                alt='foreground'
                                                fill
                                                className='object-contain'
                                            />
                                        </div>
                                    )}
                                    <FormControl className='flex-1'>
                                        <Input
                                            type='file'
                                            accept='image/*'
                                            onChange={(e) => handleImage(e, field.onChange)}
                                        />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='backgroundImage'
                        render={({ field }) => (
                            <FormItem className='flex flex-col gap-2'>
                                <FormLabel className='font-semibold text-sm text-blue-600'>
                                    Background Image (Optional)
                                </FormLabel>
                                <div className="flex flex-col gap-3">
                                    {field.value ? (
                                        <div className="relative w-full aspect-video border rounded overflow-hidden">
                                            <Image
                                                src={field.value}
                                                alt='background'
                                                fill
                                                className='object-cover'
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full aspect-video border border-dashed rounded flex items-center justify-center bg-muted/10 text-xs text-muted-foreground">
                                            Uses default gradient fallback
                                        </div>
                                    )}
                                    <FormControl className='flex-1'>
                                        <Input
                                            type='file'
                                            accept='image/*'
                                            onChange={(e) => handleImage(e, field.onChange, true)}
                                        />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>

                <Button disabled={saveLoading} type='submit' className='w-full'>
                    {saveLoading ? <Spinner /> : banner ? "Update Banner" : "Create Banner"}
                </Button>
            </form>
        </Form>
    );
}

export default AddEditZeroCapexBanner;
