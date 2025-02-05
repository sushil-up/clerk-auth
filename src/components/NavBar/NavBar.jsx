"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { routsurl } from "@/utils/routs";
import Link from "next/link";
const NavBar = () => {
  const { user } = useUser();
  if (!user) {
    return <></>;
  }
  return (
    <>
      <div className="flex justify-between m-2 p-1">
        <NavigationMenu>
          <NavigationMenuList className="!flex !gap-4 ml-2">
            <NavigationMenuItem>
              <NavigationMenuLink>
                <Link href={routsurl.home}>Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>
                <Link href={routsurl.about}>About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* <NavigationMenuItem> */}
            {/* <NavigationMenuLink href={routsurl.admin}>Admin</NavigationMenuLink> */}
            {/* </NavigationMenuItem> */}
            <NavigationMenuItem>
              <NavigationMenuLink>
                <Link href={routsurl.security}>Security</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="mr-2">
          <UserButton showName />
        </div>
      </div>
    </>
  );
};

export default NavBar;
