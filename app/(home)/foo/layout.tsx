import { NavigationMenu } from "@/components/ui/navigation-menu"
import { NavigationIcon } from "lucide-react";
import Navbar from "./navbar";

interface Props {
    children: React.ReactNode;
};

const Layout = ({children}: Props) => {
    return(
        <div>
            <Navbar />  
                {children}
            <NavigationMenu className ="bg-yellow-200 w-full p-2 border-2 border-black rounded-lg">
                <p> NavBar </p>
            </NavigationMenu>
            <NavigationMenu className ="bg-yellow-200 w-full">
                <p> NavBar </p>
            </NavigationMenu>
            {children}
        </div>
    )
}

export default Layout;