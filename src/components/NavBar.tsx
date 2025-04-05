import React from "react";
import { Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom"; // Import NavLink for active routing

const NavBar = () => {
  const navItems = [
    { name: "Dashboard", path: "/", exact: true },
    { name: "Expense Stats", path: "/expense-stats", active: false },
    { name: "Employee Stats", path: "/employee-stats", active: false },
    { name: "Project Stats", path: "/project-stats" }, // ✅ New Route
  ];

  return (
    <div className="position-fixed navbar-container">
      <div className="w-full flex justify-between items-center py-3 px-4 navbar-wrapper">
        <div className="flex items-center">
          <div className="text-xl font-semibold rounded-full bg-white px-4 py-2 border border-gray-200">
            <span className="app-icon"></span>
            Crextio
          </div>
        </div>

        <div className="flex items-center space-x-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium ${
                  isActive ? "bg-[#7042EC] text-white" : "text-dark-gray"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
