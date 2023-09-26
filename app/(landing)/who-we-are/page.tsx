
import React from "react";
import {fetchHome} from "@/lib/actions/landing/home.action";
import {Banner} from "@/components/landing/who-we-are/banner";
import {Earth} from "@/components/earth";

async function WhoWeArePage() {
    return (
       <div className="h-full relative">
           <div className="right-0 fixed py-10">
               <Earth />
           </div>
           <Banner/>
       </div>
    )
}

export default WhoWeArePage;