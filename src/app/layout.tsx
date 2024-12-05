import localFont from "next/font/local";
import "./globals.css";

const fontSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
});

const fontMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
});

const fontHeading = localFont({
  src: "./fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

export const metadata = {
  title: "AI Agent Directory",
  description:
    "A directory of AI agents that can perform tasks without human effort",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${fontHeading.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <main className="min-h-screen bg-background">{children}</main>
      </body>
    </html>
  );
}
