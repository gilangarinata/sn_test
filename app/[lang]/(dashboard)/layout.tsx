import React from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const DashboardLayout = async ({
    children,
    params: { lang }
} : {
    children : React.ReactNode,
    params: { lang: string }
}) => {
    const session = getSession();

    if (!session) {
        redirect(`/${lang}/login`);
    }

    return (
        <div className="h-full relative">
            <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80]" >
                <Sidebar session={session} />
            </div>

            <main className="md:pl-72">
                {/*<Navbar />*/}
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout;