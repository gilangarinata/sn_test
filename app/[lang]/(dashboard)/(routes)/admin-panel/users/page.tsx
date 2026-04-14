import { fetchUsers } from "@/lib/actions/admin/users.action";
import UsersClient from "./users-client";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function UsersPage() {
    const session = getSession();
    if (!session || session.role !== 'super_admin') {
        redirect("/admin-panel");
    }

    const data = await fetchUsers();
    
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">User Management</h1>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <UsersClient initialUsers={data} />
            </div>
        </div>
    );
}
