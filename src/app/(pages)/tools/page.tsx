import { TOOLS_CATEGORIES } from "@/lib/constants";
import { ExternalLink, InfoIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex-1 p-6">
      {TOOLS_CATEGORIES.map((category) => (
        <div key={category.id} className="mb-12" id={category.id}>
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
                <InfoIcon className="size-5 inline-block text-orange-500" /> No
                tools found in this category.
              </p>
            )}
            {category.items.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-lg border p-6 hover:bg-muted/50"
              >
                <div className="flex flex-col justify-between h-full space-y-4">
                  <div className="space-y-2 flex-grow">
                    <h3 className="flex items-center gap-2 font-semibold tracking-tight">
                      {tool.name}
                      <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {tool.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {tool.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-muted-foreground font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                      {tool.tags.length > 2 && (
                        <span className="text-xs text-muted-foreground">
                          +{tool.tags.length - 2} more
                        </span>
                      )}
                    </div>
                    <img
                      src={tool.avatar}
                      alt={tool.name}
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
  );
}
