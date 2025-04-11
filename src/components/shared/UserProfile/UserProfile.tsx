import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { LogOut, User, ChevronDown, Settings, LayoutDashboard, UserCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/contexts/ToastContext";

export function UserProfile() {
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  if (!user) return null;
  
  const handleLogout = () => {
    logout();
    addToast("Successfully logged out", "success");
    window.location.href = '/';
  };

  const getInitials = (email: string) => {
    // Extract first letter of name part of email
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase();
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="bg-primary/10 h-9 w-9 rounded-full flex items-center justify-center overflow-hidden text-primary font-medium">
          {getInitials(user.email)}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium truncate max-w-[150px]">{user.email}</p>
          <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
        </div>
        <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 hidden md:block" 
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-card border border-border overflow-hidden z-50 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="p-3 border-b border-border">
            <p className="text-sm font-medium truncate">{user.email}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
          </div>
          
          <nav className="py-2">
            <Link 
              to="/dashboard"
              className="flex items-center px-4 py-2 text-sm hover:bg-muted transition-colors w-full text-left"
              onClick={() => setIsOpen(false)}
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
            <Link 
              to="/profile" 
              className="flex items-center px-4 py-2 text-sm hover:bg-muted transition-colors w-full text-left"
              onClick={() => setIsOpen(false)}
            >
              <UserCircle className="h-4 w-4 mr-2" />
              Profile
            </Link>
            <Link 
              to="/settings" 
              className="flex items-center px-4 py-2 text-sm hover:bg-muted transition-colors w-full text-left"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </nav>
          
          <div className="border-t border-border p-2">
            <button 
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors rounded-md w-full text-left"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
