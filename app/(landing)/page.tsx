import {LandingNavBar} from "@/components/landing-navbar";
import HomeBanner from "@/components/home/home-banner";
import SesnaGroup from "@/components/home/sesna-group";

const LandingPage = () => {
    return (
       <div className="h-full">
           <HomeBanner/>
           <SesnaGroup />
       </div>
    )
}

export default LandingPage;