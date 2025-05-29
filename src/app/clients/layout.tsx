import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./_components/app-sidebar";
import GithubLogo from "@/components/layout/github-logo";
import ThemeToggle from "@/components/layout/theme-toggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <div className="w-full min-h-[85vh]">
        <header className="flex items-center justify-between max-w-11/12 p-2">
          <SidebarTrigger />
          <nav className="flex gap-2 items-center">
            <ThemeToggle />
            <GithubLogo />
          </nav>
        </header>
        {children}
      </div>
    </SidebarProvider>
  );
}
