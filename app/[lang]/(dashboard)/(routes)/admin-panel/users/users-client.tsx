"use client"

import { useState } from "react";
import { createUser, adminUpdateUserPassword, deleteUser } from "@/lib/actions/admin/users.action";
import { PlusIcon, KeyIcon, TrashIcon } from "lucide-react";

export default function UsersClient({ initialUsers }: { initialUsers: any[] }) {
    const [users, setUsers] = useState(initialUsers);
    
    // UI State
    const [isAdding, setIsAdding] = useState(false);
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    
    // Form State
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newName, setNewName] = useState("");
    const [newRole, setNewRole] = useState("marketing");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [editPassword, setEditPassword] = useState("");

    const handleCreateUser = async (e: any) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        const res = await createUser({ username: newUsername, password: newPassword, name: newName, role: newRole });
        if (res.error) {
            setError(res.error);
        } else {
            setIsAdding(false);
            window.location.reload(); // Quick refresh to get new users
        }
        setIsLoading(false);
    };

    const handleUpdatePassword = async (userId: string) => {
        if (!editPassword) return;
        setIsLoading(true);
        const res = await adminUpdateUserPassword(userId, editPassword);
        if (res.error) {
            alert(res.error);
        } else {
            setEditingUserId(null);
            setEditPassword("");
            alert("Password updated!");
        }
        setIsLoading(false);
    };

    const handleDelete = async (userId: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        setIsLoading(true);
        const res = await deleteUser(userId);
        if (res.error) {
            alert(res.error);
        } else {
            window.location.reload();
        }
        setIsLoading(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <p className="text-gray-500">Manage all administrative users in the system.</p>
                <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 bg-[#48749b] text-white px-4 py-2 rounded shadow hover:bg-[#355b81] transition"
                >
                    <PlusIcon className="w-4 h-4" /> Add User
                </button>
            </div>

            {isAdding && (
                <div className="bg-gray-50 p-4 rounded mb-6 border border-gray-200">
                    <h3 className="font-bold text-lg mb-4 text-gray-700">Create New User</h3>
                    <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input className="p-2 border rounded" placeholder="Full Name" required value={newName} onChange={(e) => setNewName(e.target.value)} />
                        <input className="p-2 border rounded" placeholder="Email / Username" type="email" required value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                        <input className="p-2 border rounded" placeholder="Password" required type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        <select className="p-2 border rounded" value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                            <option value="marketing">Marketing</option>
                            <option value="it">IT</option>
                            <option value="hr">HR</option>
                            <option value="super_admin">Super Admin</option>
                        </select>
                        <div className="md:col-span-2">
                            {error && <p className="text-red-500 mb-2">{error}</p>}
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition">Cancel</button>
                                <button type="submit" disabled={isLoading} className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 transition disabled:opacity-50">Create User</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600 border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Username</th>
                            <th className="p-3">Role</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u._id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="p-3 font-medium">{u.name}</td>
                                <td className="p-3">{u.username}</td>
                                <td className="p-3">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold uppercase">{u.role}</span>
                                </td>
                                <td className="p-3">
                                    {editingUserId === u._id ? (
                                        <div className="flex items-center justify-end gap-2">
                                            <input 
                                                type="text" 
                                                placeholder="New Password" 
                                                className="border p-1 text-xs rounded" 
                                                value={editPassword} 
                                                onChange={(e) => setEditPassword(e.target.value)}
                                            />
                                            <button disabled={isLoading} onClick={() => handleUpdatePassword(u._id)} className="text-xs bg-green-500 text-white px-2 py-1 rounded">Save</button>
                                            <button onClick={() => setEditingUserId(null)} className="text-xs bg-gray-300 px-2 py-1 rounded">Cancel</button>
                                        </div>
                                    ) : (
                                        <div className="flex justify-end gap-3">
                                            <button onClick={() => { setEditingUserId(u._id); setEditPassword(""); }} className="text-[#48749b] hover:text-[#355b81] flex items-center gap-1 transition">
                                                <KeyIcon className="w-4 h-4" /> <span className="hidden sm:inline text-xs">Pw</span>
                                            </button>
                                            <button onClick={() => handleDelete(u._id)} className="text-red-500 hover:text-red-700 flex items-center gap-1 transition disabled:opacity-30" disabled={isLoading}>
                                                <TrashIcon className="w-4 h-4" /> <span className="hidden sm:inline text-xs">Del</span>
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr><td colSpan={4} className="text-center p-4">No users found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
