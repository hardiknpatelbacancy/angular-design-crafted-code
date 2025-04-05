
import React from "react";
import StatsCard from "@/components/StatsCard";
import PieChart from "@/components/PieChart";
import BarChart from "@/components/BarChart";
import LineChart from "@/components/LineChart";
import PerformanceTable from "@/components/PerformanceTable";
import TasksList from "@/components/TasksList";
import { ShoppingBag, DollarSign, MessageSquare, Send, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard: React.FC<{ userName: string }> = ({ userName }) => {
  // Data for charts
  const pieChartData = [
    { name: "860 send", value: 860, color: "#6741d9" },
    { name: "730 open", value: 730, color: "#FFA5B9" },
    { name: "234 spam", value: 234, color: "#6ECFCF" },
  ];
  
  const barChartData = Array.from({ length: 12 }, (_, i) => ({
    name: `${i + 1}`,
    value: Math.floor(Math.random() * 5000) + 1000,
  }));
  
  const lineChartData = Array.from({ length: 30 }, (_, i) => ({
    name: `Day ${i + 1}`,
    value: Math.floor(Math.random() * 1000) + 500,
  }));

  // Data for performance table
  const performanceData = [
    {
      id: 1,
      name: "Mathilda Bell",
      avatar: "",
      amount: "$8,192,000",
      leads: 187,
      deals: 154,
      tasks: 28,
      tasksDone: 28,
      rate: 100,
    },
    {
      id: 2,
      name: "Marion Figueroa",
      avatar: "",
      amount: "$6,100,000",
      leads: 235,
      deals: 148,
      tasks: 21,
      tasksDone: 21,
      rate: 90,
    },
    {
      id: 3,
      name: "Lee Barrett",
      avatar: "",
      amount: "$4,220,000",
      leads: 365,
      deals: 126,
      tasks: 10,
      tasksDone: 10,
      rate: 75,
    },
    {
      id: 4,
      name: "Joseph Brooks",
      avatar: "",
      amount: "$1,628,000",
      leads: 458,
      deals: 110,
      tasks: 9,
      tasksDone: 9,
      rate: 60,
    },
  ];

  // Data for tasks
  const tasksData = [
    { id: 1, title: "Marketing dashboard app", completed: false },
    { id: 2, title: "Create new version 4.0", completed: false },
    { id: 3, title: "User Testing", completed: true },
    { id: 4, title: "Design system", completed: true },
    { id: 5, title: "Awesome task", completed: false },
    { id: 6, title: "Marketing dashboard concept", completed: true },
  ];

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Hi {userName}</h1>
          <p className="text-gray-500">Welcome back to Rhombus CRM dashboard</p>
        </div>
        <div className="flex mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center mr-3">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Dashlet
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard 
          icon={<ShoppingBag />} 
          value="$22,880.50" 
          label="Won from 18 Deals" 
          progress={67} 
          progressColor="#6741d9" 
        />
        <StatsCard 
          icon={<DollarSign />} 
          value="$1,096.30" 
          label="Daily average income" 
          progress={18} 
          progressColor="#E56060" 
        />
        <StatsCard 
          icon={<MessageSquare />} 
          value="33.98%" 
          label="Lead conversation" 
          progress={78} 
          progressColor="#5FC27E" 
        />
        <StatsCard 
          icon={<Send />} 
          value="778" 
          label="Campaign sent" 
          progress={80} 
          progressColor="#F5C26B" 
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <PieChart 
          data={pieChartData} 
          title="Email Sent Total" 
          subtitle="March 2020" 
        />
        <BarChart 
          data={barChartData} 
          title="Income Amounts"
          metrics={[
            { label: "Target", value: "841", change: 841, changeType: "increase" },
            { label: "Last week", value: "234", change: 234, changeType: "decrease" },
            { label: "Last month", value: "3278", change: 3278, changeType: "increase" },
          ]} 
        />
        <LineChart 
          data={lineChartData} 
          title="Revenue" 
          subtitle="Won from 262 Deals" 
          value="$165,750.23" 
        />
      </div>
      
      {/* Performance and Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceTable 
            title="Top Performance" 
            subtitle="Last 2 Weeks" 
            data={performanceData} 
          />
        </div>
        <div>
          <TasksList 
            title="Tasks" 
            subtitle="4 of 8 remaining" 
            tasks={tasksData} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
