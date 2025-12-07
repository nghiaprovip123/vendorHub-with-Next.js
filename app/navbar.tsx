"use client";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Stack } from "@mui/material";

interface NavBarItemProps {
  href: string;
  title: string;
  isActive?: boolean;
}

const navbarItems = [
  { path: '/', title: 'Home' },
  { path: '/about', title: 'About' },
  { path: '/features', title: 'Features' },
  { path: '/pricing', title: 'Pricing' },
  { path: '/contact', title: 'Contact' },
]

const NavItem = (props: NavBarItemProps) => {
  const { href, title, isActive } = props;

  return (
    <Button 
      asChild
      variant='reverse'
      className={cn(
        "bg-white rounded-full hover:border-primary border-white", 
        isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}
      style={{
        padding: '0px 12px',
        maxHeight: '32px'
      }}
    >
      <Link href={href}>
        {title}
      </Link>
    </Button>
  )
}

export const Navbar = () => {
  const pathName = usePathname();

  return (
    <div className="flex items-center justify-between p-2 bg-white">   
      <Link href="/" className="font-bold text-2xl">
        vendorHub
      </Link>

      <div className ="items-center gap-1 flex cursor-point">
        {navbarItems.map((item, index) => (
          <NavItem
            key={index}
            href={item.path}
            title={item.title}
            isActive={pathName === item.path}
          />
        ))}
      </div> 
      <div className="flex items-center gap-2">
        <Button
          label="Login"
          className="bg-white text-black text-lg font-bold"
          variant='noShadow'
        />
        <Button
          label="Start Selling"
          variant='noShadow'
          className="text-white bg-black text-lg shadow-none font-bold"
        />
      </div>
    </div>
  )
}

export default Navbar;