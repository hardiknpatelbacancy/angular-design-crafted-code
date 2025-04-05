
import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Dashboard from "@/pages/Dashboard";

const Index = () => {
  const user = {
    name: "Katie Pena",
    role: "Admin",
    avatar: "/lovable-uploads/1be30484-5a32-4c73-a56d-92fdf24334bc.png",
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar className="hidden md:block" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <Dashboard userName={user.name} />
        </div>
      </div>
    </div>
  );
};

export default Index;
