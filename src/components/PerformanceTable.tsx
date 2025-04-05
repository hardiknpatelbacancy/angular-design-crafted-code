
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Performance {
  id: number;
  name: string;
  avatar?: string;
  amount: string;
  leads: number;
  deals: number;
  tasks: number;
  tasksDone: number;
  rate: number;
}

interface PerformanceTableProps {
  title: string;
  subtitle: string;
  data: Performance[];
  className?: string;
}

const PerformanceTable: React.FC<PerformanceTableProps> = ({ 
  title, 
  subtitle, 
  data,
  className 
}) => {
  return (
    <div className={`bg-white p-5 rounded-lg shadow-sm ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <button className="text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-2 px-2 text-left text-xs font-medium text-gray-500">No</th>
              <th className="py-2 px-2 text-left text-xs font-medium text-gray-500">Ref</th>
              <th className="py-2 px-2 text-left text-xs font-medium text-gray-500">Leads</th>
              <th className="py-2 px-2 text-left text-xs font-medium text-gray-500">Deals</th>
              <th className="py-2 px-2 text-left text-xs font-medium text-gray-500">Tasks</th>
              <th className="py-2 px-2 text-left text-xs font-medium text-gray-500">Rate</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-3 px-2 text-sm">{item.id}.</td>
                <td className="py-3 px-2">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={item.avatar} alt={item.name} />
                      <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.amount}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2 text-sm">{item.leads}</td>
                <td className="py-3 px-2 text-sm">{item.deals}</td>
                <td className="py-3 px-2 text-sm">{item.tasksDone} Tasks Done</td>
                <td className="py-3 px-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center mr-2">
                      <div 
                        className="w-6 h-6 rounded-full bg-transparent" 
                        style={{
                          backgroundImage: `conic-gradient(${getRateColor(item.rate)} ${item.rate}%, transparent 0)`,
                        }}
                      />
                    </div>
                    <span className="text-sm">{item.rate}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function getRateColor(rate: number): string {
  if (rate >= 90) return "#5FC27E";
  if (rate >= 75) return "#5F75C2";
  if (rate >= 50) return "#F5C26B";
  return "#E56060";
}

export default PerformanceTable;
