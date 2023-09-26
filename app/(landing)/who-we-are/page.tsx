"use client"
import React, {useRef} from "react";
import {fetchHome} from "@/lib/actions/landing/home.action";
import {Banner} from "@/components/landing/who-we-are/banner";
import {Earth} from "@/components/earth";
import {Subsidiaries} from "@/components/landing/who-we-are/subsidiaries";
import {VisionMission} from "@/components/landing/who-we-are/vision";

function WhoWeArePage() {
    const ref = useRef(null);

    return (
       <div ref={ref} className="relative">
           <div className="right-0 fixed py-20 mr-[-300px]">
               <Earth />
           </div>
           <Banner/>
           <Subsidiaries />
           <VisionMission />
       </div>
    )
}

export default WhoWeArePage;