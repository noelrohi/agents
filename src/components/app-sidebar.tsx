"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { CATEGORIES } from "@/lib/constants";

export function AppSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const filteredCategories = CATEGORIES.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Sidebar>
      <SidebarHeader className="border-b min-h-14 font-semibold px-5 py-2 flex justify-center font-heading">
        <Link href="/">aigent.directory</Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="p-2">
            <SidebarMenuItem className="relative mb-2">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <SidebarInput
                placeholder="Search..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SidebarMenuItem>
            {filteredCategories.map((category) => (
              <SidebarMenuItem key={category.id}>
                <Link href={`/?category=${category.id}`} className="w-full">
                  <SidebarMenuButton
                    className="w-full justify-between font-normal"
                    tooltip={category.name}
                    isActive={currentCategory === category.id}
                  >
                    {category.name}
                    <span className="text-muted-foreground">
                      {category.items.length}
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
            {filteredCategories.length === 0 && (
              <p className="px-4 text-sm text-muted-foreground">
                No categories found
              </p>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
