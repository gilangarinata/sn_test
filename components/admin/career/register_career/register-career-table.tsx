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
import {EditIcon, PlusIcon, Trash2Icon, TrashIcon, ViewIcon} from "lucide-react";
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
import {deleteNewsCategory, fetchCategories} from "@/lib/actions/admin/news-category.action";
import AddEditCategory from "@/components/admin/media/category/edit-category";
import {deleteDepartement, fetchDepartements} from "@/lib/actions/admin/departement.action";
import AddEditDepartement from "@/components/admin/career/departement/edit-departement";
import {deleteCareerRegister, fetchAllCareerRegister} from "@/lib/actions/admin/career_register.action";
import Link from "next/link";

export type RegisterCareer = {
    _id: string,
    id: string,
    lastName: string,
    firstName: string,
    email: string,
    contactNumber: string,
    address: string,
    lastEducation: string,
    campus: string,
    studyMajor: string,
    schoolStartYear1: string,
    schoolStartYear2: string,
    schoolEndYear1: string,
    schoolEndYear2: string,
    previousCompany: string,
    previousDesignation: string,
    availabilityPeriod: string,
    urlSites: string,
    howDidYouKnow: string,
    resume: string,
    portfolio: string,
    ijazah: string,
    transkrip: string,
    createdAt: Date,
}

function RegisterCareerTable() {

    const [achievements, setAchievements] = useState<RegisterCareer[]>()
    async function getAchievements() {
        const achievements = await fetchAllCareerRegister()
        setAchievements(achievements?.banners);
    }

    useEffect(() => {
        getAchievements()
    }, [])

    const [open, setOpen] = useState<{banner : RegisterCareer | null, isOpen : boolean}>({banner: null, isOpen:false});
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [createBannerOpen, setCreateBannerOpen] = useState<{banner : RegisterCareer | null, isOpen : boolean}>({banner: null, isOpen: false})

    const handleDelete = async (id: string) => {
        try {
            setDeleteLoading(true);
            await deleteCareerRegister({id: id});
            setDeleteLoading(false);
            setOpen({banner: null, isOpen: false})
            await getAchievements()
        } catch (e) {
            setDeleteLoading(false);
            console.log("eror delete " + e);
        }
    }

    return (
            <div className="flex flex-col">
                <Dialog open={open.isOpen} onOpenChange={(isOpen) => setOpen({banner: null, isOpen})}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Delete Item</DialogTitle>
                            <DialogDescription>
                                Are you sure want to delete this item?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={(bt) => {
                                    bt.preventDefault();
                                    setOpen({banner:null, isOpen:false})
                                }}>Cancel</Button>
                                <Button variant="destructive" onClick={(bt) => {
                                    bt.preventDefault();
                                    handleDelete(open?.banner?.id ?? "");
                                }}>{deleteLoading ? <Spinner /> : `Delete ${open?.banner?.firstName}`}</Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Dialog open={createBannerOpen.isOpen} onOpenChange={(isOpen) => setCreateBannerOpen(prevState => {
                    return  {isOpen: isOpen, banner: null}
                })}>
                    <DialogContent className="w-8">
                        <DialogHeader>
                            <DialogTitle>{"Add Departement"}</DialogTitle>
                        </DialogHeader>
                        <DialogBody className="overflow-y-auto max-h-[420px]">
                            {/*<AddEditDepartement achievement={createBannerOpen.banner == null ? undefined : createBannerOpen.banner} onNeedRefresh={() => {*/}
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
                                <TableHead>Email</TableHead>
                                <TableHead>Number</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {achievements?.map((achievement) => (
                                <TableRow key={achievement.id}>
                                    <TableCell>{achievement.firstName}</TableCell>
                                    <TableCell>{achievement.email}</TableCell>
                                    <TableCell>{achievement.contactNumber}</TableCell>
                                    <TableCell>{`${achievement.createdAt.toLocaleDateString()}  ${achievement.createdAt.toLocaleTimeString()}`}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-4">
                                            <Trash2Icon onClick={() => setOpen({banner: achievement, isOpen: true})} width={18} color="red" className="hover:cursor-pointer" />
                                            <Link href={`/admin-panel/career/register_career/${achievement._id}`}>
                                                <ViewIcon />
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
    )
}

export default RegisterCareerTable;