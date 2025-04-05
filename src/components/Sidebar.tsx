
import React from "react";
import { cn } from "@/lib/utils";
import { 
  LayoutGrid, 
  Building2, 
  ShoppingBag, 
  Users, 
  BarChart2, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <div className={cn("h-screen bg-sidebar py-4 w-64 flex flex-col", className)}>
      <div className="px-4 py-2 flex items-center">
        <Button variant="ghost" size="icon" className="mr-2 lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center">
          <div className="h-7 w-7 bg-rhombus-purple rounded flex items-center justify-center">
            <div className="h-3 w-3 bg-white rotate-45"></div>
          </div>
          <h1 className="text-xl font-semibold ml-2">Rhombus</h1>
        </div>
      </div>
      
      <nav className="mt-8 px-2 flex-1">
        <SidebarItem icon={<LayoutGrid size={20} />} label="Overview" isActive />
        <SidebarItem icon={<Building2 size={20} />} label="Companies" />
        <SidebarItem icon={<ShoppingBag size={20} />} label="Deals" hasSubmenu />
        <SidebarItem icon={<Users size={20} />} label="Contacts" />
        <SidebarItem icon={<BarChart2 size={20} />} label="Reports" hasSubmenu />
        <SidebarItem icon={<Calendar size={20} />} label="Calendar" />
        <SidebarItem icon={<MessageSquare size={20} />} label="Message" badge="3" />
        <SidebarItem icon={<FileText size={20} />} label="Documents" />
      </nav>
      
      <div className="mt-auto px-4 py-3">
        <div className="text-xs font-medium">Rhombus UI Kit</div>
        <div className="text-xs text-gray-500 mt-1">
          Want to get more info<br />
          about Rhombus? <span className="text-rhombus-purple cursor-pointer">Contact us</span>
        </div>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  badge, 
  isActive = false,
  hasSubmenu = false,
}) => {
  return (
    <div 
      className={cn(
        "flex items-center px-3 py-2 my-1 rounded-md transition-colors",
        isActive 
          ? "bg-rhombus-purple/10 text-rhombus-purple" 
          : "text-gray-700 hover:bg-gray-200/50"
      )}
    >
      <div className="mr-3">{icon}</div>
      <span className="flex-1">{label}</span>
      {badge && (
        <div className="bg-rhombus-purple text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {badge}
        </div>
      )}
      {hasSubmenu && (
        <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24">
          <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
      )}
    </div>
  );
};

export default Sidebar;
