import { Download, FileText, FileSpreadsheet, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Reports = () => {
  const handleExport = (type: string) => {
    toast({
      title: `${type} Export`,
      description: `Your ${type} report is being generated and will download shortly.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Export Reports</h1>
        <p className="text-muted-foreground text-sm mt-1">Generate and download civic engagement reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 text-center space-y-4">
          <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto">
            <FileText className="h-6 w-6 text-destructive" />
          </div>
          <h3 className="font-heading font-semibold text-foreground">PDF Report</h3>
          <p className="text-sm text-muted-foreground">Export a comprehensive PDF report with charts and summaries.</p>
          <Button onClick={() => handleExport("PDF")} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Download className="h-4 w-4 mr-2" /> Export as PDF
          </Button>
        </div>

        <div className="glass-card p-6 text-center space-y-4">
          <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center mx-auto">
            <FileSpreadsheet className="h-6 w-6 text-success" />
          </div>
          <h3 className="font-heading font-semibold text-foreground">Excel / CSV</h3>
          <p className="text-sm text-muted-foreground">Export raw data in spreadsheet format for further analysis.</p>
          <Button onClick={() => handleExport("CSV")} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Download className="h-4 w-4 mr-2" /> Export as CSV
          </Button>
        </div>

        <div className="glass-card p-6 text-center space-y-4">
          <div className="h-12 w-12 rounded-xl bg-info/10 flex items-center justify-center mx-auto">
            <Calendar className="h-6 w-6 text-info" />
          </div>
          <h3 className="font-heading font-semibold text-foreground">Monthly Report</h3>
          <p className="text-sm text-muted-foreground">Auto-generated monthly summary with key metrics and insights.</p>
          <Button onClick={() => handleExport("Monthly")} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Download className="h-4 w-4 mr-2" /> Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
