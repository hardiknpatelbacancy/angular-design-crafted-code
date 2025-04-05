import React, { useRef } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Dashboard from "@/pages/Dashboard";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import { sessionStorageService } from "@/services/sessionStorageService"; // adjust path as needed
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();


  const uploadExcelFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://localhost:7080/api/v1/Recommendations/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      const result = await response.json();
      sessionStorageService.setExcelData(result, "companyData");
      window.location.href = "/"
    } catch (err) {
      console.error("Upload error:", err);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Something went wrong while uploading the file.",
      });
    }
  };
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden h-screen">
          <div className="flex-1 overflow-y-auto bg-gray-50 h-screen">
            <div className="flex items-center flex-col h-screen">
              <img src="/upload-svg.svg" alt="Logo" className="w-3/6 h-1/2" />

              <span className="mt-7 text-3xl font-bold">
                Please Upload your company's data.
              </span>
              <span className="mt-2 text-gray-500">
                Acceptable format is .xls only
              </span>

              <Button onClick={handleUploadClick} variant="outline" className="bg-[#7042EC] text-white mt-8 flex items-center mr-3 hover:bg-[#7042EC] hover:text-white">
                <Upload className="w-4 h-4 mr-2 bg-[#7042EC] text-white hover:bg-[#7042EC] hover:text-white" />
                Upload
              </Button>

              <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".xlsx"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                    uploadExcelFile(file);
                }
              }}
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
