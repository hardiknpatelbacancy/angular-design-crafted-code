
import React from "react";
import { 
  BarChart as ReChartsBar, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

interface BarChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  title: string;
  className?: string;
  color?: string;
  metrics?: Array<{
    label: string;
    value: string;
    change: number;
    changeType: "increase" | "decrease";
  }>;
}

const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  title, 
  className, 
  color = "#6741d9",
  metrics
}) => {
  return (
    <div className={`bg-white p-5 rounded-lg shadow-sm ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button className="text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <ReChartsBar data={data} barSize={20}>
            <CartesianGrid vertical={false} stroke="#f5f5f5" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
          </ReChartsBar>
        </ResponsiveContainer>
      </div>
      
      {metrics && (
        <div className="mt-4 flex justify-between">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-sm font-medium">{metric.label}</div>
              <div className="flex items-center justify-center mt-1">
                {metric.changeType === "increase" ? (
                  <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7,15L12,10L17,15H7Z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7,10L12,15L17,10H7Z" />
                  </svg>
                )}
                <span 
                  className={`ml-1 ${
                    metric.changeType === "increase" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {metric.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BarChart;
