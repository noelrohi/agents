"use client";

import { refreshAgents } from "@/app/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { CategoryGroup } from "@/data";
import {
  ExternalLink,
  InfoIcon,
  RefreshCcw,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";

export function CategoryPage({ categories }: { categories: CategoryGroup[] }) {
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  const filteredCategories = categories.map((category) => ({
    ...category,
    items: category.items.filter((item) => {
      const searchLower = search.toLowerCase();
      return (
        // Search in name
        item.name.toLowerCase().includes(searchLower) ||
        // Search in description
        item.description.toLowerCase().includes(searchLower) ||
        // Search in category
        category.name.toLowerCase().includes(searchLower) ||
        // Search in tags
        JSON.parse(item.tags).some((tag: string) =>
          tag.toLowerCase().includes(searchLower),
        )
      );
    }),
  }));

  return (
    <main className="flex-1 p-6 space-y-6">
      <div className="flex gap-4 items-center">
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, description, category, or tags..."
            className="pl-10 min-w-96"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          onClick={() =>
            startTransition(async () => {
              await refreshAgents();
            })
          }
          className="size-7"
          variant="outline"
          disabled={isPending}
          size="icon"
        >
          <RefreshCcw className="size-4" />
        </Button>
      </div>
      {filteredCategories.length === 0 && search && (
        <p className="text-sm flex items-center gap-2">
          <InfoIcon className="size-5 inline-block text-orange-500" />
          No results found for "{search}".
        </p>
      )}

      {filteredCategories
        .filter((category) => category.items.length > 0)
        .map((category) => (
          <div key={category.id} className="mb-12" id={category.id}>
            <div className="mb-8">
              <h1 className="text-2xl font-semibold font-heading tracking-tight flex items-center gap-2">
                {category.name.charAt(0).toUpperCase() +
                  category.name.slice(1).replace("-", " ")}
                {category.id === "new" && (
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                )}
              </h1>
              <p className="text-sm text-muted-foreground">
                {category.id === "new"
                  ? "Discover the latest additions from the past 24 hours"
                  : `Explore the best ${category.name.toLowerCase()} tools and platforms.`}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {category.items.map((agent) => (
                <Link
                  key={agent.name}
                  href={agent.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-lg border p-6 hover:bg-muted/50"
                >
                  <div className="flex flex-col justify-between h-full space-y-4">
                    <div className="space-y-2 flex-grow">
                      <h3 className="flex items-center gap-2 font-semibold tracking-tight">
                        {agent.name}
                        <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {agent.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {JSON.parse(agent.tags)
                          .slice(0, 2)
                          .map((tag: string) => (
                            <span
                              key={tag}
                              className="text-xs text-muted-foreground font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                        {JSON.parse(agent.tags).length > 2 && (
                          <span className="text-xs text-muted-foreground">
                            +{JSON.parse(agent.tags).length - 2} more
                          </span>
                        )}
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={agent.avatar ?? ""}
                          alt={agent.name}
                        />
                        <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
    </main>
  );
}
