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
import { fetchCategories } from "@/lib/actions/admin/news-category.action";
import { formatDateString } from "@/lib/utils";
import Link from "next/link";
import { Category } from "@/components/admin/media/category/category-table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

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
    const [totalPages, setTotalPages] = useState(1);
    const [open, setOpen] = useState<{ banner: News | null; isOpen: boolean }>({ banner: null, isOpen: false });
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [createBannerOpen, setCreateBannerOpen] = useState<{ banner: News | null; isOpen: boolean }>({ banner: null, isOpen: false });
    
    // Filter states
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [categories, setCategories] = useState<Category[]>([]);
    
    const router = useRouter();

    const getCategories = async () => {
        const result = await fetchCategories('news');
        setCategories(result?.categories || []);
    };

    const getNews = async (pageNumber: number, searchTerm: string, status: string, category: string) => {
        try {
            setIsLoading(true);
            const result = await fetchAllNews(
                pageNumber, 
                10, 
                category === "all" ? undefined : category, 
                undefined, 
                undefined, 
                searchTerm, 
                status
            );
            if (result?.banners) {
                setNews(result.banners as News[]);
                setTotalPages(result.totalPages || 1);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error("Failed to fetch news", error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setPage(1);
            getNews(1, search, statusFilter, categoryFilter);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search, statusFilter, categoryFilter]);

    useEffect(() => {
        if (page > 1) {
            getNews(page, search, statusFilter, categoryFilter);
        } else {
             getNews(1, search, statusFilter, categoryFilter);
        }
    }, [page]);

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
            setPage(1);
            getNews(1, search, statusFilter, categoryFilter);
        } catch (error) {
            setDeleteLoading(false);
            console.error("Error deleting news:", error);
        }
    };

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

            <div className="flex flex-col gap-4 mt-2 mx-8 mb-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Button
                        onClick={() => {
                            router.push("/admin-panel/media/news/add");
                        }}
                        variant="outline"
                        className="w-fit"
                    >
                        <PlusIcon className="w-4 h-4 mr-2" /> Add News
                    </Button>

                    <div className="flex flex-wrap items-center gap-2">
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search news..."
                                className="pl-8"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="Published">Published</SelectItem>
                                <SelectItem value="Draft">Draft</SelectItem>
                                <SelectItem value="Scheduled">Scheduled</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {categories.map((cat) => (
                                    <SelectItem key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="rounded-md border mx-8 mb-10 overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Created at</TableHead>
                                <TableHead>Publish At</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-center">Image</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="h-24 text-center">
                                        <div className="flex justify-center items-center gap-2">
                                            <Spinner /> <span>Loading news...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : news.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="h-24 text-center">
                                        No news found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                news.map((newsItem) => (
                                    <TableRow key={newsItem.id}>
                                        <TableCell className="font-mono text-xs text-muted-foreground truncate max-w-[100px]">
                                            {newsItem._id}
                                        </TableCell>
                                        <TableCell className="max-w-[200px] truncate font-medium" title={newsItem.title}>
                                            {newsItem.title}
                                        </TableCell>
                                        <TableCell>{formatDateString(newsItem.createdAt)}</TableCell>
                                        <TableCell>{newsItem.publishAt ? formatDateString(newsItem.publishAt) : '-'}</TableCell>
                                        <TableCell>{newsItem.category?.name}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                                                newsItem.status === 'Published' ? 'bg-green-100 text-green-800' :
                                                newsItem.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {newsItem.status || 'Draft'}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <img className="mx-auto rounded object-cover shadow-sm" width={40} height={40} src={newsItem.image} alt="" />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <Link href={`/admin-panel/media/news/${newsItem.id}`}>
                                                    <EditIcon width={16} className="text-gray-600 hover:text-primary transition-colors" />
                                                </Link>
                                                <Trash2Icon
                                                    onClick={() => setOpen({ banner: newsItem, isOpen: true })}
                                                    width={16}
                                                    className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                
                {/* Pagination Controls */}
                <div className="flex items-center justify-between px-4 py-4 border-t bg-muted/50">
                    <div className="text-sm text-muted-foreground">
                        Showing <span className="font-medium">{news.length}</span> news items
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page <= 1 || isLoading}
                            onClick={() => setPage(prev => prev - 1)}
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                        </Button>
                        <div className="text-sm font-medium">
                            Page {page} of {totalPages}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page >= totalPages || isLoading}
                            onClick={() => setPage(prev => prev + 1)}
                        >
                            Next <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsTable;
