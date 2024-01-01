import {fetchHome} from "@/lib/actions/landing/home.action";
import {Banner} from "@/components/landing/who-we-are/banner";
import {Earth} from "@/components/earth";
import {Subsidiaries} from "@/components/landing/who-we-are/subsidiaries";
import {VisionMission} from "@/components/landing/who-we-are/vision";
import {fetchWhoWeAre} from "@/lib/actions/landing/who-we-are.action";
import ZeroCapexBanner from "@/components/landing/zero-capex/zero-capex-banner";
import HistungInvestasi from "@/components/landing/zero-capex/hitung-investasi";

async function WhoWeArePage() {
    return (
       <div className="relative">
           <ZeroCapexBanner />
           <HistungInvestasi />
       </div>
    )
}

export default WhoWeArePage;