import "@/app/styles/globals.css";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Roboto as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "300", "400", "500", "700", "900"],
});
interface RootLayoutProps {
  children: React.ReactNode;
}
//  meta title, description
export const metadata: Metadata = {
  title: "SpendOptima - Advanced Procurement & Spend Analysis Software",
  description: "Optimize your procurement processes, streamline purchase orders, and perform advanced spend analysis with SpendOptima.",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://example.com"),

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "SpendOptima - Advanced Procurement & Spend Analysis Software",
    description: "Optimize your procurement processes, streamline purchase orders, and perform advanced spend analysis with SpendOptima.",
    url: "https://example.com",
    siteName: "SpendOptima",
    images: [
      {
        url: "https://example.com/image.png",
        width: 800,
        height: 600,
        alt: "SpendOptima Open Graph Image",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    title: "SpendOptima - Advanced Procurement & Spend Analysis Software",
    description: "Optimize your procurement processes, streamline purchase orders, and perform advanced spend analysis with SpendOptima.",
    card: "summary_large_image",
    site: "@SpendOptima",
    creator: "@SpendOptima",
  },
  // favicons: ["favicon.ico", "favicon-16x16.png", "favicon-32x32.png", "apple-touch-icon.png", "android-chrome-192x192.png", "android-chrome-512x512.png", "safari-pinned-tab.svg", "favicon.ico"],
};
export default function RootLayout({ children }: RootLayoutProps) {
  const buttonPrimaryClass = cn(
    buttonVariants({ variant: "default", size: "lg" })
  );
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background text-foreground font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider
            appearance={{
              layout: {
                logoImageUrl: "/logo.svg",
                // helpPageUrl: "/help",
                // termsPageUrl: "/terms",
                // privacyPageUrl: "/privacy",
              },
              elements: {
                formButtonPrimary: buttonPrimaryClass,
                socialButtonsBlockButton: buttonVariants({
                  variant: "ghost",
                  size: "lg",
                }),
                formButtonReset: buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
                input: "bg-input text-foreground p-4",

                card: "bg-card text-card-foreground shadow-sm rounded-lg",
                logoImage: "rounded-full",
                logoBox: "rounded-full",
                navbarButton: buttonVariants({ variant: "ghost", size: "lg" }),
              },
            }}
          >
            {children}
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
