"use client";

import { CATEGORIES } from "@/lib/constants";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";

export function AppSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeHash, setActiveHash] = useState("");
  const router = useRouter();

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
                placeholder="Search..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SidebarMenuItem>
            {CATEGORIES.map((category) => (
              <SidebarMenuItem key={category.id}>
                <SidebarMenuButton
                  onClick={() => {
                    const element = document.getElementById(category.id);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                    router.push(`#${category.id}`);
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
            {CATEGORIES.length === 0 && (
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
