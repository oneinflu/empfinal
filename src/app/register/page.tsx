 "use client";
 
 import { Input } from "@/components/base/input/input";
 import { Button } from "@/components/base/buttons/button";
 
 
 export default function RegisterPage() {
     return (
         <section className="min-h-screen grid md:grid-cols-2 bg-primary">
             <div className="flex items-center justify-center p-6 md:p-10">
                 <div className="w-full max-w-md flex flex-col gap-6">
                     <div className="flex flex-col gap-2">
                         <h1 className="text-display-sm font-semibold text-primary">Create account</h1>
                         <p className="text-md text-tertiary">Set up your account to get started.</p>
                     </div>
 
                     <form className="flex flex-col gap-4">
                         <Input label="Full name" type="text" placeholder="Enter your name" isRequired />
                         <Input label="Email" type="email" placeholder="Enter your email" isRequired />
                         <Input label="Password" type="password" placeholder="Create a password" isRequired />
                         <Button type="submit" size="lg">
                             Sign up
                         </Button>
                     </form>
 
                     <div className="flex items-center gap-2">
                         <p className="text-md text-tertiary">Already have an account?</p>
                         <Button href="/login" color="link-color" size="md">
                             Log in
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
