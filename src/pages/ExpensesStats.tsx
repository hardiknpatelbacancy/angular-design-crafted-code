import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ComposedChart,
  Bar,
  Pie,
  Cell,
} from "recharts";
import PieChart from "@/components/PieChart";

import NavBar from "@/components/NavBar";

const ExpensesStats = ({ data }) => {
  const departmentData = data.excelData.departments;
  const expenseData = data.excelData.expenses;
  const departmentExpenseMap = expenseData.reduce((acc, curr) => {
    const dept = curr.DepartmentID;
    const amount = Number(curr.Amount);
    if (!acc[dept]) acc[dept] = 0;
    acc[dept] += amount;
    return acc;
  }, {});

  const COLORS = [
    "#6A5ACD", // Slate Blue
    "#7B68EE", // Medium Slate Blue
    "#9370DB", // Medium Purple
    "#8A2BE2", // Blue Violet
    "#4169E1", // Royal Blue
    "#6495ED", // Cornflower Blue
    "#483D8B", // Dark Slate Blue
    "#6B8E23", // Olive Drab (cool greenish-blue tone for contrast)
    "#5F9EA0", // Cadet Blue
    "#4682B4", // Steel Blue
  ];

  const departmentExpenseData = Object.entries(departmentExpenseMap).map(
    ([department, total], index) => ({
      name:
        departmentData.find((x) => x.id == department)?.name ||
        `Dept ${department}`,
      value: parseFloat((total as number).toFixed(2)),
      color: COLORS[index % COLORS.length],
    })
  );
  return (
    <div>
      <NavBar />

      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex flex-col overflow-hidden mt-24">
          <div className="flex-1 overflow-y-auto bg-gray-50 w-4/5 m-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top 5 Revenue Projects */}
                <div className="bg-white rounded-2xl shadow p-4">
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart
                      data={departmentExpenseData}
                      title="Expenses per department"
                      subtitle=""
                    />
                  </ResponsiveContainer>
                </div>
                {/* ComposedChart for Expenses with Volume */}
                <div className="bg-white rounded-2xl shadow p-4">
                  <h2 className="text-xl font-semibold mb-4">
                    Expenses with Volume
                  </h2>
                  <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart
                      data={expenseData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar
                        yAxisId="left"
                        dataKey="amount"
                        barSize={20}
                        fill="#413ea0"
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="volume"
                        barSize={20}
                        fill="#82ca9d"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesStats;
