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
import AddEditWhoWeAreBanner from "@/components/admin/who-we-are/banner/edit-who-we-are-banner";
import {fetchWhoWeAreBanner} from "@/lib/actions/admin/who-we-are-banner.action";

export type WhoWeAreBannerContent = {
    id: string,
    image: string,
    url: string,
    bannerHeadingTitle: string,
    headingTitle: string,
    description: string
}

function WhoWeAreBanner() {

    const [banners, setBanners] = useState<WhoWeAreBannerContent>()

    async function getBanners() {
        const banners = await fetchWhoWeAreBanner();
        setBanners(banners?.banners);
    }

    useEffect(() => {
        getBanners()
    }, [])

    const [open, setOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [createBannerOpen, setCreateBannerOpen] = useState<{ banner: WhoWeAreBannerContent | null, isOpen: boolean }>({
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
                    <DialogBody className="overflow-y-auto max-h-[420px]">
                        <AddEditWhoWeAreBanner banner={banners}
                                       onNeedRefresh={() => {
                                           setCreateBannerOpen({banner: null, isOpen: false})
                                           getBanners();
                                       }}/>
                    </DialogBody>
                </DialogContent>
            </Dialog>
            <div className="flex flex-col mx-8 mb-8 gap-4">
                <h2 className="font-bold">Who We Are Banner</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Banner Heading Title</Label>
                        <div className="rounded-lg border p-2">
                            <p dangerouslySetInnerHTML={{__html: banners?.bannerHeadingTitle ?? ""}} />
                        </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Who We Are Title</Label>
                        <div className="rounded-lg border p-2">
                            <p dangerouslySetInnerHTML={{__html: banners?.headingTitle ?? ""}} />
                        </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Description</Label>
                        <div className="rounded-lg border p-2 max-h-20 overflow-y-scroll">
                            <p dangerouslySetInnerHTML={{__html: banners?.description ?? ""}} />
                        </div>
                    </div>
                    {/*<div className="grid w-full items-center gap-1.5">*/}
                    {/*    <Label htmlFor="email">Link</Label>*/}
                    {/*    <div className="rounded-lg border p-2">*/}
                    {/*        <p dangerouslySetInnerHTML={{__html: banners?.url ?? ""}} />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div></div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Image</Label>
                        <div className="rounded-lg border p-2">
                            <Image src={banners?.image ?? "/"} alt="" width={100} height={50} />
                        </div>
                    </div>
                    <div></div>
                    <div className="grid items-end gap-1.5 w-fit">
                        <Button onClick={(bt) => {
                            bt.preventDefault();
                            setCreateBannerOpen({banner: null, isOpen: true})
                        }} variant="outline"><EditIcon width={15}/>&nbsp;Edit Content</Button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default WhoWeAreBanner;