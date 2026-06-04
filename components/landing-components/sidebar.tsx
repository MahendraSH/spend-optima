"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { FC } from "react";
import { Button } from "../ui/button";
import { Logo } from "@/components/logo";

import Link from "next/link";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"outline"} size={"icon"}>
            <DotsHorizontalIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>
              <Logo iconSize={28} showText={true} />
            </SheetTitle>
            <nav className="flex flex-col gap-4 mt-6">
              <Link href="#features" className="w-full">
                <Button variant={"ghost"} size={"lg"} className="w-full justify-start font-medium text-base rounded-xl">
                  Features
                </Button>
              </Link>
              <Link href="#about" className="w-full">
                <Button variant={"ghost"} size={"lg"} className="w-full justify-start font-medium text-base rounded-xl">
                  About Us
                </Button>
              </Link>
              <Link href="#cta" className="w-full">
                <Button variant={"ghost"} size={"lg"} className="w-full justify-start font-medium text-base rounded-xl">
                  Get Started
                </Button>
              </Link>
            </nav>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
