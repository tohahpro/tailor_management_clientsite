/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { getIconComponent } from "@/lib/icon-mapper"
import { logoutUser } from "@/services/auth/logout"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { LogOut, PanelLeft } from "lucide-react"

import BrandLogo from "@/components/shared/BrandLogo"
import { UserInfo } from "../../../../types/user.interface"
import { NavSection } from "../../../../types/dashboard.interface"

interface DashboardSidebarContentProps {
    userInfo: UserInfo
    navItems: NavSection[]
    dashboardHome: string
}

const DashboardSidebarContent = ({
    userInfo,
    navItems,
    dashboardHome,
}: DashboardSidebarContentProps) => {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(false)

    const handleLogout = async () => {
        await logoutUser()
    }

    const displayName =
        userInfo?.admin?.name || userInfo?.tailor?.name || "User"

    const initial = displayName.charAt(0).toUpperCase()

    return (
        <TooltipProvider delayDuration={100}>
            <div
                className={cn(
                    "relative flex flex-col h-screen border-r bg-card transition-all duration-300",
                    isCollapsed ? "w-15" : "w-62"
                )}
            >
                {/* Collapse Toggle */}
                <div className="absolute -right-3 top-4 z-20">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 rounded-full shadow-md bg-background"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        <PanelLeft className="h-3 w-3" />
                    </Button>
                </div>

                {/* Logo */}
                <div
                    className={cn(
                        "flex items-center h-14 border-b px-3",
                        isCollapsed ? "justify-center" : "justify-between"
                    )}
                >
                    <Link href={dashboardHome} className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
                            TD
                        </div>
                        {!isCollapsed && <BrandLogo />}
                    </Link>
                </div>

                {/* Navigation */}
                <ScrollArea className="flex-1 py-4">
                    <div className="px-2 space-y-6">
                        {navItems.map((section, sectionIdx) => (
                            <div key={sectionIdx}>
                                {!isCollapsed && section.title && (
                                    <h4 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        {section.title}
                                    </h4>
                                )}

                                <div className="space-y-1">
                                    {section.items.map((item: any) => {
                                        const isActive =
                                            pathname === item.href

                                        const Icon = getIconComponent(item.icon)

                                        const navLink = (
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                                                    isActive
                                                        ? "bg-[#c8aee7] text-black"
                                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                                                    isCollapsed && "justify-center"
                                                )}
                                            >
                                                <Icon className="h-4 w-4 shrink-0" />

                                                {!isCollapsed && (
                                                    <>
                                                        <span className="flex-1 truncate">
                                                            {item.title}
                                                        </span>
                                                        {item.badge && (
                                                            <Badge
                                                                className={cn(
                                                                    isActive
                                                                        ? "bg-[#F0E4FF] border-transparent hover:bg-[#F0E4FF]"
                                                                        : ""
                                                                )}
                                                                variant="outline"
                                                            >
                                                                {item.badge}
                                                            </Badge>
                                                        )}
                                                    </>
                                                )}
                                            </Link>
                                        )

                                        return isCollapsed ? (
                                            <Tooltip key={item.href}>
                                                <TooltipTrigger asChild>
                                                    {navLink}
                                                </TooltipTrigger>
                                                <TooltipContent
                                                    side="right"
                                                    className="bg-[#F0E4FF] fill-[#F0E4FF] text-black"
                                                >
                                                    {item.title}
                                                </TooltipContent>
                                            </Tooltip>
                                        ) : (
                                            <div key={item.href}>{navLink}</div>
                                        )
                                    })}
                                </div>

                                {sectionIdx < navItems.length - 1 && (
                                    <Separator className="my-4" />
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                {/* User Info + Logout */}
                <div className="border-t p-3 space-y-3">
                    {isCollapsed ? (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex justify-center cursor-pointer">
                                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="text-sm font-semibold text-primary">
                                            {initial}
                                        </span>
                                    </div>
                                </div>
                            </TooltipTrigger>

                            <TooltipContent side="right" className="w-fit px-5 bg-[#F0E4FF] fill-[#F0E4FF]">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-black">
                                        {displayName}
                                    </p>
                                    <p className="text-xs text-muted-foreground font-medium">
                                        {userInfo?.email}
                                    </p>
                                    <p className="text-xs text-muted-foreground font-medium capitalize">
                                        {userInfo?.role?.toLowerCase()}
                                    </p>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    ) : (
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-semibold text-primary">
                                    {initial}
                                </span>
                            </div>

                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium truncate">
                                    {displayName}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                    {userInfo?.email}
                                </p>
                                <p className="text-xs text-muted-foreground capitalize">
                                    {userInfo?.role?.toLowerCase()}
                                </p>
                            </div>
                        </div>
                    )}

                    {isCollapsed ? (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-center px-0 text-red-600"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="bg-[#F0E4FF] fill-[#F0E4FF] text-black font-medium">
                                Logout
                            </TooltipContent>
                        </Tooltip>
                    ) : (
                        <Button
                            variant="outline"
                            className="w-full justify-start text-red-500"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="ml-2">Logout</span>
                        </Button>
                    )}
                </div>
            </div>
        </TooltipProvider>
    )
}

export default DashboardSidebarContent
