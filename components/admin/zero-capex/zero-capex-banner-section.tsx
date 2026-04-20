"use client"

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { EditIcon, PlusIcon, Trash2Icon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Spinner from "@/components/spinner";
import { fetchZeroCapexBanners, deleteZeroCapexBanner } from "@/lib/actions/admin/zero-capex-banner.action";
import AddEditZeroCapexBanner from "./edit-zero-capex-banner";

function ZeroCapexBannerSection() {
    const [banners, setBanners] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editState, setEditState] = useState<{ isOpen: boolean; banner: any | null }>({
        isOpen: false,
        banner: null
    });
    const [deleteState, setDeleteState] = useState<{ isOpen: boolean; bannerId: string | null }>({
        isOpen: false,
        bannerId: null
    });
    const [isDeleting, setIsDeleting] = useState(false);

    async function getBanners() {
        setIsLoading(true);
        const data = await fetchZeroCapexBanners();
        setBanners(data?.banners || []);
        setIsLoading(false);
    }

    useEffect(() => {
        getBanners();
    }, []);

    const handleDelete = async () => {
        if (!deleteState.bannerId) return;
        setIsDeleting(true);
        try {
            await deleteZeroCapexBanner(deleteState.bannerId);
            setDeleteState({ isOpen: false, bannerId: null });
            getBanners();
        } catch (error) {
            console.error("Delete failed:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex flex-col mx-8 mb-8 gap-6 p-6 border rounded-xl bg-white shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-[#154B6F]">Zero Capex Banner Slider</h2>
                    <p className="text-sm text-muted-foreground mt-1">Manage multiple slides for the landing page banner.</p>
                </div>
                <Button 
                    onClick={() => setEditState({ isOpen: true, banner: null })} 
                    className="flex gap-2"
                >
                    <PlusIcon width={16} /> Add New Slide
                </Button>
            </div>

            <div className="rounded-md border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="w-[120px]">Foreground</TableHead>
                            <TableHead className="w-[120px]">Background</TableHead>
                            <TableHead>Heading & Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <Spinner /> <span>Loading banners...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : banners.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                    No banners found. Add a slide to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            banners.map((banner) => (
                                <TableRow key={banner.id}>
                                    <TableCell>
                                        <div className="relative w-20 h-12 rounded border overflow-hidden bg-muted/10">
                                            <Image 
                                                src={banner.image || "/images/zero-capex-banner-1.webp"} 
                                                alt="fg" 
                                                fill 
                                                className="object-contain"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {banner.backgroundImage ? (
                                            <div className="relative w-20 h-12 rounded border overflow-hidden bg-muted/10">
                                                <Image 
                                                    src={banner.backgroundImage} 
                                                    alt="bg" 
                                                    fill 
                                                    className="object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="text-[10px] text-muted-foreground italic">Gradient Fallback</div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="max-w-[400px]">
                                            <div 
                                                className="font-bold text-sm truncate text-[#154B6F]" 
                                                dangerouslySetInnerHTML={{ __html: banner.headingTitle || "Untitled" }} 
                                            />
                                            <div 
                                                className="text-xs text-muted-foreground truncate" 
                                                dangerouslySetInnerHTML={{ __html: banner.description || "No description" }} 
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button 
                                                variant="ghost" 
                                                size="icon"
                                                onClick={() => setEditState({ isOpen: true, banner })}
                                            >
                                                <EditIcon className="w-4 h-4 text-blue-600" />
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="icon"
                                                onClick={() => setDeleteState({ isOpen: true, bannerId: banner.id })}
                                            >
                                                <Trash2Icon className="w-4 h-4 text-red-600" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Edit/Add Dialog */}
            <Dialog 
                open={editState.isOpen} 
                onOpenChange={(open) => setEditState({ isOpen: open, banner: null })}
            >
                <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editState.banner ? "Edit Banner Slide" : "Add New Banner Slide"}</DialogTitle>
                    </DialogHeader>
                    <AddEditZeroCapexBanner 
                        banner={editState.banner} 
                        onNeedRefresh={() => {
                            setEditState({ isOpen: false, banner: null });
                            getBanners();
                        }} 
                    />
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <Dialog 
                open={deleteState.isOpen} 
                onOpenChange={(open) => setDeleteState({ isOpen: open, bannerId: null })}
            >
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>Delete Banner</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this banner slide? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button 
                            variant="outline" 
                            onClick={() => setDeleteState({ isOpen: false, bannerId: null })}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="destructive" 
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? <Spinner /> : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ZeroCapexBannerSection;
