import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  Dumbbell,
  Apple,
  Moon,
  BarChart3,
  Settings,
  Sparkles,
  Search,
  Bell,
  Menu,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { AuroraBackground } from "./aurora-background";

const navGroups = [
  {
    label: "Overview",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Loops",
    items: [
      { to: "/placement", label: "Placement", icon: Briefcase },
      { to: "/projects", label: "Projects", icon: FolderKanban },
      { to: "/fitness", label: "Fitness", icon: Dumbbell },
      { to: "/nutrition", label: "Nutrition", icon: Apple },
      { to: "/recovery", label: "Recovery", icon: Moon },
    ],
  },
  {
    label: "Account",
    items: [{ to: "/settings", label: "Settings", icon: Settings }],
  },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full">
      <AuroraBackground />

      <div className="relative flex min-h-screen w-full">
        {/* Sidebar — desktop */}
        <Sidebar pathname={pathname} />

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-background/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-72 animate-rise-in">
              <Sidebar pathname={pathname} onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="sticky top-0 z-20 border-b border-border/40 bg-background/40 backdrop-blur-xl">
            <div className="flex items-center gap-3 px-4 sm:px-6 lg:px-10 h-14">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden grid h-9 w-9 place-items-center rounded-lg border border-border/60 bg-white/5"
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </button>
              <Link to="/" className="flex items-center gap-2 lg:hidden">
                <LoopMark />
                <span className="font-display font-semibold">MyDayLoop</span>
              </Link>

              <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
                <div className="flex items-center gap-2 w-full rounded-xl border border-border/60 bg-white/[0.04] px-3 py-1.5 text-sm text-muted-foreground">
                  <Search className="h-3.5 w-3.5" />
                  <span className="truncate">Search loops, tasks, projects…</span>
                  <kbd className="ml-auto rounded-md border border-border/60 bg-white/5 px-1.5 py-0.5 text-[10px]">
                    ⌘K
                  </kbd>
                </div>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <button
                  className="relative grid h-9 w-9 place-items-center rounded-lg border border-border/60 bg-white/5 hover:bg-white/10 transition"
                  aria-label="Notifications"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                </button>
                <div className="hidden sm:flex items-center gap-2 rounded-full border border-border/60 bg-white/5 pl-1 pr-3 py-1">
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-primary to-loop-recovery text-[11px] font-semibold text-primary-foreground">
                    R
                  </div>
                  <div className="text-xs">
                    <div className="font-medium leading-tight">Rahul</div>
                    <div className="text-muted-foreground leading-tight">Pro</div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-10 animate-rise-in">{children}</main>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <aside className="flex h-full w-72 lg:w-64 shrink-0 flex-col border-r border-border/40 bg-sidebar/70 backdrop-blur-xl">
      <Link to="/" onClick={onNavigate} className="flex items-center gap-2.5 px-6 py-5">
        <LoopMark />
        <div className="leading-tight">
          <div className="font-display text-[15px] font-semibold tracking-tight">MyDayLoop</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Growth OS
          </div>
        </div>
      </Link>

      <div className="ring-divider mx-6" />

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((g) => (
          <div key={g.label}>
            <div className="px-3 pb-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
              {g.label}
            </div>
            <div className="space-y-0.5">
              {g.items.map((n) => {
                const active = pathname === n.to || pathname.startsWith(n.to + "/");
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={onNavigate}
                    className={`group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                      active
                        ? "text-foreground bg-white/[0.06]"
                        : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                    }`}
                  >
                    {active && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full bg-gradient-to-b from-primary to-loop-recovery" />
                    )}
                    <n.icon
                      className={`h-4 w-4 transition ${
                        active ? "text-primary" : "group-hover:text-foreground"
                      }`}
                    />
                    <span className="truncate">{n.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="m-3 rounded-2xl glass p-4 relative overflow-hidden">
        <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/30 blur-2xl" />
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <Sparkles className="h-3 w-3 text-primary" />
          Pro tip
        </div>
        <p className="mt-2 text-[13px] leading-snug text-foreground/90">
          Close your loop before 11:30 PM to keep your streak alive.
        </p>
      </div>
    </aside>
  );
}

export function LoopMark({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-8 w-8 ${className}`}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-loop-recovery to-loop-fitness opacity-90 animate-pulse-ring" />
      <div className="absolute inset-[3px] rounded-full bg-background" />
      <div className="absolute inset-[7px] rounded-full bg-gradient-to-br from-primary to-loop-fitness" />
    </div>
  );
}
