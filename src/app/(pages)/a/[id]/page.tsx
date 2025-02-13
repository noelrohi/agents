import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/db";
import { items } from "@/db/schema";
import { getEmbedUrl } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { ExternalLink, Youtube } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const item = await db.query.items.findFirst({
    where: eq(items.id, Number.parseInt(params.id)),
  });

  if (!item) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: `${item.name} - ${item.type === "agent" ? "Agent" : "Tool"}`,
    description: item.description,
  };
}

export default async function ItemPage(props: Props) {
  const params = await props.params;
  const item = await db.query.items.findFirst({
    where: eq(items.id, Number.parseInt(params.id)),
  });

  if (!item) {
    notFound();
  }

  return (
    <main className="container mx-auto py-6 space-y-8">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight flex items-center gap-4">
            {item.name}
            {item.isNew && <Badge variant="secondary">New</Badge>}
          </h1>
          <p className="text-muted-foreground">{item.description}</p>
        </div>
        <Avatar className="h-16 w-16">
          <AvatarImage src={item.avatar ?? ""} alt={item.name} />
          <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-2">Links</h2>
                <div className="space-y-2">
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm hover:underline"
                  >
                    Visit {item.type === "agent" ? "Agent" : "Tool"}
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                  {item.demoVideo && (
                    <Link
                      href={item.demoVideo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm hover:underline text-red-500"
                    >
                      Watch Demo
                      <Youtube className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Category</h2>
                <p className="text-sm text-muted-foreground">{item.category}</p>
              </div>

              {item.tags && item.tags.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {item.demoVideo && (
          <Card>
            <CardContent className="pt-6">
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  title="Demo Video"
                  src={getEmbedUrl(item.demoVideo) ?? ""}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex justify-between items-center">
        <Button variant="outline" asChild>
          <Link href={`/${item.type === "agent" ? "" : "tools"}`}>
            ← Back to {item.type === "agent" ? "Agents" : "Tools"}
          </Link>
        </Button>
      </div>
    </main>
  );
}
