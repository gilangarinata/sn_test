"use client"

import React, { useState, useEffect, useCallback } from "react";
import {useRouter} from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EditIcon, PlusIcon, Trash2Icon } from "lucide-react";
import Spinner from "@/components/spinner";
import axiosInstance from "@/lib/axios_config";
import { deleteNews, fetchAllNews } from "@/lib/actions/admin/news.action";
import { formatDateString } from "@/lib/utils";
import Link from "next/link";
import {Category} from "@/components/admin/media/category/category-table";
export type News = {
    _id: any,
    id: string,
    title: string,
    slug: string,
    content: string,
    image: string,
    status?: string,
    publishAt?: string,
    category: Category,
    createdAt: string,
    tags: [
        {
            id: string,
            tag: string
        }
    ],
    relatedNews: [
        {
            _id: string,
            id: string,
            title: string,
            content: string,
            image: string,
            slug: string
        }
    ]
}

const NewsTable = () => {
    const [news, setNews] = useState<News[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [open, setOpen] = useState<{ banner: News | null; isOpen: boolean }>({ banner: null, isOpen: false });
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [createBannerOpen, setCreateBannerOpen] = useState<{ banner: News | null; isOpen: boolean }>({ banner: null, isOpen: false });
    const router = useRouter();

    const getNews = async (pageNumber: number) => {
        try {
            setIsLoading(true);
            const result = await fetchAllNews(pageNumber, 5);
            if (result?.banners.length) {
                const newNews = result.banners as News[]
                setNews((prev) => [...prev, ...newNews]);
            }
            setHasMore(result?.banners.length === 5);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error("Failed to fetch news", error);
        }
    };

    useEffect(() => {
        getNews(page);
    }, [page]);

    const loadMore = () => {
        if (!isLoading && hasMore) {
            setPage((prev) => prev + 1);
        }
    };

    const handleDelete = async (id: string, logo: string) => {
        try {
            setDeleteLoading(true);
            const fileLogo = logo.substring(logo.lastIndexOf("/") + 1);
            try {
                await axiosInstance.delete(`/api/delete/${fileLogo}`, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } catch (error) {
                console.error("File upload error:", error);
            }
            await deleteNews({ id });
            setDeleteLoading(false);
            setOpen({ banner: null, isOpen: false });
            setNews([]);
            setPage(1);
        } catch (error) {
            setDeleteLoading(false);
            console.error("Error deleting news:", error);
        }
    };

    const handleScroll = useCallback(() => {
        const bottom =
            Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
        if (bottom && hasMore) {
            loadMore();
        }
    }, [hasMore, loadMore]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    return (
        <div className="flex flex-col">
            <Dialog open={open.isOpen} onOpenChange={(isOpen) => setOpen({ banner: null, isOpen })}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Delete Item</DialogTitle>
                        <DialogDescription>Are you sure want to delete this item?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setOpen({ banner: null, isOpen: false })}>
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => handleDelete(open?.banner?.id ?? "", open?.banner?.image ?? "")}
                            >
                                {deleteLoading ? <Spinner /> : `Delete Item`}
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog
                open={createBannerOpen.isOpen}
                onOpenChange={(isOpen) => setCreateBannerOpen({ isOpen, banner: null })}
            >
                <Button
                    onClick={() => {
                        router.push("/admin-panel/media/news/add");
                    }}
                    variant="outline"
                    className="w-fit ml-8"
                >
                    <PlusIcon className="w-4 h-4" /> Add News
                </Button>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add news</DialogTitle>
                    </DialogHeader>
              {/*      <DialogBody className="overflow-y-auto max-h-[420px]">*/}
              {/*          /!* <AddEditNews achievement={createBannerOpen.banner == null ? undefined : createBannerOpen.banner} onNeedRefresh={() => {*/}
              {/*  setCreateBannerOpen({ banner: null, isOpen: false });*/}
              {/*  getExperiences();*/}
              {/*}} /> *!/*/}
              {/*      </DialogBody>*/}
                </DialogContent>
            </Dialog>
            <div className="rounded-md border mt-2 mx-8 mb-10">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>News ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Created at</TableHead>
                            <TableHead>Publish At</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Tags</TableHead>
                            <TableHead className="text-center">Image</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {news.map((newsItem) => (
                            <TableRow key={newsItem.id}>
                                <TableCell>{newsItem._id}</TableCell>
                                <TableCell>{newsItem.title}</TableCell>
                                <TableCell>{newsItem.slug}</TableCell>
                                <TableCell>{formatDateString(newsItem.createdAt)}</TableCell>
                                <TableCell>{newsItem.publishAt ? formatDateString(newsItem.publishAt) : '-'}</TableCell>
                                <TableCell>{newsItem.category?.name}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        newsItem.status === 'Published' ? 'bg-green-100 text-green-800' :
                                        newsItem.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {newsItem.status || 'Draft'}
                                    </span>
                                    {newsItem.status === 'Scheduled' && newsItem.publishAt && (
                                        <div className="text-xs text-gray-500 mt-1 break-words w-24">
                                            {new Date(newsItem.publishAt).toLocaleString()}
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>{newsItem.tags?.map((t) => t.tag).join(",")}</TableCell>
                                <TableCell>
                                    <img className="mx-auto" width={60} height={60} src={newsItem.image} alt="" />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center gap-4">
                                        <Trash2Icon
                                            onClick={() => setOpen({ banner: newsItem, isOpen: true })}
                                            width={18}
                                            color="red"
                                            className="hover:cursor-pointer"
                                        />
                                        <Link href={`/admin-panel/media/news/${newsItem.id}`}>
                                            <EditIcon width={18} className="hover:cursor-pointer" />
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {isLoading && <Spinner />}
                {!hasMore && <p className="text-center my-4">No more news to load</p>}
            </div>
        </div>
    );
};

export default NewsTable;
