"use client";

import { Button } from "@/components/ui/button";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/nextjs";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Workflow",
    link: "#workflow",
  },
  {
    name: "Explore",
    link: "#explore",
  },
];

const AppNavbar = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <Link href="/" className="flex items-center space-x-1">
          <Image src={"/logo-bg.png"} alt="logo" height={60} width={60} />
          <span className="text-xl font-semibold text-foreground">Cooksy</span>
        </Link>
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          {isLoaded && !isSignedIn && (
            <SignInButton mode="redirect">
              <Button size={"sm"} className=" rounded-full z-10">
                Get Started
                <ChevronRight />
              </Button>
            </SignInButton>
          )}

          {isLoaded && isSignedIn && (
            <>
              <Button size={"sm"} className=" rounded-full z-10" asChild>
                <Link href="/dashboard">
                  Dashboard
                  <ChevronRight />
                </Link>
              </Button>
              <UserButton />
            </>
          )}
        </div>
      </NavBody>
      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <Link href="/" className="flex items-center space-x-1">
            <Image src={"/logo-bg.png"} alt="logo" height={60} width={60} />
            <span className="text-xl font-semibold text-foreground">
              Cooksy
            </span>
          </Link>
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}>
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300">
              <span className="block">{item.name}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4">
            {isLoaded && !isSignedIn && (
              <SignInButton mode="redirect">
                <Button size={"sm"} className=" rounded-full z-10">
                  Get Started
                  <ChevronRight />
                </Button>
              </SignInButton>
            )}

            {isLoaded && isSignedIn && (
              <>
                <Button size={"sm"} className=" rounded-full z-10" asChild>
                  <Link href="/dashboard">
                    Dashboard
                    <ChevronRight />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

export default AppNavbar;
