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
import mongoose from "mongoose";
import {deleteCareer, fetchAllCareer} from "@/lib/actions/admin/career.action";
import {Departement} from "@/components/admin/career/departement/departement-table";
import AddEditCareer from "@/components/admin/career/add_career/edit-careers";

export type CareerMdl = {
    _id: string,
    id: string,
    title: string,
    description: string,
    location: string,
    type: string,
    departement: Departement,
    createdAt: Date,
}

function CareerTable() {

    const [achievements, setAchievements] = useState<CareerMdl[]>()
    async function getAchievements() {
        const achievements = await fetchAllCareer()
        setAchievements(achievements?.banners as CareerMdl[]);
    }

    useEffect(() => {
        getAchievements()
    }, [])

    const [open, setOpen] = useState<{banner : CareerMdl | null, isOpen : boolean}>({banner: null, isOpen:false});
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [createBannerOpen, setCreateBannerOpen] = useState<{banner : CareerMdl | null, isOpen : boolean}>({banner: null, isOpen: false})

    const handleDelete = async (id: string) => {
        try {
            setDeleteLoading(true);
            // const fileLogo = logo.substring(logo.lastIndexOf('/') + 1)
            await deleteCareer({id: id});
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
                                }}>{deleteLoading ? <Spinner /> : `Delete ${open?.banner?.title}`}</Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Dialog open={createBannerOpen.isOpen} onOpenChange={(isOpen) => setCreateBannerOpen(prevState => {
                    return  {isOpen: isOpen, banner: null}
                })}>
                    <Button onClick={(bt) => {
                        bt.preventDefault();
                        setCreateBannerOpen({banner: null, isOpen:true,})
                    }} variant="outline" className="w-fit ml-8"><PlusIcon className="w-4 h-4"/> Add Career</Button>
                    <DialogContent className="w-8">
                        <DialogHeader>
                            <DialogTitle>{"Add Career"}</DialogTitle>
                        </DialogHeader>
                        <DialogBody className="overflow-y-auto max-h-[420px]">
                            <AddEditCareer achievement={createBannerOpen.banner == null ? undefined : createBannerOpen.banner} onNeedRefresh={() => {
                                setCreateBannerOpen({banner: null, isOpen:false})
                                getAchievements();
                            }} />
                        </DialogBody>
                    </DialogContent>
                </Dialog>
                <div className="rounded-md border mt-2 mx-8 mb-10">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Departement</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {achievements?.map((achievement) => (
                                <TableRow key={achievement.id}>
                                    <TableCell>{achievement.title}</TableCell>
                                    <TableCell>{achievement.type}</TableCell>
                                    <TableCell>{achievement.departement.name}</TableCell>
                                    <TableCell>{achievement.location}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-4">
                                            <Trash2Icon onClick={() => setOpen({banner: achievement, isOpen: true})} width={18} color="red" className="hover:cursor-pointer" />
                                            <EditIcon width={18} className="hover:cursor-pointer" onClick={(bt) => {
                                                bt.preventDefault();
                                                setCreateBannerOpen({banner: achievement, isOpen: true})
                                            }} />
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

export default CareerTable;