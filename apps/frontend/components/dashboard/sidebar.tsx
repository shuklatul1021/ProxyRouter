"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Network,
  LayoutDashboard,
  Key,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  HelpCircle,
  Book,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { UserInterface } from "@/api/auth/auth";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "API Keys", href: "/dashboard/keys", icon: Key },
  { name: "Usage", href: "/dashboard/usage", icon: BarChart3 },
  { name: "Credits", href: "/dashboard/credits", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const secondaryNavigation = [
  { name: "Documentation", href: "/docs", icon: Book },
  { name: "Help & Support", href: "/support", icon: HelpCircle },
];

function SidebarContent({ onNavigate, user }: { onNavigate?: () => void, user : UserInterface | null}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-[#262626] px-6">
        <Link href="/" className="flex items-center gap-2" onClick={onNavigate}>
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#262626] bg-[#141414] text-[#ededef]">
            <Network className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold text-[#ededef]">
            ProxyRouter
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white text-black"
                    : "text-zinc-500 hover:bg-white/5 hover:text-white",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="my-4 h-px bg-white/10" />

        <div className="space-y-1">
          {secondaryNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-500 transition-colors hover:bg-white/5 hover:text-white"
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Credits Display */}
      <div className="border-t border-white/10 p-4">
        <div className="rounded-md border border-white/10 bg-white/[0.04] p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">Credits</span>
            <Link
              href="/dashboard/credits"
              className="text-xs text-white hover:underline"
              onClick={onNavigate}
            >
              Add more
            </Link>
          </div>
          <p className="mt-1 text-2xl font-semibold text-white">${user?.credit.creditAmount || "0"}</p>
          <p className="text-xs text-zinc-500">
            ~2.4M tokens remaining
          </p>
        </div>
      </div>
    </div>
  );
}

export function DashboardSidebar({ user } : { user : UserInterface | null}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-white/10 bg-black lg:block">
        <SidebarContent user={user || null} />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-50 text-zinc-100 hover:bg-white/5"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 border-white/10 bg-black p-0">
          <SidebarContent onNavigate={() => setIsOpen(false)} user={user || null} />
        </SheetContent>
      </Sheet>
    </>
  );
}

export function DashboardHeader({ user } : { user : UserInterface | null}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-black/80 px-6 backdrop-blur-xl lg:justify-end">
      {/* Mobile spacer for hamburger menu */}
      <div className="w-10 lg:hidden" />

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-2 text-zinc-200 hover:bg-white/5">
            <Avatar className="h-8 w-8 border border-white/15">
              <AvatarImage src="/avatar.png" alt="User" />
              <AvatarFallback className="bg-white text-black">
                {user?.name[0]}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline">{user?.name}</span>
            <ChevronDown className="h-4 w-4 text-zinc-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 border-white/10 bg-zinc-950 text-zinc-100"
        >
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span>{user?.name}</span>
              <span className="text-sm font-normal text-zinc-500">
                {user?.email}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/docs">
              <Book className="mr-2 h-4 w-4" />
              Documentation
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
