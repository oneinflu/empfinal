 "use client";
 
 import { Bell01 } from "@untitledui/icons";
 import { ButtonUtility } from "@/components/base/buttons/button-utility";
 import { Avatar } from "@/components/base/avatar/avatar";
 import { Button as AriaButton, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover } from "react-aria-components";
 import { NavAccountMenu } from "@/components/application/app-navigation/base-components/nav-account-card";
 import { cx } from "@/utils/cx";
 
 export const DashboardHeader = () => {
     return (
         <header className="sticky top-0 z-40 border-b border-secondary bg-primary">
             <div className="mx-auto max-w-container h-16 px-4 md:px-8 flex items-center justify-end gap-2">
                 <ButtonUtility size="sm" color="secondary" icon={Bell01} aria-label="Notifications" />
 
                 <AriaDialogTrigger>
                     <AriaButton
                         className={({ isPressed, isFocused }) =>
                             cx("group relative inline-flex rounded-full", (isPressed || isFocused) && "outline-2 outline-offset-2 outline-focus-ring")
                         }
                     >
                         <Avatar
                             status="online"
                             src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                             size="md"
                             alt="Olivia Rhye"
                         />
                     </AriaButton>
                     <AriaPopover placement="bottom right" offset={8}>
                         <NavAccountMenu />
                     </AriaPopover>
                 </AriaDialogTrigger>
             </div>
         </header>
     );
 };
