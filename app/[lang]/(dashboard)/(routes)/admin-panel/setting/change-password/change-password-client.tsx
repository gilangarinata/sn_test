"use client"

import { useState } from "react";
import { changePassword } from "@/lib/actions/admin/auth.action";
import { useRouter } from "next/navigation";

export default function ChangePasswordClient() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        
        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setIsLoading(true);
        const res = await changePassword({ oldPassword, newPassword });
        if (res.error) {
            setError(res.error);
        } else {
            setSuccess("Password successfully changed!");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            // Optionally redirect after a few seconds
            // setTimeout(() => router.push('/admin-panel'), 2000);
        }
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm border border-red-200">{error}</div>}
            {success && <div className="bg-green-50 text-green-600 p-3 rounded text-sm border border-green-200">{success}</div>}
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input 
                    type="password" 
                    className="w-full p-2 border rounded outline-none focus:border-[#48749b]" 
                    required 
                    value={oldPassword} 
                    onChange={(e) => setOldPassword(e.target.value)} 
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input 
                    type="password" 
                    className="w-full p-2 border rounded outline-none focus:border-[#48749b]" 
                    required 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                />
            </div>
            
            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input 
                    type="password" 
                    className="w-full p-2 border rounded outline-none focus:border-[#48749b]" 
                    required 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                />
            </div>
            
            <button 
                type="submit" 
                disabled={isLoading}
                className="bg-[#48749b] text-white py-2 px-4 rounded shadow font-semibold hover:bg-[#355b81] transition disabled:opacity-50"
            >
                {isLoading ? "Saving..." : "Change Password"}
            </button>
        </form>
    );
}
