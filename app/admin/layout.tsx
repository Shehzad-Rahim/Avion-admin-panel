"use client";

import { useState, useEffect } from "react";
import { Menu, ChevronLeft, Store, Users, ShoppingCart, TrendingUp, Settings, LogOut, SofaIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter()
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/")
  }
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { icon: Store, label: 'Dashboard', href: '/admin' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
    { icon: TrendingUp, label: 'Analytics', href: '/admin/analytics' },
    { icon: SofaIcon, label: 'Products', href: '/admin/products' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-card transition-all duration-300 shadow-xl",
          collapsed ? "w-16" : "w-64",
          isMobile && collapsed && "-translate-x-full"
        )}
      >
        {!collapsed && 
        <h1 className="text-center text-xl bg-[#2a254b] text-white py-3">Avion Easy Shopping</h1>
        }
        <div className="flex h-16 items-center justify-between px-4">
          {!collapsed && <h1 className="text-xl font-bold">Admin</h1>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg p-1.5 hover:bg-accent"
          >
            {collapsed ? <Menu /> : <ChevronLeft />}
          </button>
        </div>

        <nav className="space-y-1 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-4 rounded-lg px-3 py-[10px] hover:bg-[#2a254b] hover:text-white transition-all"
            >
              <item.icon className={!collapsed ? "h-10 w-11 border py-1 px-2 bg-[#2a254b] text-white rounded-md" : ""} />
              {!collapsed && <span className="text-lg">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 w-full px-2">
          <button onClick={handleLogout} className="flex w-full items-center space-x-2 rounded-lg px-3 py-2 hover:bg-destructive hover:text-destructive-foreground">
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "transition-all duration-300",
          collapsed ? "ml-16" : "ml-64",
          isMobile && collapsed && "ml-0"
        )}
      >
        <div className="container mx-auto p-4">
          {children}
        </div>
      </main>
    </div>
  );
}