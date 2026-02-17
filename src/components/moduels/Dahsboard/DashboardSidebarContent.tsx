"use client"

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getIconComponent } from "@/lib/icon-mapper";
import { usePathname } from "next/navigation";
import { UserInfo } from "../../../../types/user.interface";
import { NavSection } from "../../../../types/dashboard.interface";
import BrandLogo from "@/components/shared/BrandLogo";
import { logoutUser } from "@/services/auth/logout";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";



interface DashboardSidebarContentProps {
    userInfo: UserInfo;
    navItems: NavSection[];
    dashboardHome: string;
}

const DashboardSidebarContent = ({
    userInfo,
    navItems,
    dashboardHome
}: DashboardSidebarContentProps) => {

    const pathname = usePathname()

    const handleLogout = async () => {
        await logoutUser();
    };

    return (
        <div>
            <div className="hidden md:flex h-full w-64 flex-col border-r bg-card">
                {/* Logo/Brand */}
                <div className="flex h-16 items-center border-b px-6">
                    <Link href={dashboardHome}>
                        <BrandLogo />
                    </Link>
                </div>

                {/* Navigation */}
                <ScrollArea className="flex-1 px-3 py-4">
                    <nav className="space-y-6">
                        {navItems.map((section, sectionIdx) => (
                            <div key={sectionIdx}>
                                {section.title && (
                                    <h4 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        {section.title}
                                    </h4>
                                )}
                                <div className="space-y-1">
                                    {section.items.map((item) => {
                                        const isActive = pathname === item.href;
                                        const Icon = getIconComponent(item.icon);


                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                                                    isActive
                                                        ? "bg-primary text-primary-foreground"
                                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                                )}
                                            >
                                                <Icon className="h-4 w-4" />
                                                <span className="flex-1">{item.title}</span>
                                                {item.badge && (
                                                    <Badge
                                                        variant={isActive ? "secondary" : "default"}
                                                        className="ml-auto"
                                                    >
                                                        {item.badge}
                                                    </Badge>
                                                )}
                                            </Link>
                                        );
                                    })}
                                </div>
                                {sectionIdx < navItems.length - 1 && (
                                    <Separator className="my-4" />
                                )}
                            </div>
                        ))}
                    </nav>
                </ScrollArea>

                {/* User Info at Bottom */}
                <div className="border-t p-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">
                                {
                                    userInfo.admin?.name.charAt(0).toUpperCase() ||
                                    userInfo.tailor?.name.charAt(0).toUpperCase()
                                }
                            </span>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium truncate">
                                {
                                    userInfo.admin?.name || userInfo.tailor?.name
                                }
                            </p>
                            <p className="text-xs text-muted-foreground">{userInfo.email}</p>
                            <p className="text-xs text-muted-foreground capitalize">
                                {userInfo.role.toLowerCase()}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="pb-2 px-4">
                    <div className="flex items-center gap-3">
                        <p
                            onClick={handleLogout}
                            className="cursor-pointer text-red-600 w-full p-0"
                        >
                            <Button className="cursor-pointer w-full" variant={"outline"} onClick={handleLogout}>
                                <LogOut className="w-4 h-4" />
                                Logout
                            </Button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSidebarContent;