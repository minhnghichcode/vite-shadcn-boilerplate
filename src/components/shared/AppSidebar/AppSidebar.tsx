import * as React from "react";
import {
  Bot,
  Database,

  BarChart3,
  Settings,
  Braces,

  Zap,
  ChevronDown,
  LogOut,
  MessageSquare, // Added MessageSquare
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext"; // Giữ lại context của bạn
import { useTheme } from "@/components/shared/ThemeProvider/ThemeProvider"; // Giữ lại theme context
import { useToast } from "@/contexts/ToastContext"; // Giữ lại toast context
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { cn } from "@/lib/utils" // Giữ lại utils

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { addToast } = useToast();

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const userEmail = user?.email || "";
  const userAvatarSrc = user?.avatarUrl || "";

  React.useEffect(() => {
    // AuthContext quản lý user
  }, [user]);

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  const handleLogout = () => {
    logout();
    addToast("Successfully logged out", "success");
    navigate("/");
  };

  const getInitials = (nameOrEmail: string) => {
    if (!nameOrEmail) return "U";
    if (nameOrEmail.includes("@")) {
      return nameOrEmail.split("@")[0].charAt(0).toUpperCase();
    }
    return nameOrEmail.charAt(0).toUpperCase();
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/" className="flex items-center space-x-3 transition-all duration-200 hover:opacity-80 px-3 py-2">
              <div className="bg-gradient-to-br from-primary/80 to-primary p-2 rounded-lg shadow-sm">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                COPD Sense
              </span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/playground")}
                  tooltip="Playground"
                >
                  <Link to="/playground">
                    <Braces className="size-4" />
                    <span>Playground</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/chatbots")}
                  tooltip="Chatbots"
                >
                  <Link to="/chatbots">
                    <Bot className="size-4" />
                    <span>Chatbots</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/models")}
                  tooltip="Models"
                >
                  <Link to="/models">
                    <Zap className="size-4" />
                    <span>Models</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/knowledge-base")}
                  tooltip="Knowledge Base"
                >
                  <Link to="/knowledge-base">
                    <Database className="size-4" />
                    <span>Knowledge Base</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/documentation")} tooltip="Documentation">
                  <Link to="/documentation">
                    <BookOpen className="size-4" />
                    <span>Documentation</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/settings")}
                  tooltip="Settings"
                >
                  <Link to="/settings">
                    <Settings className="size-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Report</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard")}
                  tooltip="Dashboard"
                >
                  <Link to="/dashboard">
                    <BarChart3 className="size-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t  "> 
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* Nút này trong code gốc không có class đặc biệt như header */}
              <SidebarMenuButton className="w-full justify-start">
                <Avatar className="size-7 mr-2"> 
                  <AvatarImage src={userAvatarSrc} alt={displayName} />
                   {/* Giữ lại fallback style của bạn hoặc điều chỉnh nếu cần */}
                  <AvatarFallback className="bg-primary/10 text-primary">
                     {getInitials(displayName)} 
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start gap-0.5 leading-none">
                  <span className="font-medium text-sm">{displayName}</span>
                  <span className="text-xs text-muted-foreground">{userEmail}</span>
                </div>
                <ChevronDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            {/* Nội dung dropdown giữ nguyên */}
            <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]" align="end"> 
              <DropdownMenuItem asChild>
                <Link to="/profile"> 
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/account-settings"> 
                  <span>Account Settings</span>
                </Link>
              </DropdownMenuItem>
              {setTheme && ( 
                <DropdownMenuItem onClick={() => {
                  setTheme(theme == "light" ? "dark" : "light")
                }}>
                  <span>Change Theme</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}> 
                <LogOut className="mr-2 h-4 w-4" /> 
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
        
    <SidebarRail />
    </Sidebar>
  );
}
