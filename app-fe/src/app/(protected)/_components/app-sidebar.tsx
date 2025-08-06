"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Settings2 } from "lucide-react";
import { usePathname } from "next/navigation";
import UserButton from "./user-button";
import { DashboardTrial } from "./dashboard-trial";
import { dishes } from "@/lib/dishes";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const pathname = usePathname();

  const trpc = useTRPC();
  const { data: db_data } = useQuery(trpc.dish.getMany.queryOptions());

  // This is sample data.
  const data = {
    navMain: [
      {
        title: "Main",
        url: "/dashboard",
        items: [
          {
            title: "Home",
            url: "/dashboard",
            icon: <LayoutDashboard className="size-4" />,
          },
          {
            title: "Settings",
            url: "/settings",
            icon: <Settings2 className="size-4" />,
          },
        ],
      },
      {
        title: "Recent Dishes",
        url: "#",
        items: (db_data?.items || []).map((e) => ({
          title: e.dish_name,
          url: e.id,
          icon: null,
        })),
      },
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/" className="flex items-center">
          <Image src={"/logo-bg.png"} alt="logo" height={60} width={60} />
          <span className="text-xl font-semibold pt-1">Cooksy</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((mainItem) => (
          <SidebarGroup key={mainItem.title}>
            <SidebarGroupLabel>{mainItem.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainItem.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={pathname.includes(item.url)}
                      asChild>
                      <Link href={item.url} className="flex gap-2">
                        {mainItem.title == "Main" && item.icon}
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <DashboardTrial />
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
