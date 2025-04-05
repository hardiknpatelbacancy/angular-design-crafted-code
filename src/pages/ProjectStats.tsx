import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import NavBar from "@/components/NavBar";

const ProjectStats = ({ data }) => {
  const projects = data.excelData.projects;
  const timesheets = data.excelData.timeSheets;
  const employees = data.excelData.employees;

  // ✅ Month formatter from "dd-mm-yyyy" format
  function extractMonthName(dateString: string): string {
    // Handle format like "01-01-2024 00:00:00"
    const cleanDate = dateString.split(" ")[0]; // "01-01-2024"
    const [day, month, year] = cleanDate.split("-");
  
    const monthIndex = Number(month) - 1;
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
  
    return `${monthNames[monthIndex]} ${year}`;
  }

  const topProjects = useMemo(() => {
    return [...projects]
      .map((p) => ({
        name: p.name,
        revenue: Number(p.total_hours) * Number(p.rate),
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [projects]);

  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.Id);

  const timesheetData = useMemo(() => {
    const filtered = timesheets.filter((ts) => {
      const emp = employees.find((e) => e.Id === ts.EmployeeId);
      return emp?.projectId === selectedProjectId;
    });
  
    const result = {};
    filtered.forEach((ts) => {
      const month = extractMonthName(ts.Date); // 👈 Use this instead of new Date()
      result[month] = (result[month] || 0) + Number(ts.Hours);
    });
  
    return Object.entries(result).map(([month, hours]) => ({ month, hours }));
  }, [selectedProjectId, timesheets, employees]);
  
  return (
    <div>
      <NavBar />

      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex flex-col overflow-hidden mt-24">
          <div className="flex-1 overflow-y-auto bg-gray-50 w-4/5 m-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top 5 Revenue Projects */}
              <div className="bg-white p-4 rounded-xl shadow">
                <h4 className="font-medium mb-2">
                  Top 5 Revenue-Generating Projects
                </h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={topProjects}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Project-specific Time Chart */}
              <div className="bg-white p-4 rounded-xl shadow">
                <h4 className="font-medium mb-2">
                  Monthly Hours for Selected Project
                </h4>
                <Select
                  onValueChange={setSelectedProjectId}
                  defaultValue={projects[0]?.Id}
                >
                  <SelectTrigger className="mb-4">
                    <SelectValue placeholder="Select a Project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((p) => (
                      <SelectItem key={p.Id} value={p.Id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={timesheetData}>
                    <XAxis dataKey="month" type="category" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => [`${value} hrs`, "Hours"]}
                      labelFormatter={(label: string) => label}
                    />{" "}
                    <Area
                      type="monotone"
                      dataKey="hours"
                      stroke="#3b82f6"
                      fill="#93c5fd"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStats;
