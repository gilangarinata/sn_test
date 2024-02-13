import {fetchHome} from "@/lib/actions/landing/home.action";
import {Banner} from "@/components/landing/who-we-are/banner";
import {Earth} from "@/components/earth";
import {Subsidiaries} from "@/components/landing/who-we-are/subsidiaries";
import {VisionMission} from "@/components/landing/who-we-are/vision";
import {fetchWhoWeAre} from "@/lib/actions/landing/who-we-are.action";
import ZeroCapexBanner from "@/components/landing/zero-capex/zero-capex-banner";
import HistungInvestasi from "@/components/landing/zero-capex/hitung-investasi";
import ZeroCapexResult from "@/components/landing/zero-capex/result";
import ResultPlan from "@/components/landing/zero-capex/result-plan";
import ResultChart from "@/components/landing/zero-capex/result-chart";
import ZeroCapexResultPdf from "@/components/landing/zero-capex/result-pdf";

async function WhoWeArePage() {
    return (
       <div className="relative">
           <ZeroCapexResultPdf />
           {/*<ResultPlan />*/}
           {/*<ResultChart />*/}
       </div>
    )
}

export default WhoWeArePage;