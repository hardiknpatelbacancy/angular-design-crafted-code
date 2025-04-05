import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Dashboard from "@/pages/Dashboard";
import NavBar from "@/components/NavBar";

const Index = () => {
  const user = {
    name: "Katie Pena",
    role: "Admin",
    avatar: "/lovable-uploads/1be30484-5a32-4c73-a56d-92fdf24334bc.png",
  };

  return (
    <div>
      <NavBar />

      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <Dashboard userName={user.name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
