
import { NavSection } from "../../types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./authUtils";


export const getCommonNavItems = (role: UserRole): NavSection[] => {

    const defaultDashboard = getDefaultDashboardRoute(role)

    return [
        {
            items: [
                {
                    title: "Home",
                    href: '/',
                    icon: "Home",
                    roles: ['ADMIN', 'SUPER_ADMIN', 'TAILOR']
                },
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ['ADMIN', 'SUPER_ADMIN', 'TAILOR']
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ['ADMIN', 'SUPER_ADMIN', 'TAILOR']
                },
            ]
        },
        {
            title: 'Settings',
            items: [
                {
                    title: 'Change Password',
                    href: '/change-password',
                    icon: 'Settings',
                    roles: ['TAILOR']
                }
            ]
        },
    ]
}



export const tailorNavItems: NavSection[] = [
    {
        title: 'Customer Orders',
        items: [
            {
                title: 'My Orders',
                href: '/dashboard/my-orders',
                icon: 'Calender',
                roles: ['TAILOR']
            },
            {
                title: 'Cloth Category',
                href: '/dashboard/cloth-category',
                icon: 'ClipboardList',
                roles: ['TAILOR']
            },
        ]
    },
    {
        title: 'Records',
        items: [
            {
                title: 'My Subscription',
                href: '/dashboard/my-subscription',
                icon: 'FileText',
                roles: ['TAILOR']
            }
        ]
    }
]



export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Admins",
                href: "/admin/dashboard/admins-management",
                icon: "Shield",
                roles: ['ADMIN', 'SUPER_ADMIN'],
            },
            {
                title: "Tailors",
                href: "/admin/dashboard/tailors-management",
                icon: "Users",
                roles: ['ADMIN', 'SUPER_ADMIN'],
            },
        ],
    },
    {
        title: "Plan Management",
        items: [
            {
                title: "Plans",
                href: "/admin/dashboard/plans-management",
                icon: "Calendar",
                roles: ['ADMIN', 'SUPER_ADMIN'],
            },
            {
                title: "Subscription",
                href: "/admin/dashboard/Subscription-management",
                icon: "Clock",
                roles: ['ADMIN', 'SUPER_ADMIN'],
            }
        ],
    }
]


// export const getNavItemsByRole = (role: UserRole): NavSection[] =>{
export const getNavItemsByRole = async (role: UserRole): Promise<NavSection[]> => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "SUPER_ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "TAILOR":
            return [...commonNavItems, ...tailorNavItems];
        default:
            return [];
    }
}

