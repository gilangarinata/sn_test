"use client";

import "react-slideshow-image/dist/styles.css";
import Link from "next/link";
import React from "react";
import { formatDateString2 } from "@/lib/utils";
import { News } from "@/components/admin/media/news/news-table";
import { NewEditor } from "@/components/admin/media/news/new_editor";
import {
    FaFacebookF,
    FaWhatsapp,
    FaLinkedinIn,
    FaEnvelope,
} from "react-icons/fa";

/** Small helper to build a safe link to a news detail page */
function newsHref(n: Partial<News>) {
    // prefer slug if present; fall back to id
    const slug = (n as any)?.slug ?? (n as any)?.id ?? "";
    return `/media/news/detail/${slug}`;
}

function ShareButtons({ title }: { title: string }) {
    const url =
        typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
    const text = encodeURIComponent(title ?? "");

    const items = [
        {
            key: "fb",
            label: "Facebook",
            href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            Icon: FaFacebookF,
        },
        {
            key: "wa",
            label: "WhatsApp",
            href: `https://wa.me/?text=${text}%20${url}`,
            Icon: FaWhatsapp,
        },
        {
            key: "li",
            label: "LinkedIn",
            href: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`,
            Icon: FaLinkedinIn,
        },
        {
            key: "mail",
            label: "Email",
            href: `mailto:?subject=${text}&body=${url}`,
            Icon: FaEnvelope,
        },
    ];

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700">Bagikan</span>
            <div className="flex items-center gap-2">
                {items.map(({ key, label, href, Icon }) => (
                    <a
                        key={key}
                        aria-label={`Bagikan ke ${label}`}
                        href={href}
                        target={key === "mail" ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-green-600 text-green-600 hover:bg-green-50 transition"
                        title={label}
                    >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                ))}
            </div>
        </div>
    );
}

function RelatedArticles({ items }: { items: News[] }) {
    if (!items || items.length === 0) return null;

    return (
        <section className="mt-16">
            <h2 className="text-2xl font-semibold mb-6">Artikel lainnya</h2>
            <div className="grid gap-8 md:grid-cols-3">
                {items.map((it) => (
                    <Link key={(it as any).id ?? it.title} href={newsHref(it)} className="group block">
                        <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={it.image}
                                alt={it.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                        </div>
                        <p className="mt-4 text-gray-500">
                            {formatDateString2((it as any)?.createdAt)}
                        </p>
                        <h3 className="mt-2 text-lg font-medium leading-snug">
                            {it.title}
                        </h3>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default function NewsDetail({
                                       news,
                                       related = [],
                                   }: {
    news: News;
    related?: News[];
}) {
    const author = (news as any)?.authorName ?? (news as any)?.author ?? "—";
    const editor = (news as any)?.editorName ?? (news as any)?.editor ?? "—";

    return (
        <div className="w-full flex flex-col mx-auto max-w-5xl my-10">
            <div className="flex flex-col gap-16 md:flex-row md:gap-8 px-6">
                <div className="w-full flex flex-col gap-6">
                    {/* Title */}
                    <h1 className="text-3xl font-semibold">{news?.title}</h1>

                    {/* Author / Editor / Date */}
                    <p className="text-sm text-gray-600">
                        {author} <span className="text-gray-400">(Penulis)</span> | {editor}{" "}
                        <span className="text-gray-400">(Editor)</span> |{" "}
                        {formatDateString2((news as any)?.createdAt)}
                    </p>

                    {/* Share */}
                    <ShareButtons title={news?.title ?? ""} />

                    {/* Cover image */}
                    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={news?.image}
                            alt={news?.title ?? "News cover"}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Content */}
                    <NewEditor
                        onChange={() => {}}
                        initialContent={news?.content}
                        editable={false}
                    />

                    {/* Tags */}
                    {Array.isArray((news as any)?.tags) && (
                        <p className="text-justify">
                            <span className="font-medium">Tag:</span>{" "}
                            {(news as any)?.tags?.map((t: any) => t.tag).join(", ")}
                        </p>
                    )}

                    {/* Related */}
                    <RelatedArticles items={related.slice(0, 3)} />
                </div>
            </div>
        </div>
    );
}
