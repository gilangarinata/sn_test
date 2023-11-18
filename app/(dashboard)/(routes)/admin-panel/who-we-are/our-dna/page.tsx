import {fetchBanners} from "@/lib/actions/admin/banner.action";
import UniversalBanners from "@/components/admin/home/banners/universal-banners";
import MainBanner from "@/components/admin/home/banners/main-banner";
import ExperienceTable from "@/components/admin/home/experience/experience-table";
import AchievementTable from "@/components/admin/home/achievement/achievement-table";
import CategoryTable from "@/components/admin/media/category/category-table";
import NewsTable from "@/components/admin/media/news/news-table";
import WhoWeAreBanner from "@/components/admin/who-we-are/banner/who-we-are-banner";
import SubsidiariesTable from "@/components/admin/who-we-are/subsidiaries/subsidiaries-table";
import OurDnaTable from "@/components/admin/who-we-are/our-dna/our-dna-table";


async function SubsidiariesPage() {
    if (typeof window === 'undefined') return <></>
    return (
        <div className="flex flex-col">
            <OurDnaTable />
        </div>
    )

}

export default SubsidiariesPage;