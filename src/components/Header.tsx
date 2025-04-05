
import React from "react";
import { cn } from "@/lib/utils";
import { Search, HelpCircle, Bell, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  user: {
    name: string;
    role: string;
    avatar?: string;
  };
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ user, className }) => {
  return (
    <div className={cn("flex items-center justify-between py-4 px-6", className)}>
      <div className="w-full max-w-md hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rhombus-purple/20 focus:border-rhombus-purple"
          />
        </div>
      </div>

      <div className="flex items-center ml-auto">
        <Button variant="ghost" size="icon" className="text-gray-500">
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-500 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>
        <div className="ml-4 flex items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar || "/lovable-uploads/1be30484-5a32-4c73-a56d-92fdf24334bc.png"} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-2 text-sm hidden md:block">
            <div className="font-medium">{user.name}</div>
            <div className="text-xs text-gray-500">{user.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
