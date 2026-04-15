"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/actions/admin/auth.action";
import Image from "next/image";
import { User, Lock } from "lucide-react";

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
        <div className="flex h-screen w-full bg-white overflow-hidden">
            {/* Left Image Section - Hidden on mobile */}
            <div className="hidden lg:block lg:w-1/2 h-full relative">
                <Image 
                    src="/images/bg_login.jpg" 
                    alt="Solar Panels Background" 
                    fill 
                    className="object-cover"
                    priority
                />
            </div>

            {/* Right Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
                <div className="w-full max-w-md">
                    <div className="flex mb-12">
                        <Image 
                            src="/images/logo_sesna.png" 
                            alt="Sesna Logo" 
                            width={220} 
                            height={60} 
                            className="h-auto w-48 sm:w-56" 
                        />
                    </div>
                    
                    <h2 className="text-2xl mb-8 text-[#597a96]">
                        USER <span className="font-bold text-[#355b81]">LOGIN</span>
                    </h2>
                    
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Username Input */}
                        <div className="flex items-center border border-[#a2b5c6] rounded-md overflow-hidden bg-white">
                            <div className="bg-[#48749b] p-3 flex justify-center items-center w-12 h-12">
                                <User className="text-white w-5 h-5 mx-auto" />
                            </div>
                            <input
                                type="text"
                                placeholder="username"
                                className="flex-1 p-3 outline-none text-gray-700 placeholder:text-[#a2b5c6] font-medium"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                    setError("")
                                }}
                                required
                            />
                        </div>
                        
                        {/* Password Input */}
                        <div className="flex items-center border border-[#a2b5c6] rounded-md overflow-hidden bg-white">
                            <div className="bg-[#48749b] p-3 flex justify-center items-center w-12 h-12">
                                <Lock className="text-white w-5 h-5 mx-auto" />
                            </div>
                            <input
                                type="password"
                                placeholder="........"
                                className="flex-1 p-3 outline-none text-gray-700 placeholder:text-[#a2b5c6] font-medium tracking-[0.2em]"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setError("")
                                }}
                                required
                            />
                        </div>
                        
                        <div className="flex justify-between items-center pt-2 text-sm">
                            <label className="flex items-center space-x-2 cursor-pointer text-[#48749b] font-semibold">
                                <input 
                                    type="checkbox" 
                                    className="w-4 h-4 text-[#48749b] bg-white border-[#a2b5c6] rounded focus:ring-0 focus:ring-offset-0" 
                                />
                                <span>Remember me</span>
                            </label>
                            
                        </div>
                        
                        {error && <p className="text-red-500 text-center font-medium mt-4">{error}</p>}
                        
                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full bg-[#48749b] text-white py-3 rounded-md font-bold text-lg hover:bg-[#375a7a] transition-colors disabled:opacity-70 disabled:cursor-not-allowed tracking-wide"
                                disabled={isLoading}
                            >
                                {isLoading ? "LOGGING IN..." : "LOGIN"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
