"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/actions/admin/auth.action";

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await login({ username, password });
            if (result?.error) {
                setError(result.error);
            }
        } catch (err: any) {
            // If the error is a redirect, we should not catch it
            if (err.message?.includes('NEXT_REDIRECT')) {
                throw err;
            }
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                            Email / Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                                setError("")
                            }}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setError("")
                            }}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-full disabled:bg-gray-400"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
