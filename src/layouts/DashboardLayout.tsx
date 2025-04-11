import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/AppSidebar/AppSidebar";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/shared/ThemeProvider/ThemeProvider";

export default function Layout() {
  return (
    <ThemeProvider defaultTheme="system" >
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <AppSidebar />
          <div className="flex-1 overflow-auto w-full">
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
