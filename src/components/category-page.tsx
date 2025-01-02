import { CategoryGroup } from "@/data";
import { ExternalLink, InfoIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function CategoryPage({ categories }: { categories: CategoryGroup[] }) {
  return (
    <main className="flex-1 p-6">
      {categories.map((category) => (
        <div key={category.id} className="mb-12" id={category.id}>
          <div className="mb-8">
            <h1 className="text-2xl font-semibold font-heading tracking-tight">
              {category.name.charAt(0).toUpperCase() +
                category.name.slice(1).replace("-", " ")}
            </h1>
            <p className="text-sm text-muted-foreground">
              Explore the best {category.name.toLowerCase()} tools and
              platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {category.items.length === 0 && (
              <p className="text-sm flex items-center gap-2">
                <InfoIcon className="size-5 inline-block text-orange-500" /> No
                tools found in this category.
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
                      {agent.tags.length > 2 && (
                        <span className="text-xs text-muted-foreground">
                          +{agent.tags.length - 2} more
                        </span>
                      )}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={agent.avatar ?? ""} alt={agent.name} />
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
