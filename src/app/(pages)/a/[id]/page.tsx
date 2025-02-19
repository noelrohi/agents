import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getItem } from "@/data";
import { editFlag } from "@/flags";
import { getEmbedUrl } from "@/lib/utils";
import { ExternalLink, Youtube } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const item = await getItem(Number.parseInt(params.id));

  if (!item) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: `${item.name} - ${item.type === "agent" ? "Agent" : "Tool"}`,
    description: item.description,
    openGraph: {
      title: `${item.name} - ${item.type === "agent" ? "Agent" : "Tool"}`,
      description: item.description,
    },
  };
}

export default async function ItemPage(props: Props) {
  const params = await props.params;
  const [item, canEdit] = await Promise.all([
    getItem(Number.parseInt(params.id)),
    editFlag(),
  ]);

  if (!item) {
    notFound();
  }

  return (
    <main className="container mx-auto py-6 max-w-4xl">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold tracking-tight">{item.name}</h1>
            {item.isNew && <Badge variant="secondary">New</Badge>}
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {item.description}
          </p>
          <div className="flex gap-4 pt-2">
            <Button asChild variant="default">
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Visit {item.type === "agent" ? "Agent" : "Tool"}
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
            {item.demoVideo && (
              <Button asChild variant="secondary">
                <Link
                  href={item.demoVideo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Watch Demo
                  <Youtube className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
        <Avatar className="h-20 w-20">
          <AvatarImage src={item.avatar ?? ""} alt={item.name} />
          <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>

      <Separator className="my-8" />

      {/* Main Content */}
      <div className="space-y-12">
        {/* Metadata Section */}
        <section className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Category</h2>
            <p className="text-muted-foreground">{item.category}</p>
          </div>
          {item.tags && item.tags.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Features Section */}
        {item.features && item.features.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Key Features</h2>
            <div className="grid gap-4">
              {item.features.map((feature) => (
                <div
                  key={feature.id}
                  className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium">{feature.feature}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                    {feature.timestampStart &&
                      feature.timestampEnd &&
                      item.demoVideo && (
                        <p className="text-sm text-muted-foreground">
                          <a
                            href={`${item.demoVideo}&t=${feature.timestampStart}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {feature.timestampStart}s - {feature.timestampEnd}s
                          </a>
                        </p>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Demo Video Section */}
        {item.demoVideo && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Demo</h2>
            <div className="aspect-video rounded-lg overflow-hidden bg-muted">
              <iframe
                title="Demo Video"
                src={getEmbedUrl(item.demoVideo) ?? ""}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </section>
        )}

        {/* Use Cases Section */}
        {item.whoIsItFor && item.whoIsItFor.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Who is it for?</h2>
            <ul className="grid gap-3 text-muted-foreground">
              {item.whoIsItFor?.map((who) => (
                <li key={who} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{who}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Key Benefits Section */}
      {item.keybenefits && item.keybenefits.length > 0 && (
        <section className="space-y-4 mt-4">
          <h2 className="text-xl font-semibold">Key Benefits</h2>
          <ul className="grid gap-3 text-muted-foreground">
            {item.keybenefits?.map((benefit) => (
              <li key={benefit} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Separator className="my-8" />

      {/* Footer Navigation */}
      <div className="flex justify-between items-center">
        <Button variant="ghost" asChild>
          <Link href={`/${item.type === "agent" ? "" : "tools"}`}>
            ← Back to {item.type === "agent" ? "Agents" : "Tools"}
          </Link>
        </Button>
        {canEdit && (
          <Button variant="outline" asChild>
            <Link href={`/a/${item.id}/edit`}>Edit</Link>
          </Button>
        )}
      </div>
    </main>
  );
}
