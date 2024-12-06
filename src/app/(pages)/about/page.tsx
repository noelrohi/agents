import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About - AI Agent Directory",
  description: "Learn more about the AI Agent Directory",
};

export default function AboutPage() {
  return (
    <main className="container mx-auto py-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold font-heading tracking-tight">
          About
        </h1>
        <p className="text-sm text-muted-foreground">
          Learn more about the AI Agent Directory project
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>What is AI Agent Directory?</CardTitle>
            <CardDescription>
              A curated collection of AI agents and tools
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              AI Agent Directory is an open-source project that aims to help
              people discover and explore the growing ecosystem of AI agents. We
              curate and categorize various AI tools, platforms, and agents to
              make them easily discoverable.
            </p>
            <p className="text-sm">
              Whether you&apos;re looking for coding assistants, writing tools,
              or creative AI agents, our directory helps you find the right tool
              for your needs.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contributing</CardTitle>
            <CardDescription>Help us grow the directory</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              We welcome contributions from the community! If you know of an AI
              agent that should be included in our directory, you can submit it
              through our GitHub repository.
            </p>
            <div className="flex items-center gap-2">
              <Link
                href="https://github.com/noelrohi/aigent/issues/new?assignees=&labels=&projects=&template=new-ai-agent.md&title=%5BAI+Agent+Name%5D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm hover:underline"
              >
                Submit an AI Agent
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stay Updated</CardTitle>
            <CardDescription>
              Get notified about new AI agents and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Subscribe to our newsletter to stay informed about new AI agents,
              updates to existing ones, and trends in the AI agent ecosystem. We
              respect your privacy and will only send relevant updates.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
