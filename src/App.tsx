import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UploadPage from "./pages/Uploadpage"; // <-- You need to create this
import { sessionStorageService } from "./services/sessionStorageService";


const queryClient = new QueryClient();
import { AppContext } from "./AppContext"; // path to your context
import ProjectDashboard from "./pages/ProjectStats";
import ProjectStats from "./pages/ProjectStats";
import ExpenseStats from "./pages/EmployeeStats";
import EmployeeStats from "./pages/EmployeeStats";
import ExpensesStats from "./pages/ExpensesStats";

const App = () => {
  const [data, setData] = useState<object>();

  const [isDataAvailable, setIsDataAvailable] = useState<boolean>(() => {
    const data = sessionStorageService.getExcelData("companyData");
    setData(data);
    return !!data;
  });

  const showUploadPage = () => {
    sessionStorageService.clearExcelData(); // Optional
    setIsDataAvailable(false);
  };

  return (
    <AppContext.Provider value={{ showUploadPage }}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {!isDataAvailable ? (
                <Route path="*" element={<UploadPage />} />
              ) : (
                <>
                  <Route path="/" element={<Index />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/project-stats" element={<ProjectStats data={data} />} />
                  <Route path="/employee-stats" element={<EmployeeStats data={data} />} />
                  <Route path="/expense-stats" element={<ExpensesStats data={data} />} />

                  
                </>
              )}
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AppContext.Provider>
  );
};


export default App;
