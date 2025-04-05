import React, { useCallback, useEffect, useState } from "react";
import StatsCard from "@/components/StatsCard";
import PieChart from "@/components/PieChart";
import BarChart from "@/components/BarChart";
import LineChart from "@/components/LineChart";
import PerformanceTable from "@/components/PerformanceTable";
import TasksList from "@/components/TasksList";
import {
  ShoppingBag,
  DollarSign,
  MessageSquare,
  Send,
  Download,
  Plus,
  Box,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { sessionStorageService } from "@/services/sessionStorageService"; // adjust path as needed
import { LoaderCircle } from "lucide-react";
import {
  Scatter,
  CartesianGrid,
  ScatterChart,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAppContext } from "@/AppContext";

const Dashboard: React.FC<{ userName: string }> = ({ userName }) => {
  const { showUploadPage } = useAppContext();

  const [recommendationHtml, setRecommendationHtml] = useState<string>("");
  const [totalEmployees, settotalEmployees] = useState<string>("");
  const [totalProjects, settotalProjects] = useState<string>("");
  const [noOfEmployeeJoinedInLastMonth, setnoOfEmployeeJoinedInLastMonth] =
    useState<string>("");
  const [billableHours, setbillableHours] = useState<string>("");
  const [totalExpenses, settotalExpenses] = useState<string>("");
  const [barChartData, setbarChartData] =
    useState<{ name: string; value: number }[]>(null);
  const [pieChartData, setpieChartData] =
    useState<{ name: string; value: number; color: string }[]>(null);
  const [scatterChart, setScatterChart] =
    useState<{ month: string; salary: number }[]>(null);
  const [areaChart, setareaChart] =
    useState<{ month: string; salary: number }[]>(null);

  const [showSidebar, setShowSidebar] = useState(false);
  const [isSidebarLoading, setIsSidebarLoading] = useState(true);
  const [projectWorkLoadChart, setprojectWorkLoadChart] =
    useState<{ name: string; value: number }[]>(null);

  const { toast } = useToast();
  const [inputValue, setInputValue] = useState<string>("");

  const loadData = () => {
    const data = sessionStorageService.getExcelData("companyData");
    if (data) {
      settotalEmployees(data.noOfEmployees);
      settotalProjects(data.noOfProjects);
      setnoOfEmployeeJoinedInLastMonth(data.noOfEmployeeJoinedInLastMonth);
      setbillableHours(data.billableHours);

      settotalEmployees(data.noOfEmployees);
      settotalEmployees(data.noOfEmployees);
      settotalExpenses(data.TotalExpenses);
      // setbarChartData(data.timeSheetChart)

      const timeSheetMap: Record<string, number> =
        data.excelData.timeSheets.reduce(
          (acc: Record<string, number>, entry) => {
            const employeeName = data.excelData.employees.filter(
              (x) => x.Id == entry.EmployeeId
            )[0].Name;
            acc[employeeName] =
              (acc[employeeName] || 0) + parseFloat(entry.Hours);
            return acc;
          },
          {}
        );

      const barChartData: { name: string; value: number }[] = Object.entries(
        timeSheetMap
      ).map(([date, hours]) => ({
        name: date,
        value: hours,
      }));

      setbarChartData(barChartData);

      const salaryByMonth = data.excelData.employees.reduce((acc, emp) => {
        const [day, month, year] = emp.date_of_joining.split(" ")[0].split("-");
        const key = `${year}-${month}`; // e.g., "2019-05"
        const salary = parseFloat(emp.Salary) || 0;

        acc[key] = (acc[key] || 0) + salary;
        return acc;
      }, {});

      const areaChartData = Object.entries(salaryByMonth).map(
        ([month, salary]) => ({
          month,
          salary: +(salary as number).toFixed(2),
        })
      );

      setareaChart(areaChartData);

      const pieChartData = [
        {
          name: "Billable",
          value: data.excelData.employees.filter((e) => e.isBillable === "TRUE")
            .length,
          color: "#6741d9",
        },
        {
          name: "Non-Billable",
          value: data.excelData.employees.filter(
            (e) => e.isBillable === "FALSE"
          ).length,
          color: "#FFA5B9",
        },
      ];
      setpieChartData(pieChartData);

      const projectWorkload = data.excelData.projects.map((proj) => ({
        project: proj.name,
        hours: parseFloat(proj.total_hours),
      }));

      setprojectWorkLoadChart(projectWorkload);

      const salaryScatterData = data.excelData.employees.map((emp) => {
        const empHours = data.excelData.timeSheets
          .filter((t) => t.EmployeeId === emp.Id)
          .reduce((sum, t) => sum + parseFloat(t.Hours || "0"), 0);

        return {
          name: emp.Name,
          salary: parseFloat(emp.Salary) || 0,
          hours: empHours,
        };
      });

      setScatterChart(salaryScatterData);
    } else {
      toast({
        variant: "destructive",
        title: "Data 404",
        description: "Data not found.",
      });
    }
  };

  // useEffect(() => {
  //   if (showSidebar) {
  //     setIsSidebarLoading(true);
  //   }
  // }, [showSidebar]);

  useEffect(() => {
    loadData();
    fetchData(null); // ⬅️ Call your fetchData function here
  }, []);

  const fetchData = useCallback(async (query: string | null) => {
    console.log("Fetching recommendations...");
    try {
      const response = await axios.post(
        "https://localhost:7080/api/v1/Recommendations",
        {
          query: query,
        }
      );

      console.log("API response:", response.data);

      if (response.data.isSuccess) {
        setRecommendationHtml((prev) => prev + response.data.result);
        setIsSidebarLoading(false); // ✅ Stop loader here
        setInputValue("");
      } else {
        setIsSidebarLoading(false); // ✅ Stop loader on error too
        toast({
          variant: "destructive",
          title: "Summarization failed",
          description: "Something went wrong.",
        });
      }
    } catch (error) {
      console.error("API call failed:", error);
      setIsSidebarLoading(false); // ✅ Stop loader on exception
    }
  }, []);

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

  const appendToRecommendation = async () => {
    const string = `<div style="
    background-color: #7042EC;
    color: white;
    padding: 8px 12px;
    border-radius: 8px;
    margin-left: auto;
    margin-bottom: 16px;
    max-width: 80%;
    text-align: left;
    display: block;
    margin-top:16px
  ">
    ${inputValue.trim()}
  </div>`;
    setRecommendationHtml((prev) => prev + string);
    setInputValue(inputValue.trim());
    try {
      setIsSidebarLoading(true); // stop loader

      const response = await axios.post(
        "https://localhost:7080/api/v1/Recommendations",
        {
          query: inputValue.trim(),
        }
      );
      if (response.data.isSuccess) {
        setRecommendationHtml((prev) => prev + response.data.result);
        setIsSidebarLoading(false); // stop loader
        setInputValue(""); // reset input

        // sessionStorage.setItem("recommendations", JSON.stringify(response));
        // setRecommendationHtml(response.data.result); // Assuming API returns raw HTML
      } else {
        toast({
          variant: "destructive",
          title: "Summarization failed",
          description: "Something went wrong while.",
        });
      }
    } catch (error) {
      console.error("API call failed:", error);
      showUploadPage(); // Will switch to UploadPage
    }
  };

  return (
    <div className="p-6 mt-20">
      <div className="flex flex-row w-full">
        <div
          className={`${
            showSidebar ? "w-3/4" : "w-full"
          } transition-all duration-300`}
        >
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Hi {userName}</h1>
              <p className="text-gray-500">
                Welcome back to Rhombus CRM dashboard
              </p>
            </div>
            <div className="flex mt-4 md:mt-0">
              <Button variant="outline" className="flex items-center mr-3">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              {!showSidebar && (
                <Button
                  className="flex items-center"
                  onClick={() => setShowSidebar(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Open Summary
                </Button>
              )}
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatsCard
              icon={<ShoppingBag />}
              value={totalEmployees}
              label="Total Employees"
              progress={100}
              progressColor="#6741d9"
            />
            <StatsCard
              icon={<DollarSign />}
              value={totalProjects}
              label="Total Projects"
              progress={100}
              progressColor="#E56060"
            />
            <StatsCard
              icon={<MessageSquare />}
              value={noOfEmployeeJoinedInLastMonth}
              label="Emp Joined in last month"
              progress={100}
              progressColor="#5FC27E"
            />
            <StatsCard
              icon={<Send />}
              value={billableHours}
              label="Total Billable Hours"
              progress={100}
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
            <BarChart data={barChartData} title="Logged Hours" />

            <div className="w-full max-w-md p-4 bg-white rounded-xl shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  Salary vs Hours Worked
                </h3>
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <ScatterChart>
                  <CartesianGrid />
                  <XAxis type="number" dataKey="hours" name="Hours Worked" />
                  <YAxis type="number" dataKey="salary" name="Salary" />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter
                    name="Employees"
                    data={scatterChart}
                    fill="#6366f1"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="w-full p-4 bg-white rounded-xl shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                Monthly Salary Trend
                </h3>
              </div>
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={areaChart}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="salary"
                      stroke="#10b981"
                      fill="#6ee7b7"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={projectWorkLoadChart}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="project" />
                  <PolarRadiusAxis />
                  <Tooltip />
                  <Radar
                    name="Workload"
                    dataKey="hours"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance and Tasks
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
          </div> */}
        </div>
        <div
          id="suggestionDiv"
          className={`fixed top-0 right-0 h-full w-full md:w-1/3 lg:w-1/4 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
            showSidebar ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {isSidebarLoading ? (
            <div className="h-full flex items-center justify-center">
              <LoaderCircle className="w-10 h-10 animate-spin text-[#7042ec]" />
            </div>
          ) : (
            <div className="w-full sticky top-20 h-[calc(100vh-5rem)] border-l bg-white shadow-lg overflow-y-auto px-4 pt-6 pb-24">
              <div className="flex flex-col h-full">
                <div className="mb-4 flex flex-row justify-between">
                  <h2 className="text-xl font-semibold">Summary</h2>
                  <button
                    onClick={() => setShowSidebar(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500">
                    Generated insights and recommendations
                  </p>
                </div>
                <div className="space-y-4 text-sm text-gray-800 mb-12 relative">
                  <div className="mb-16">
                    <div
                      dangerouslySetInnerHTML={{ __html: recommendationHtml }}
                    ></div>
                  </div>

                  <div className="sticky left-0 right-0 px-4 w-full bottom-[-4rem]">
                    <div className="flex gap-2 w-full max-w-[22rem] mx-auto">
                      <Input
                        className="flex-grow"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                      <Button
                        onClick={appendToRecommendation}
                        variant="outline"
                        className="bg-[#7042EC] text-white hover:bg-[#7042EC] hover:text-white"
                      >
                        <Send />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
