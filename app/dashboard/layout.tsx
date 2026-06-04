"use client";
import Link from "next/link";
import { Menu, MenuIcon, Package, Search, SettingsIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import SearchBox from "@/components/dashboard/searchbox";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <Logo iconSize={28} showText={true} />
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/dashboard/spend-analysis"
                className={cn(
                  "flex items-center gap-3 rounded-lg  px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname.includes("/spend-analysis") &&
                    " text-primary bg-muted",
                )}
              >
                <Package className="h-4 w-4" />
                Spend Analysis
              </Link>
              <Link
                href="/dashboard/projects"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname.includes("/projects") && "bg-muted text-primary",
                )}
              >
                <Package className="h-4 w-4" />
                All Projects
              </Link>
              <Link
                href="/dashboard/settings"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname.includes("/settings") && "bg-muted text-primary",
                )}
              >
                <SettingsIcon className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link href="/" className="mb-4 hover:opacity-90 transition-opacity">
                  <Logo iconSize={28} showText={true} />
                </Link>
                <Link
                  href="/dashboard/spend-analysis"
                  className={cn(
                    "flex items-center gap-3 rounded-lg  px-1 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname.includes("/spend-analysis") &&
                      " text-primary bg-muted",
                  )}
                >
                  <Package className="h-4 w-4" />
                  Spend Analysis
                </Link>
                <Link
                  href="/dashboard/projects"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-1 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname.includes("/projects") && "bg-muted text-primary",
                  )}
                >
                  <Package className="h-4 w-4" />
                  All Projects
                </Link>
                <Link
                  href="/dashboard/settings"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-1 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname.includes("/settings") && "bg-muted text-primary",
                  )}
                >
                  <SettingsIcon className="h-4 w-4" />
                  Settings
                </Link>
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <SearchBox />
          </div>
          <ThemeToggle />
          <UserButton />{" "}
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
