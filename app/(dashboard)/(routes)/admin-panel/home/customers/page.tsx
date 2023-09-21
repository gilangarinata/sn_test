import {fetchBanners} from "@/lib/actions/admin/banner.action";
import UniversalBanners from "@/components/admin/home/banners/universal-banners";
import MainBanner from "@/components/admin/home/banners/main-banner";
import ExperienceTable from "@/components/admin/home/experience/experience-table";
import CustomerTable from "@/components/admin/home/customers/customer-table";


async function CustomerPage() {
    return (
        <div className="flex flex-col">
            <CustomerTable />
        </div>
    )

}

export default CustomerPage;