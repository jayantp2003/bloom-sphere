"use client"

import type React from "react"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Bell,
  Brain,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  History,
  Home,
  LogOut,
  MenuIcon,
  Settings,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const NavItem = ({
    href,
    icon: Icon,
    children,
  }: {
    href: string
    icon: React.ElementType
    children: React.ReactNode
  }) => {
    const active = isActive(href)

    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent",
                active ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                collapsed && "justify-center px-2.5",
              )}
            >
              <Icon className={cn("h-5 w-5", active && "text-primary")} />
              {!collapsed && <span>{children}</span>}
            </Link>
          </TooltipTrigger>
          {collapsed && <TooltipContent side="right">{children}</TooltipContent>}
        </Tooltip>
      </TooltipProvider>
    )
  }

  const NavSection = ({ title, children }: { title?: string; children: React.ReactNode }) => (
    <div className="mb-6">
      {title && !collapsed && (
        <h3 className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  )

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Desktop */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r bg-background transition-all duration-300 sticky top-0 h-screen",
          collapsed ? "w-[70px]" : "w-64",
        )}
      >
        <div className="flex h-14 items-center border-b px-4 justify-between">
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Bloomsphere</span>
            </Link>
          )}
          {collapsed && <Brain className="h-6 w-6 text-primary mx-auto" />}
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="space-y-6 px-3">
            <NavSection title="Dashboard">
              <NavItem href="/dashboard" icon={Home}>
                Overview
              </NavItem>
            </NavSection>

            <NavSection title="Question Tools">
              <NavItem href="/dashboard/generate" icon={FileText}>
                Smart Paper Generation
              </NavItem>
              <NavItem href="/dashboard/evaluate" icon={Brain}>
                Cognitive Analysis
              </NavItem>
              <NavItem href="/dashboard/analytics" icon={BarChart3}>
                Learning Analytics
              </NavItem>
            </NavSection>

            <NavSection title="Account">
              <NavItem href="/dashboard/history" icon={History}>
                History
              </NavItem>
              <NavItem href="/dashboard/credits" icon={CreditCard}>
                Credits
              </NavItem>
              <NavItem href="/dashboard/settings" icon={Settings}>
                Settings
              </NavItem>
            </NavSection>
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
          <Link href="/login">
            <Button
              variant="outline"
              className={cn("gap-2", collapsed ? "w-10 p-0 justify-center" : "w-full justify-start")}
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span>Log out</span>}
            </Button>
          </Link>
        </div>
      </aside>

      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center px-4 md:px-6 gap-4">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden mr-2">
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex h-14 items-center border-b px-4">
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <Brain className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold">Bloomsphere</span>
                  </Link>
                </div>
                <div className="flex-1 overflow-auto py-4">
                  <nav className="space-y-6 px-3">
                    <div className="mb-6">
                      <h3 className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Dashboard
                      </h3>
                      <div className="space-y-1">
                        <Link
                          href="/dashboard"
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
                            isActive("/dashboard") ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                          )}
                        >
                          <Home className={cn("h-5 w-5", isActive("/dashboard") && "text-primary")} />
                          <span>Overview</span>
                        </Link>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Question Tools
                      </h3>
                      <div className="space-y-1">
                        <Link
                          href="/dashboard/generate"
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
                            isActive("/dashboard/generate")
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          <FileText className={cn("h-5 w-5", isActive("/dashboard/generate") && "text-primary")} />
                          <span>Smart Paper Generation</span>
                        </Link>
                        <Link
                          href="/dashboard/evaluate"
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
                            isActive("/dashboard/evaluate")
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          <Brain className={cn("h-5 w-5", isActive("/dashboard/evaluate") && "text-primary")} />
                          <span>Cognitive Analysis</span>
                        </Link>
                        <Link
                          href="/dashboard/analytics"
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
                            isActive("/dashboard/analytics")
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          <BarChart3 className={cn("h-5 w-5", isActive("/dashboard/analytics") && "text-primary")} />
                          <span>Learning Analytics</span>
                        </Link>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Account
                      </h3>
                      <div className="space-y-1">
                        <Link
                          href="/dashboard/history"
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
                            isActive("/dashboard/history")
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          <History className={cn("h-5 w-5", isActive("/dashboard/history") && "text-primary")} />
                          <span>History</span>
                        </Link>
                        <Link
                          href="/dashboard/credits"
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
                            isActive("/dashboard/credits")
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          <CreditCard className={cn("h-5 w-5", isActive("/dashboard/credits") && "text-primary")} />
                          <span>Credits</span>
                        </Link>
                        <Link
                          href="/dashboard/settings"
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
                            isActive("/dashboard/settings")
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          <Settings className={cn("h-5 w-5", isActive("/dashboard/settings") && "text-primary")} />
                          <span>Settings</span>
                        </Link>
                      </div>
                    </div>
                  </nav>
                </div>
                <div className="mt-auto p-4 border-t">
                  <Link href="/login">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <LogOut className="h-4 w-4" />
                      Log out
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2 md:hidden">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Bloomsphere</span>
            </div>

            <div className="ml-auto flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium">100 Credits</div>
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <img src="/mystical-forest-spirit.png" alt="User avatar" className="h-8 w-8 rounded-full" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/credits">Credits</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/login">Log out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <div className="container py-6 px-4 md:px-6 md:py-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
