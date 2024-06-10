"use client"

import * as XLSX from 'xlsx';

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
import {deleteBanner, fetchBanners} from "@/lib/actions/admin/banner.action";
import Spinner from "@/components/spinner";
import {deleteExperience, fetchExperiences, fetchMainExperience} from "@/lib/actions/admin/experience.action";
import AddEditExperience from "@/components/admin/home/experience/edit-experience";
import {Label} from "@/components/ui/label";
import {deleteAchievement, fetchAchievement} from "@/lib/actions/admin/achievement.action";
import AddEditAchievement from "@/components/admin/home/achievement/edit-achievement";
import {Customer} from "@/components/admin/home/customers/customer-table";
import {deleteSubsidiary, fetchSubsidiaries} from "@/lib/actions/admin/subsidiaries.action";
import AddEditSubsidiary from "@/components/admin/who-we-are/subsidiaries/edit-subsidiary";
import {
    deleteOurBusinessBanner,
    fetchOurBusinessBanners
} from "@/lib/actions/admin/our-business/our-business-banner.action";
import AddEditOurBusinessBanner from "@/components/admin/our-business/banners/edit-banner";
import {deleteWhySolar, fetchWhySolar} from "@/lib/actions/admin/our-business/why-solar.action";
import AddEditWhySolar from "@/components/admin/our-business/why-solar/edit-why-solar";
import {deleteScopeWork, fetchScopeWork} from "@/lib/actions/admin/our-business/scope-work.action";
import AddEditScopeOfWork from "@/components/admin/our-business/scope-of-works/edit-scope-of-work";
import {deleteGetInTouch, fetchGetInTouch} from "@/lib/actions/admin/get-in-touch/get-in-touch.action";
import {fetchFooter} from "@/lib/actions/admin/footer.action";

export type FooterData = {
    id: string,
    title: string,
    address: string,
    address2: string,
    email: string,
    phone: boolean,
    whatsapp: string,
}
function FooterTable() {

    const [achievements, setAchievements] = useState<FooterData>()
    async function getAchievements() {
        const achievements = await fetchFooter()
        setAchievements(achievements as FooterData);
    }

    useEffect(() => {
        getAchievements()
    }, [])

    const [open, setOpen] = useState<{banner : FooterData | null, isOpen : boolean}>({banner: null, isOpen:false});
    const [createBannerOpen, setCreateBannerOpen] = useState<{banner : FooterData | null, isOpen : boolean}>({banner: null, isOpen: false})

    return (
            <div className="flex flex-col py-20">
                <Button className="w-[150px]">Edit Footer</Button>
                <Dialog open={createBannerOpen.isOpen} onOpenChange={(isOpen) => setCreateBannerOpen(prevState => {
                    return  {isOpen: isOpen, banner: null}
                })}>
                    {/*<Button onClick={(bt) => {*/}
                    {/*    bt.preventDefault();*/}
                    {/*    setCreateBannerOpen({banner: null, isOpen:true,})*/}
                    {/*}} variant="outline" className="w-fit ml-8"><PlusIcon className="w-4 h-4"/> Add Scope of Work</Button>*/}
                    <DialogContent className="w-8">
                        <DialogHeader>
                            <DialogTitle>Edit Footer</DialogTitle>
                        </DialogHeader>
                        <DialogBody className="overflow-y-auto max-h-[420px]">
                            {/*<AddEditScopeOfWork achievement={createBannerOpen.banner == null ? undefined : createBannerOpen.banner} onNeedRefresh={() => {*/}
                            {/*    setCreateBannerOpen({banner: null, isOpen:false})*/}
                            {/*    getAchievements();*/}
                            {/*}} />*/}
                        </DialogBody>
                    </DialogContent>
                </Dialog>
                <div className="rounded-md border mt-2 mx-8 mb-10">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Value</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow >
                                <TableCell>Title</TableCell>
                                <TableCell>{achievements?.title}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell>Address</TableCell>
                                <TableCell>{achievements?.address}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell>Address 2</TableCell>
                                <TableCell>{achievements?.address2}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell>Email</TableCell>
                                <TableCell>{achievements?.email}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell>Phone</TableCell>
                                <TableCell>{achievements?.phone}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell>Whatsapp</TableCell>
                                <TableCell>{achievements?.whatsapp}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
    )
}

export default FooterTable;