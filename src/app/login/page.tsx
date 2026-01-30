 "use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { useRouter } from "next/navigation";
import { API_BASE_URL, setAuthToken, setAuthUser, getAuthToken } from "@/utils/api";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

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

            // Save token and user details
            setAuthToken(data.token);
            setAuthUser(data.user);

            // Redirect to dashboard
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "An error occurred during login");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="min-h-screen grid md:grid-cols-2 bg-primary">
            <div className="flex items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-md flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-display-sm font-semibold text-primary">Log in</h1>
                        <p className="text-md text-tertiary">Access your account using your email and password.</p>
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

                    <div className="flex items-center gap-2">
                         <p className="text-md text-tertiary">Don’t have an account?</p>
                         <Button href="/register" color="link-color" size="md">
                             Create account
                         </Button>
                     </div>
                 </div>
             </div>
 
             <div className="hidden md:block">
                 <div className="h-full w-full" style={{ background: "linear-gradient(180deg, #22c55e, #065f46)" }} />
             </div>
         </section>
     );
 }
