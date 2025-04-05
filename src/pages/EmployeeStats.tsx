import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import { ResponsiveRadar } from "@nivo/radar";
import { ResponsiveLine } from "@nivo/line";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const EmployeeStatsPage = ({ data }) => {
  const timesheets = data.excelData.timeSheets;
  const employees = data.excelData.employees;

  // Map EmployeeId to Name
  const employeeIdToName = employees.reduce((acc, emp) => {
    if (emp.Id && emp.Name) {
      acc[emp.Id] = emp.Name.trim();
    }
    return acc;
  }, {});

  // Total hours per employee
  const employeeHoursMap = timesheets.reduce((acc, ts) => {
    const name = employeeIdToName[ts.EmployeeId];
    const hours = Number(ts.Hours || 0);

    if (name) {
      acc[name] = (acc[name] || 0) + hours;
    }

    return acc;
  }, {});

  const employeeHours = Object.entries(employeeHoursMap)
    .map(([name, hours]) => ({ name, hours }))
    .sort((a, b) => Number(b.hours) - Number(a.hours))
    .slice(0, 10);

  const radarData = employeeHours.map((emp) => ({
    employee: emp.name,
    Hours: emp.hours,
  }));

  const employeeNames = Object.values(employeeIdToName);
  const [selectedEmployee, setSelectedEmployee] = useState(employeeNames[0]);

  const selectedEmployeeId = Object.entries(employeeIdToName).find(
    ([id, name]) => name === selectedEmployee
  )?.[0];

  const selectedData = timesheets
    .filter((ts) => ts.EmployeeId === selectedEmployeeId)
    .map((ts) => ({
      x: new Date(ts.Date).toLocaleDateString("en-GB"),
      y: Number(ts.Hours || 0),
    }))
    .sort((a, b) => new Date(a.x) - new Date(b.x));

  const lineData = [
    {
      id: selectedEmployee,
      data: selectedData,
    },
  ];

  return (
    <div>
      <NavBar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-white p-6 rounded-2xl shadow mb-6">
          <h4 className="text-xl font-semibold mb-4">
            Top 10 Employees by Hours Worked (Radar Chart)
          </h4>
          <div className="h-[400px]">
            <ResponsiveRadar
              data={radarData}
              keys={["Hours"]}
              indexBy="employee"
              margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
              borderColor={{ from: "color" }}
              gridLabelOffset={36}
              dotSize={8}
              dotColor={{ theme: "background" }}
              dotBorderWidth={2}
              colors={{ scheme: "category10" }}
              blendMode="multiply"
              motionConfig="wobbly"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="mb-4">
            <h4 className="font-medium mb-2">Select Employee:</h4>

            <Select
              onValueChange={(e) => setSelectedEmployee(e.target.value)}
              defaultValue={selectedEmployee[0]?.Id}
            >
              <SelectTrigger className="mb-4">
                <SelectValue placeholder="Select a Project" />
              </SelectTrigger>
              <SelectContent>
                {employeeNames.map((p: any) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* <select
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              {employeeNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select> */}
          </div>

          <div className="h-[400px]">
            <ResponsiveLine
              data={lineData}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
              }}
              axisLeft={{
                legend: "Hours",
                legendOffset: -40,
                legendPosition: "middle",
              }}
              axisBottom={{
                legend: "Date",
                legendOffset: 36,
                legendPosition: "middle",
              }}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              useMesh={true}
              enableSlices="x"
              tooltip={({ point }) => (
                <div className="bg-white p-2 rounded shadow text-sm">
                  <strong>{point.data.xFormatted}</strong>:{" "}
                  {point.data.yFormatted} hrs
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeStatsPage;
