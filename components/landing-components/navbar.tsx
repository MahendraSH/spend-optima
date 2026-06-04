import { FC } from "react";
import { Button } from "../ui/button";
import Sidebar from "./sidebar";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const { userId } = auth();
  return (
    <div
      className="flex justify-between items-center w-full px-6 py-4 min-h-20 bg-background/85 backdrop-blur-md border-b border-border/40 fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <Link href="/" className="hover:opacity-90 transition-opacity">
        <Logo iconSize={32} showText={true} />
      </Link>
      
      <nav
        className="hidden md:flex gap-x-1 justify-end items-center ml-auto bg-muted/60 border border-border/20 text-card-foreground rounded-full p-1.5"
      >
        <Link href="#features" className="rounded-full px-5 py-1.5 text-sm font-medium hover:bg-background/80 transition-colors">
          Features
        </Link>
        <Link href="#about" className="rounded-full px-5 py-1.5 text-sm font-medium hover:bg-background/80 transition-colors">
          About Us
        </Link>
        <Link href="#cta" className="rounded-full px-5 py-1.5 text-sm font-medium hover:bg-background/80 transition-colors">
          Get Started
        </Link>
      </nav>

      <div className="hidden md:flex items-center gap-4 ml-6">
        <ThemeToggle />
        {!userId ? (
          <>
            <Link href="/sign-in">
              <Button variant="ghost" className="font-medium">
                Login
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="font-semibold shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-200 rounded-full px-6">
                Start Free Trial
              </Button>
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/dashboard/spend-analysis">
              <Button className="font-semibold shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-200 rounded-full px-6">
                Dashboard
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
      </div>

      <nav
        className="flex md:hidden gap-x-3 justify-end items-center ml-auto bg-muted/60 text-card-foreground rounded-full p-1"
      >
        <ThemeToggle />
        {!userId ? (
          <Link href="/sign-in">
            <Button variant={"ghost"} size={"sm"} className="rounded-full px-4">
              Log in
            </Button>
          </Link>
        ) : (
          <UserButton
            afterMultiSessionSingleSignOutUrl="/"
            afterSignOutUrl="/"
          />
        )}
        <Sidebar />
      </nav>
    </div>
  );
};

export default Navbar;
