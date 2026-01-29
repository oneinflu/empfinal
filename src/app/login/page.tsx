 "use client";
 
 import { Input } from "@/components/base/input/input";
 import { Button } from "@/components/base/buttons/button";
 import { useRouter } from "next/navigation";
 
 
 export default function LoginPage() {
     const router = useRouter();
     return (
         <section className="min-h-screen grid md:grid-cols-2 bg-primary">
             <div className="flex items-center justify-center p-6 md:p-10">
                 <div className="w-full max-w-md flex flex-col gap-6">
                     <div className="flex flex-col gap-2">
                         <h1 className="text-display-sm font-semibold text-primary">Log in</h1>
                         <p className="text-md text-tertiary">Access your account using your email and password.</p>
                     </div>
 
                     <form
                         className="flex flex-col gap-4"
                         onSubmit={(e) => {
                             e.preventDefault();
                             router.push("/dashboard");
                         }}
                     >
                         <Input label="Email" type="email" placeholder="Enter your email" isRequired />
                         <Input label="Password" type="password" placeholder="Enter your password" isRequired />
                         <Button type="submit" size="lg">
                             Log in
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
