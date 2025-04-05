
import React from "react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  progress: number;
  progressColor: string;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  icon, 
  value, 
  label, 
  progress, 
  progressColor,
  className 
}) => {
  return (
    <div className={cn("bg-white p-5 rounded-lg shadow-sm", className)}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm text-gray-500">{label}</div>
        </div>
        <div className="text-gray-400">{icon}</div>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-bar-fill" 
          style={{ 
            width: `${progress}%`, 
            backgroundColor: progressColor 
          }} 
        />
      </div>
      <div className="text-xs text-right mt-1 text-gray-500">{progress}%</div>
    </div>
  );
};

export default StatsCard;
