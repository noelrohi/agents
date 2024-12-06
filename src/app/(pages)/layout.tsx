import { AppSidebar } from "@/components/app-sidebar";
import { InputWithButton } from "@/components/input-with-button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
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
              <ThemeToggle />
            </nav>
          </div>
        </header>

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
