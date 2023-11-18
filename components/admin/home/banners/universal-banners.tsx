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
import {Achievement} from "@/components/admin/home/achievement/achievement-table";
import axiosInstance from "@/lib/axios_config";

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

interface Props {
    bannersInit?: Banner[];
    isNext: boolean;
}

function UniversalBanners() {

    const [banners, setBanners] = useState<Banner[]>()

    async function getBanners() {
        const banners = (await fetchBanners())?.banners?.filter((element, index, array) => {
            return element.id !== "main-banner"
        });
        setBanners(banners);
    }

    useEffect(() => {
        getBanners()
    }, [])

    const [open, setOpen] = useState<{banner : Banner | null, isOpen : boolean}>({banner: null, isOpen:false});
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [createBannerOpen, setCreateBannerOpen] = useState<{banner : Banner | null, isOpen : boolean}>({banner: null, isOpen: false})

    const handleDelete = async (id: string, image:string, logo: string) => {
        try {
            //console.log("submitting")
            setDeleteLoading(true);
            const fileImage = image.substring(image.lastIndexOf('/') + 1)
            const fileLogo = logo.substring(logo.lastIndexOf('/') + 1)
            //console.log(fileLogo + "   " + fileImage);
            try {
                await axiosInstance.delete(`/api/delete/${fileLogo}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                await axiosInstance.delete(`/api/delete/${fileImage}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

            } catch (error) {
                // Handle any upload error
                console.error('File upload error:', error);
            }
            await deleteBanner({id: id});
            setDeleteLoading(false);
            setOpen({banner: null, isOpen: false})
            await getBanners()
        } catch (e) {
            setDeleteLoading(false);
            //console.log("eror delete " + e);
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
                                    handleDelete(open?.banner?.id ?? "", open?.banner?.image ?? "",open?.banner?.logo ?? "" );
                                }}>{deleteLoading ? <Spinner /> : `Delete item`}</Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog open={createBannerOpen.isOpen} onOpenChange={(isOpen) => setCreateBannerOpen({isOpen: isOpen, banner: null})}>
                    <Button onClick={(bt) => {
                        bt.preventDefault();
                        setCreateBannerOpen({banner: null, isOpen:true})
                    }} variant="outline" className="w-fit ml-8"><PlusIcon className="w-4 h-4"/> Add Universal Banner</Button>
                    <DialogContent className="w-8">
                        <DialogHeader>
                            <DialogTitle>Add new banner</DialogTitle>
                        </DialogHeader>
                        <DialogBody className="overflow-y-auto max-h-[420px]">
                            <AddEditBanner banner={createBannerOpen.banner == null ? undefined : createBannerOpen.banner} onNeedRefresh={() => {
                                setCreateBannerOpen({banner: null, isOpen:false})
                                getBanners();
                            }} />
                        </DialogBody>
                    </DialogContent>
                </Dialog>
                <div className="rounded-md border mt-2 mx-8 mb-10">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Link</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-center">Logo</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {banners?.map((banner) => (
                                <TableRow key={banner.id}>
                                    <TableCell className="font-medium">
                                        <Image width={100} height={100} src={banner.image}
                                                                              alt=""/></TableCell>
                                    <TableCell>{banner.url}</TableCell>
                                    <TableCell><h2 className="text-xl font-semibold" dangerouslySetInnerHTML={{
                                        __html: banner.description,
                                    }}/></TableCell>
                                    <TableCell>
                                        <Image className="mx-auto" width={60} height={60}
                                                      src={banner.logo} alt=""/>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-4">
                                            <Trash2Icon onClick={()=> setOpen({banner: banner, isOpen: true})} width={18} color="red" className="hover:cursor-pointer" />
                                            <EditIcon width={18} className="hover:cursor-pointer" onClick={(bt) => {
                                                bt.preventDefault();
                                                setCreateBannerOpen({banner: banner, isOpen: true})
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

export default UniversalBanners;