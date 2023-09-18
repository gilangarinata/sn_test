import React from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import {Dialog} from "@/components/ui/dialog";
const DashboardLayout = ({
    children
} : {
    children : React.ReactNode
}) => {
    return (
        <Dialog>
        <div className="h-full relative">
            <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80]" >
                <Sidebar />
            </div>

            <main className="md:pl-72">
                <Navbar />
                {children}
            </main>
        </div>
        </Dialog>
    )
}

export default DashboardLayout;