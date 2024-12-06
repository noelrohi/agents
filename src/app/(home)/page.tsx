import { AppSidebar } from "@/components/app-sidebar";
import { InputWithButton } from "@/components/input-with-button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CATEGORIES } from "@/lib/constants";
import { ExternalLink, InfoIcon } from "lucide-react";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const categoryId = (await searchParams).category;
  const categoriesToShow = categoryId
    ? [CATEGORIES.find((c) => c.id === categoryId)!]
    : CATEGORIES;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b px-4">
          <div />
          <div className="flex items-center gap-6">
            <InputWithButton
              placeholder="Get latest updates"
              buttonText="Subscribe"
            />
            <nav className="flex items-center gap-6">
              <Link className="text-sm" href="/about">
                About
              </Link>
              <Link
                className="text-sm"
                href="https://github.com/noelrohi/aigent/issues/new?assignees=&labels=&projects=&template=new-ai-agent.md&title=%5BAI+Agent+Name%5D"
                target="_blank"
                rel="noopener noreferrer"
              >
                Submit
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {categoriesToShow.map((category) => (
            <div key={category.id} className="mb-12">
              <div className="mb-8">
                <h1 className="text-2xl font-semibold font-heading tracking-tight">
                  {category.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Explore the best {category.name.toLowerCase()} tools and
                  platforms.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.items.length === 0 && (
                  <p className="text-sm flex items-center gap-2">
                    <InfoIcon className="size-5 inline-block text-orange-500" />{" "}
                    No agents found in this category.
                  </p>
                )}
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
                          {agent.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-muted-foreground font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                          {agent.tags.length > 2 && (
                            <span className="text-xs text-muted-foreground">
                              +{agent.tags.length - 2} more
                            </span>
                          )}
                        </div>
                        <img
                          src={agent.avatar}
                          alt={agent.name}
                          className="h-8 w-8 rounded-full"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
