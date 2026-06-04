import { FC } from "react";
import { Button } from "../ui/button";
import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { Logo } from "@/components/logo";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className=" border-t bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:flex md:items-center md:justify-between">
          <Logo iconSize={32} showText={true} />

          <div className="flex mt-8 space-x-6 md:mt-0 md:hidden">
            {/* social accounts */}
            <Button variant={"ghost"} size={"icon"}>
              <LinkedInLogoIcon className="w-5 h-5" />
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <TwitterLogoIcon className="w-5 h-5" />
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <InstagramLogoIcon className="w-5 h-5" />
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <DiscordLogoIcon className="w-5 h-5" />
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <GitHubLogoIcon className="w-5 h-5" />
            </Button>
          </div>
          <div className=" hidden md:flex space-x-6 mt-8 md:mt-0 ">
            {/* social accounts */}
            <Button variant={"ghost"}>LinkedIn</Button>
            <Button variant={"ghost"}>Twitter</Button>
            <Button variant={"ghost"}>Instagram</Button>
            <Button variant={"ghost"}>Discord</Button>
            <Button variant={"ghost"}>GitHub</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:flex md:items-center md:justify-between">
          <div className="flex mt-8 space-x-6 md:mt-0">
            <p className="text-base text-muted-foreground">
              Copyright © 2023. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
