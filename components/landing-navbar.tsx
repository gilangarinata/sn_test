"use client";

import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import LocaleSwitcher from "@/components/locale-switcher";
import CustomLink from "@/components/custom-link";
import { Locale } from "@/i18n.config";
import { createPortal } from "react-dom";

/* =======================
   Font
======================= */
const font = Montserrat({ weight: "600", subsets: ["latin"] });

/* =======================
   Low-level utilities
======================= */
function useOnClickOutside<T extends HTMLElement>(
    ref: React.RefObject<T>,
    handler: (e: MouseEvent | TouchEvent) => void
) {
    useEffect(() => {
        function listener(e: MouseEvent | TouchEvent) {
            if (!ref.current || ref.current.contains(e.target as Node)) return;
            handler(e);
        }
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}

function useLockBodyScroll(locked: boolean) {
    useEffect(() => {
        const original = document.body.style.overflow;
        if (locked) document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = original;
        };
    }, [locked]);
}

/* =======================
   Drawer (Sheet) – custom
======================= */
function Drawer({
                    open,
                    onOpenChange,
                    side = "right",
                    children,
                }: {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    side?: "left" | "right";
    children: React.ReactNode;
}) {
    const panelRef = useRef<HTMLDivElement>(null);
    const firstFocusableRef = useRef<HTMLButtonElement>(null);

    // lock scroll when open
    useLockBodyScroll(open);

    // focus trap (simple)
    useEffect(() => {
        if (!open) return;
        const prev = document.activeElement as HTMLElement | null;
        firstFocusableRef.current?.focus();
        return () => prev?.focus();
    }, [open]);

    // close on escape
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onOpenChange(false);
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onOpenChange]);

    const container = typeof window !== "undefined" ? document.body : null;

    const handleOutside = useCallback(() => onOpenChange(false), [onOpenChange]);
    useOnClickOutside(panelRef, () => {
        if (open) handleOutside();
    });

    if (!container) return null;

    return createPortal(
        <div
            aria-hidden={!open}
            className={cn(
                "fixed inset-0 z-[70] transition-opacity",
                open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            )}
        >
            {/* Backdrop */}
            <div
                className={cn(
                    "absolute inset-0 bg-black/30 transition-opacity",
                    open ? "opacity-100" : "opacity-0"
                )}
            />

            {/* Panel */}
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                className={cn(
                    "absolute top-0 h-full w-80 max-w-[90%] bg-white shadow-xl transition-transform",
                    side === "right" ? "right-0" : "left-0",
                    open
                        ? "translate-x-0"
                        : side === "right"
                            ? "translate-x-full"
                            : "-translate-x-full"
                )}
            >
                <div className="flex items-center justify-between px-4 py-4 border-b">
                    <span className="font-semibold">Menu</span>
                    <button
                        ref={firstFocusableRef}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md cursor-pointer"
                        aria-label="Close menu"
                        onClick={() => onOpenChange(false)}
                    >
                        <X />
                    </button>
                </div>
                <div className="px-4 py-6">{children}</div>
            </div>
        </div>,
        container
    );
}

/* =======================
   Dropdown – custom (desktop)
======================= */
function Dropdown({
                      label,
                      active,
                      children,
                  }: {
    label: React.ReactNode;
    active?: boolean;
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const btnRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(menuRef, () => setOpen(false));

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (!open) return;
            if (e.key === "Escape") setOpen(false);
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
                const first =
                    menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]');
                first?.focus();
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    return (
        <div className="relative">
            <button
                ref={btnRef}
                type="button"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-1 cursor-pointer"
            >
        <span className={cn("font-semibold", active ? "text-[#FAC225]" : "text-[#15527B]/80")}>
          {label}
        </span>
                <ChevronDown className="h-4 w-4" />
            </button>

            <div
                ref={menuRef}
                role="menu"
                className={cn(
                    "absolute right-0 mt-2 min-w-40 rounded-md border bg-white shadow-lg focus:outline-none",
                    "transition-transform origin-top",
                    open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
                )}
            >
                {children}
            </div>
        </div>
    );
}

function DropdownItem({
                          onSelect,
                          children,
                          href,
                      }: {
    onSelect?: () => void;
    children: React.ReactNode;
    href?: string;
}) {
    const router = useRouter();
    return (
        <button
            role="menuitem"
            className="w-full text-left px-3 py-2 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none cursor-pointer"
            onClick={() => {
                onSelect?.();
                if (href) router.push(href);
            }}
        >
            {children}
        </button>
    );
}

/* =======================
   Public API
======================= */

type RouteItem = {
    label: string;
    href: string;
    isDropdown?: boolean;
};

