
import React from "react";
import { 
  LineChart as ReChartsLine, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area
} from "recharts";

interface LineChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  title: string;
  subtitle: string;
  value: string;
  className?: string;
  color?: string;
  gradient?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  title, 
  subtitle,
  value,
  className, 
  color = "#6741d9",
  gradient = true
}) => {
  return (
    <div className={`bg-white p-5 rounded-lg shadow-sm ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="text-3xl font-bold mt-1">{value}</div>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <button className="text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
      
      <div className="h-48 mt-4">
        {gradient ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#f5f5f5" vertical={false} />
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ReChartsLine data={data}>
              <CartesianGrid stroke="#f5f5f5" vertical={false} />
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={color}
                strokeWidth={2}
                dot={false}
              />
            </ReChartsLine>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default LineChart;
