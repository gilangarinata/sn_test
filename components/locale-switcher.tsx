'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { i18n } from '@/i18n.config'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {GlobeIcon} from "lucide-react";

export default function LocaleSwitcher() {
    const pathName = usePathname()

    const redirectedPathName = (locale: string) => {
        if (!pathName) return '/'

        const pathnameIsMissingLocale = i18n.locales.every(
            locale => !pathName.startsWith(`/${locale}/`) && pathName !== `/${locale}`
        )

        if (pathnameIsMissingLocale) {
            if (locale === i18n.defaultLocale) return pathName
            return `/${locale}${pathName}`
        } else {
            if (locale === i18n.defaultLocale) {
                const segments = pathName.split('/')
                const isHome = segments.length === 2
                if (isHome) return '/'

                segments.splice(1, 1)
                return segments.join('/')
            }

            const segments = pathName.split('/')
            segments[1] = locale
            return segments.join('/')
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <GlobeIcon className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {i18n.locales.map((locale, index) => (
                    <DropdownMenuItem className="hover:cursor-pointer" key={locale}>
                        <Link href={redirectedPathName(locale)}>
                            <div className="flex gap-4">
                                <span className={i18n.flags[index]} />
                                {i18n.names[index]}
                            </div>
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )

    // return (
    //     <ul className='flex gap-x-3'>
    //         {i18n.locales.map(locale => {
    //             return (
    //                 <li key={locale}>
    //                     <Link
    //                         href={redirectedPathName(locale)}
    //                         className='rounded-md border bg-black px-3 py-2 text-white'
    //                     >
    //                         {locale}
    //                     </Link>
    //                 </li>
    //             )
    //         })}
    //     </ul>
    // )
}