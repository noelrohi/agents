"use client";

import { AGENT_CATEGORIES, TOOLS_CATEGORIES } from "@/lib/constants";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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

export function AppSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeHash, setActiveHash] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const CATEGORIES = pathname === "/" ? AGENT_CATEGORIES : TOOLS_CATEGORIES;

  const filteredItems = useMemo(() => {
    return CATEGORIES.flatMap((category) => category.items).filter((item) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchLower) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    });
  }, [searchQuery, pathname]);

  const filteredCategories = useMemo(() => {
    return CATEGORIES.filter((category) => {
      return category.items.some((item) => filteredItems.includes(item));
    });
  }, [filteredItems, pathname]);

  useEffect(() => {
    // Set initial hash
    setActiveHash(window.location.hash.slice(1));

    // Listen for hash changes
    const handleHashChange = () => {
      setActiveHash(window.location.hash.slice(1));
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

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
                placeholder="Search tags, categories..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SidebarMenuItem>
            {filteredCategories.map((category) => (
              <SidebarMenuItem key={category.id}>
                <SidebarMenuButton
                  onClick={() => {
                    const element = document.getElementById(category.id);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                    router.push(`${pathname}#${category.id}`);
                    setActiveHash(category.id);
                  }}
                  className="w-full justify-between font-normal"
                  tooltip={category.name}
                  isActive={activeHash === category.id}
                >
                  {category.name}
                  <span className="text-muted-foreground">
                    {category.items.length}
                  </span>
                </SidebarMenuButton>
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
