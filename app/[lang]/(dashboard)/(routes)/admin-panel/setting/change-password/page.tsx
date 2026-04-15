import ChangePasswordClient from "./change-password-client";

export default function ChangePasswordPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Change Password</h1>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-lg">
                <ChangePasswordClient />
            </div>
        </div>
    );
}
