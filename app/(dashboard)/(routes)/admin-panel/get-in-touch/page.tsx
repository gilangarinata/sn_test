import {fetchBanners} from "@/lib/actions/admin/banner.action";
import UniversalBanners from "@/components/admin/home/banners/universal-banners";
import MainBanner from "@/components/admin/home/banners/main-banner";
import ExperienceTable from "@/components/admin/home/experience/experience-table";
import AchievementTable from "@/components/admin/home/achievement/achievement-table";
import GetInTouchTable from "@/components/admin/get-in-touch/get-in-table";
import {updateLastVisitGetInTouch} from "@/lib/actions/admin/last-visit.action";


async function AchievementPage() {
    await updateLastVisitGetInTouch();
    return (
        <div className="flex flex-col">
            <GetInTouchTable />
        </div>
    )

}

export default AchievementPage;