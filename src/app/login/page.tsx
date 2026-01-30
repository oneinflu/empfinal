 "use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { useRouter } from "next/navigation";
import { API_BASE_URL, setAuthToken, setAuthUser, getAuthToken } from "@/utils/api";
import { LoginSlider } from "@/components/auth/login-slider";
import { Users01, SearchLg, ArrowLeft } from "@untitledui/icons";
import { motion } from "framer-motion";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    
    // New state for layout
    const [loginStep, setLoginStep] = useState<'selection' | 'form'>('selection');
    const [selectedRole, setSelectedRole] = useState<'candidate' | 'employer' | null>(null);

    useEffect(() => {
        const token = getAuthToken();
        if (token) {
            router.push("/dashboard");
        }
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            // Adjust API endpoint based on role if needed, currently using admin/login as generic
            const response = await fetch(`${API_BASE_URL}/auth/admin/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            setAuthToken(data.token);
            setAuthUser(data.user);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "An error occurred during login");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRoleSelect = (role: 'candidate' | 'employer') => {
        setSelectedRole(role);
        setLoginStep('form');
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center p-4 bg-gray-50">
            {/* Back Button */}
            <Link 
                href="/" 
                className="absolute top-6 left-6 z-30 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white shadow-sm border border-transparent hover:border-gray-200"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium text-sm">Back to Home</span>
            </Link>

            {/* Background Decoration */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-green-100/50 blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-3xl" />
            </div>

            {/* Central Card */}
            <div className="relative z-10 w-full max-w-6xl bg-white rounded-[32px] shadow-2xl overflow-hidden min-h-[650px] grid md:grid-cols-2">
                
                {/* Left Side - Green Gradient Background with Slider */}
                <div className="hidden md:block relative overflow-hidden bg-gradient-to-br from-green-600 to-green-900 p-8">
                    <div className="absolute top-8 left-8 z-20">
                        <div className="text-2xl font-bold text-white tracking-tight">empedia</div>
                    </div>
                    <LoginSlider />
                </div>

                {/* Right Side - White Background with Content */}
                <div className="flex items-center justify-center p-8 md:p-12 bg-white">
                    <div className="w-full max-w-md">
                    {loginStep === 'selection' ? (
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col gap-8"
                        >
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Identify your account type</h1>
                                <p className="text-gray-500 mt-2">Join Empedia to find your dream job or hire talented candidates</p>
                            </div>
                            
                            <div className="flex flex-col gap-4">
                                <button 
                                    onClick={() => handleRoleSelect('candidate')}
                                    className="p-6 border border-amber-100 bg-amber-50/50 rounded-2xl text-left hover:border-amber-300 hover:bg-amber-50 transition-all group relative overflow-hidden"
                                >
                                    <div className="relative z-10">
                                        <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <Users01 className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">I'm a Candidate</h3>
                                        <p className="text-sm text-gray-600 mt-1">Compete, learn, mentor and apply for jobs and internships</p>
                                    </div>
                                </button>

                                <button 
                                    onClick={() => handleRoleSelect('employer')}
                                    className="p-6 border border-blue-100 bg-blue-50/50 rounded-2xl text-left hover:border-blue-300 hover:bg-blue-50 transition-all group relative overflow-hidden"
                                >
                                    <div className="relative z-10">
                                        <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <SearchLg className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">I'm an Employer</h3>
                                        <p className="text-sm text-gray-600 mt-1">Post jobs, hire talent and offer career opportunities</p>
                                    </div>
                                </button>
                            </div>

                            <div className="text-xs text-gray-400 text-center px-4">
                                By signing in, you accept the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and acknowledge our <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col gap-6"
                        >
                            <button 
                                onClick={() => setLoginStep('selection')}
                                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to selection
                            </button>

                            <div className="flex flex-col gap-2">
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {selectedRole === 'candidate' ? 'Candidate Login' : 'Employer Login'}
                                </h1>
                                <p className="text-md text-gray-500">Access your account using your email and password.</p>
                            </div>

                            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                                {error && (
                                    <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
                                        {error}
                                    </div>
                                )}
                                <Input 
                                    label="Email" 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    isRequired 
                                    value={email}
                                    onChange={setEmail}
                                />
                                <Input 
                                    label="Password" 
                                    type="password" 
                                    placeholder="Enter your password" 
                                    isRequired 
                                    value={password}
                                    onChange={setPassword}
                                />
                                <Button type="submit" size="lg" disabled={isLoading}>
                                    {isLoading ? "Logging in..." : "Log in"}
                                </Button>
                            </form>

                            <div className="flex items-center gap-2 justify-center">
                                 <p className="text-md text-gray-500">Don’t have an account?</p>
                                 <Button href="/register" color="link-color" size="md">
                                     Create account
                                 </Button>
                             </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    </section>
    );
}
