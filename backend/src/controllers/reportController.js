const { 
  getPetitionStatusReportService, 
  getLocalityReportService, 
  exportReportService
} = require("../services/reportService");


// 🔹 Petition Status Report
const getPetitionStatusReport = async (req, res) => {
  try {
    const data = await getPetitionStatusReportService();

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    console.error("Error in petition status report:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate petition status report"
    });
  }
};


// 🔹 Locality Report (WITH FILTER SUPPORT)
const getLocalityReport = async (req, res) => {
  try {
    // ✅ get query param
    const location = req.query.location;

    // ✅ pass to service
    const data = await getLocalityReportService(location);

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    console.error("Error in locality report:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate locality report"
    });
  }
};
// 🔹 Export Report (CSV)
const exportReport = async (req, res) => {
  try {
    const { type, location } = req.query;

    // Validate type
    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Report type is required"
      });
    }

    const csv = await exportReportService(type, location);

    // Set headers for download
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${type}-report.csv`
    );

    res.status(200).send(csv);

  } catch (error) {
    console.error("Error exporting report:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to export report"
    });
  }
};


module.exports = { 
  getPetitionStatusReport, 
  getLocalityReport,
  exportReport
};