export function LandingNavBar({
                                  dictionary,
                                  lang,
                              }: {
    dictionary: any;
    lang: Locale;
}) {
    const [open, setOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        // Prevent ghost hitbox: pointer-events-none on <nav>, enabled on inner wrapper
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 h-16 pointer-events-none">
            <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6 pointer-events-auto">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center cursor-pointer"
                    aria-label="Go to home"
                >
                    <Image
                        width={200}
                        height={40}
                        src="/images/logo_sesna.png"
                        alt="logo"
                        priority
                        className="h-auto w-[200px]"
                    />
                </Link>

                {/* Mobile trigger */}
                <div className="flex items-center lg:hidden">
                    <button
                        type="button"
                        aria-label="Open menu"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md cursor-pointer"
                        onClick={() => setOpen(true)}
                    >
                        <Menu />
                    </button>
                </div>

                {/* Desktop menu */}
                <div className="hidden w-full items-center justify-end gap-x-8 lg:flex">
                    <NavContent
                        dictionary={dictionary}
                        lang={lang}
                        variant="desktop"
                        closeDrawer={() => setOpen(false)}
                    />
                </div>

                {/* Mobile drawer */}
                {isMounted && (
                    <Drawer open={open} onOpenChange={setOpen} side="right">
                        <NavContent
                            dictionary={dictionary}
                            lang={lang}
                            variant="mobile"
                            closeDrawer={() => setOpen(false)}
                        />
                    </Drawer>
                )}
            </div>
        </nav>
    );
}

export default function NavContent({
                                       dictionary,
                                       lang,
                                       variant,
                                       closeDrawer,
                                   }: {
    dictionary: any;
    lang: Locale;
    variant: "mobile" | "desktop";
    closeDrawer: () => void;
}) {
    const pathName = usePathname();
    const router = useRouter();

    const routes: RouteItem[] = useMemo(
        () => [
            { label: dictionary.home, href: "/" },
            { label: dictionary.who_we_are, href: "/who-we-are" },
            { label: dictionary.our_business, href: "/our-business" },
            { label: dictionary.zero_capex, href: "/zero-capex" },
            { label: dictionary.media, href: "/media", isDropdown: true },
            { label: dictionary.career, href: "/career" },
            { label: dictionary.get_in_touch, href: "/get-in-touch" },
            { label: dictionary.language, href: "/lang", isDropdown: true },
        ],
        [dictionary]
    );

    // Helper that ALWAYS closes drawer then navigates (used on mobile)
    const MobileNavItem: React.FC<{ href: string; children: React.ReactNode }> = ({
                                                                                      href,
                                                                                      children,
                                                                                  }) => (
        <button
            type="button"
            className="w-full text-left"
            onClick={() => {
                closeDrawer(); // close first
                router.push(href); // then navigate
            }}
        >
            <span className="font-semibold text-[#15527B]/80">{children}</span>
        </button>
    );

    // Expand/collapse state for the Media section on mobile
    const isMediaActive = !!pathName?.startsWith("/media");
    const [mediaOpen, setMediaOpen] = useState<boolean>(isMediaActive);

    useEffect(() => {
        // Keep it open when you're on /media/*
        setMediaOpen(!!pathName?.startsWith("/media"));
    }, [pathName]);

    // Wrapper adds vertical spacing ONLY on mobile
    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
        variant === "mobile" ? (
            <div className="flex flex-col gap-4">{children}</div>
        ) : (
            <>{children}</>
        );

    return (
        <Wrapper>
            {routes.map((route) => {
                // Language switcher special case
                if (route.href === "/lang") {
                    return variant === "mobile" ? (
                        // <MobileNavItem key={route.label} href="/lang">
                        //     {dictionary.language}
                        // </MobileNavItem>
                        <LocaleSwitcher key={route.label} />
                    ) : (
                        <LocaleSwitcher key={route.label} />
                    );
                }

                // Media dropdown
                if (route.isDropdown) {
                    if (variant === "mobile") {
                        return (
                            <div key={route.label} className="flex flex-col">
                                <button
                                    type="button"
                                    aria-expanded={mediaOpen}
                                    aria-controls="mobile-media-submenu"
                                    onClick={() => setMediaOpen((v) => !v)}
                                    className="flex items-center justify-between py-2"
                                >
                  <span className="font-semibold text-[#15527B]/80">
                    {route.label}
                  </span>
                                    <ChevronDown
                                        className={cn(
                                            "h-4 w-4 transition-transform",
                                            mediaOpen ? "rotate-180" : ""
                                        )}
                                    />
                                </button>

                                {/* Collapsible area */}
                                <div
                                    id="mobile-media-submenu"
                                    className={cn(
                                        "ml-3 overflow-hidden transition-[max-height,opacity] duration-300",
                                        mediaOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                    )}
                                >
                                    <div className="flex flex-col gap-2 py-1">
                                        <MobileNavItem href="/media/news">News</MobileNavItem>
                                        <MobileNavItem href="/media/video">Video</MobileNavItem>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    // Desktop dropdown
                    return (
                        <Dropdown
                            key={route.label}
                            label={route.label}
                            active={pathName?.startsWith("/media")}
                        >
                            <DropdownItem href="/media/news">News</DropdownItem>
                            <DropdownItem href="/media/video">Video</DropdownItem>
                        </Dropdown>
                    );
                }

                // Normal route
                return variant === "mobile" ? (
                    <MobileNavItem key={route.label} href={route.href}>
                        {route.label}
                    </MobileNavItem>
                ) : (
                    // Wrap to guarantee cursor shows even if CustomLink doesn't forward className
                    <div key={route.label} className="cursor-pointer">
                        <CustomLink
                            lang={lang}
                            href={route.href}
                            className="font-semibold hover:opacity-80 transition"
                        >
              <span
                  className={cn(
                      pathName === route.href ? "text-[#FAC225]" : "text-[#15527B]/80",
                      "cursor-pointer"
                  )}
              >
                {route.label}
              </span>
                        </CustomLink>
                    </div>
                );
            })}
        </Wrapper>
    );
}
