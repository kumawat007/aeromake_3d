import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Cpu, Sun, Moon, Monitor, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cartStore";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navLinks = [
  { label: "Shop", href: "#products" },
  { label: "3D Services", href: "#services" },
  { label: "Parts", href: "#parts" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleCart, totalItems } = useCartStore();
  const { theme, setTheme } = useTheme();
  const { user, logoutMutation } = useAuth();
  const itemCount = totalItems();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cycleTheme = () => {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("system");
    else setTheme("dark");
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
        }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0 cursor-pointer" data-testid="link-logo">
            <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold text-lg tracking-tight text-foreground">
              Aero<span className="text-primary">Make</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-sm text-muted-foreground transition-colors rounded-md hover-elevate"
                data-testid={`link-${link.label.toLowerCase().replace(" ", "-")}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center mr-2">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-bold">Dynamic Theme Toggle</span>
            </div>
            <button
              onClick={cycleTheme}
              className="group relative flex items-center h-9 w-24 rounded-full bg-secondary/50 border border-border/50 p-1 transition-all duration-500 hover:border-primary/50 hover:bg-secondary/80 overflow-hidden shadow-inner"
              title={`Theme: ${theme}`}
              data-testid="button-theme-toggle"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <motion.div
                layout
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={`flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.3)] z-10 ${theme === "dark" ? "translate-x-14" : theme === "system" ? "translate-x-7" : "translate-x-0"
                  }`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? <Moon className="w-4 h-4" /> : theme === "system" ? <Monitor className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <div className="absolute inset-0 flex items-center justify-around px-3 pointer-events-none">
                <Sun className={`w-3.5 h-3.5 transition-all duration-500 ${theme === "light" ? "text-primary opacity-100 scale-110" : "text-muted-foreground/30 opacity-50"}`} />
                <Monitor className={`w-3.5 h-3.5 transition-all duration-500 ${theme === "system" ? "text-primary opacity-100 scale-110" : "text-muted-foreground/30 opacity-50"}`} />
                <Moon className={`w-3.5 h-3.5 transition-all duration-500 ${theme === "dark" ? "text-primary opacity-100 scale-110" : "text-muted-foreground/30 opacity-50"}`} />
              </div>
            </button>

            <Button
              size="icon"
              variant="ghost"
              onClick={toggleCart}
              className="relative"
              data-testid="button-cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center px-1" data-testid="badge-cart-count">
                  {itemCount}
                </span>
              )}
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.username}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        User ID: {user.id.slice(0, 8)}...
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logoutMutation.mutate()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button size="sm" variant="outline" className="hidden md:flex">
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}

            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>


      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-3 text-sm text-muted-foreground rounded-md text-left hover-elevate"
                  data-testid={`mobile-link-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
