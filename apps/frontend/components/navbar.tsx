"use client";

import Link from "next/link";
import { Menu, Network } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const products = [
  { name: "Model Catalog", detail: "Search hundreds of models and providers" },
  { name: "Routing API", detail: "One OpenAI-compatible endpoint" },
  { name: "Usage Analytics", detail: "Requests, tokens, latency, and spend" },
  { name: "Provider Controls", detail: "Fallbacks, BYOK, budgets, and policies" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/15 bg-white/[0.06] text-white">
            <Network className="h-5 w-5" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-white">
            OpenRouter
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-zinc-300 hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white">
                  Product
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[420px] gap-2 border border-white/10 bg-zinc-950 p-4">
                    {products.map((product) => (
                      <NavigationMenuLink
                        key={product.name}
                        href="/dashboard"
                        className="rounded-md p-3 text-zinc-200 hover:bg-white/5"
                      >
                        <p className="font-medium text-white">{product.name}</p>
                        <p className="mt-1 text-sm text-zinc-500">
                          {product.detail}
                        </p>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white focus:outline-none">
                    Docs
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white focus:outline-none">
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/auth/login">
            <Button variant="ghost" className="text-zinc-300 hover:bg-white/5">
              Log in
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="rounded-md bg-white font-semibold text-black hover:bg-zinc-200">
              Get Started
            </Button>
          </Link>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-100 hover:bg-white/5"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] border-white/10 bg-black text-white"
          >
            <div className="flex flex-col gap-6 pt-6">
              <Link
                href="/dashboard"
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                Product
              </Link>
              <Link
                href="/docs"
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                Docs
              </Link>
              <Link
                href="/pricing"
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <div className="flex flex-col gap-3 pt-4">
                <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-zinc-700 bg-black text-zinc-100"
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-white font-semibold text-black hover:bg-zinc-200">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
