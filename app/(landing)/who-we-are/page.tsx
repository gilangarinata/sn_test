import {fetchHome} from "@/lib/actions/landing/home.action";
import {Banner} from "@/components/landing/who-we-are/banner";
import {Earth} from "@/components/earth";
import {Subsidiaries} from "@/components/landing/who-we-are/subsidiaries";
import {VisionMission} from "@/components/landing/who-we-are/vision";
import {fetchWhoWeAre} from "@/lib/actions/landing/who-we-are.action";

async function WhoWeArePage() {
    const whoWeAre = await fetchWhoWeAre()
    return (
       <div className="relative">
           <div className="right-0 fixed mr-[-300px] top-0 mt-[-50px]">
               <Earth />
           </div>
           <Banner banner={whoWeAre.whoWeAre}/>
           <Subsidiaries subsidiaries={whoWeAre.subsidiaries}/>
           <VisionMission ourDna={whoWeAre.ourDna} visionMission={whoWeAre.whoWeAre} director={whoWeAre.whoWeAre} />
       </div>
    )
}

export default WhoWeArePage;