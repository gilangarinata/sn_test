"use client"

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {EditIcon, PlusIcon, Trash2Icon, TrashIcon} from "lucide-react";
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import {Input} from "@/components/ui/input";
import RichTextEditor from "@/components/rich-text-editor";
import Image from "next/image";
import React, {ChangeEvent, useEffect, useState} from "react";


import AddEditBanner from "@/components/admin/home/banners/edit-banner";
import {deleteBanner, fetchBanners, fetchMainBanners} from "@/lib/actions/admin/banner.action";
import Spinner from "@/components/spinner";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Label} from "@/components/ui/label";
import AddEditMainBanner from "@/components/admin/home/banners/edit-main-banner";

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

function MainBanner() {

    const [banners, setBanners] = useState<Banner>()

    async function getBanners() {
        const banners = await fetchMainBanners();
        setBanners(banners);
    }

    useEffect(() => {
        getBanners()
    }, [])

    const [open, setOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [createBannerOpen, setCreateBannerOpen] = useState<{ banner: Banner | null, isOpen: boolean }>({
        banner: null,
        isOpen: false
    })


    return (
        <div className="flex flex-col">
            <Dialog open={createBannerOpen.isOpen}
                    onOpenChange={(isOpen) => setCreateBannerOpen({isOpen: isOpen, banner: null})}>
                <DialogContent className="w-8">
                    <DialogHeader>
                        <DialogTitle>Edit Zero Capex banner</DialogTitle>
                    </DialogHeader>
                    <DialogBody className="overflow-y-auto h-[420px]">
                        <AddEditMainBanner banner={banners}
                                       onNeedRefresh={() => {
                                           setCreateBannerOpen({banner: null, isOpen: false})
                                           getBanners();
                                       }}/>
                    </DialogBody>
                </DialogContent>
            </Dialog>
            <div className="flex flex-col mx-8 mb-8 gap-4">
                <h2 className="font-bold">Zero Capex Banner</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Heading</Label>
                        <div className="rounded-lg border p-2">
                            <p dangerouslySetInnerHTML={{__html: banners?.headingTitle ?? ""}} />
                        </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Sub-Heading</Label>
                        <div className="rounded-lg border p-2">
                            <p dangerouslySetInnerHTML={{__html: banners?.subHeading ?? ""}} />
                        </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Description</Label>
                        <div className="rounded-lg border p-2 max-h-20 overflow-y-scroll">
                            <p dangerouslySetInnerHTML={{__html: banners?.description ?? ""}} />
                        </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Link</Label>
                        <div className="rounded-lg border p-2">
                            <p dangerouslySetInnerHTML={{__html: banners?.url ?? ""}} />
                        </div>
                    </div>
                    <div className="grid items-end gap-1.5 w-fit">
                        <Button onClick={(bt) => {
                            bt.preventDefault();
                            setCreateBannerOpen({banner: null, isOpen: true})
                        }} variant="outline"><EditIcon width={15}/>&nbsp;Edit Zero Capex Banner</Button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default MainBanner;