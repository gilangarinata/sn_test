import {fetchBanners} from "@/lib/actions/admin/banner.action";
import UniversalBanners from "@/components/admin/home/banners/universal-banners";
import MainBanner from "@/components/admin/home/banners/main-banner";
import ExperienceTable from "@/components/admin/home/experience/experience-table";


async function ExperiencePage() {
    if (typeof window === 'undefined') return <></>
    const banners = await fetchBanners();
    if (!banners) return null;

    return (
        <div className="flex flex-col">
            <ExperienceTable />
        </div>
    )

}

export default ExperiencePage;