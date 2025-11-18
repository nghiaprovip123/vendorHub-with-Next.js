"use client"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const poppins = Poppins(
    {
        subsets:['latin'],
        weight: ['700']
    }
)

interface NavBarItemProps 
{
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
}

const NavItem = (navBarItemProps: NavBarItemProps) =>
    {
        const href = navBarItemProps.href;
        const children = navBarItemProps.children;
        const isActive = navBarItemProps.isActive; 

        return (
            <Button 
                asChild
                variant="outline" 
                className={cn(
                    "bg-white hover:bg-transparent rounded-full hover:border-primary border-white text-lg", 
                    isActive && "bg-black text-white hover:bg-black hover:text-white text-lg"
                )}>
                <Link href={href}>
                    {children}
                </Link>
            </Button>
        )
    }
const navbarItems = 
[
    {href: '/foo', children: 'Home'},
    {href: '/about', children: 'About'},
    {href: '/features', children: 'Features'},
    {href: '/pricing', children: 'Pricing'},
    {href: '/contact', children: 'Contact'},
    {href:'/login', children: 'Login'},
    {href:'/selling', children: 'Start selling'},
]

const CcItems = (ccprops: NavBarItemProps) =>
{
    const href = ccprops.href;
    const children = ccprops.children
    const isLogin = href === "/login";
    return (
    <Button
        asChild
        className={cn(
            "rounded-r-none rounded-l-none h-20 pl-12 pr-12 border text-lg",
            isLogin && "bg-white text-black hover:bg-white hover:text-black border-r-2 text-lg"
        )}
        >
        <Link href={href}>
            {children}
        </Link>
        </Button>
    )
}


export const Navbar = 
() => 
    {
        const pathName = usePathname();
        return (
            <nav className ="h-20 flex border-b justify-between font-medium font-medium bg-white">   
                <Link href ="/" className = "pl-6 flex items-center">
                    <span> 
                        <span className={cn("text-5xl font-semibold", poppins.className)}>
                            vendorHub
                        </span>
                    </span>
                </Link>
                <div className="gap-0 lg:flex">
                    <div className ="items-center gap-4 lg:flex pr-6 cursor-point test-base">
                            {navbarItems.map((item) => 
                                (
                                    <NavItem 
                                        key={item.href}
                                        href={item.href}
                                        isActive={pathName === item.href}>
                                        {item.children}
                                    </NavItem>
                                ))
                            }
                        </div> 
                        <div className = "items-center lg:flex">
                            {navbarItems.filter(item => item.href === "/login" || item.href === "/selling").map((item) =>
                                (
                                    <CcItems
                                        key={item.href}
                                        href={item.href}
                                    >
                                            {item.children}
                                    </CcItems>
                                )
                            )}
                        </div>
                </div>
            </nav>
        )
    }

export default Navbar;