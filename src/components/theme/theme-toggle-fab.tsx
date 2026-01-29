 "use client";
 
 import { useEffect, useState } from "react";
 import { ButtonUtility } from "@/components/base/buttons/button-utility";
 import { Sun, Moon01 } from "@untitledui/icons";
 import { useTheme } from "next-themes";
 
 export const ThemeToggleFab = () => {
     const { theme, resolvedTheme, setTheme } = useTheme();
     const [mounted, setMounted] = useState(false);
     useEffect(() => setMounted(true), []);
     const isDark = (theme ?? resolvedTheme) === "dark";
     if (!mounted) return null;
     return (
         <div className="fixed bottom-4 right-4 z-50 rounded-full bg-primary shadow-xs ring-1 ring-secondary ring-inset p-2">
             <ButtonUtility
                 size="sm"
                 color="secondary"
                 icon={isDark ? Sun : Moon01}
                 aria-label="Toggle theme"
                 onClick={() => setTheme(isDark ? "light" : "dark")}
             />
         </div>
     );
 };
