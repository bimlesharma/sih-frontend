import React from "react";
import html2pdf from "html2pdf.js";

const DownloadPDF = ({ contentId, filename, backgroundImage, page }) => {
  const handleDownload = () => {
    const content = document.getElementById(contentId);

    // Get current date and time for the timestamp
    const timestamp = new Date().toLocaleString();

    const options = {
      margin: [45, 10, 20, 10], // Apply 20mm margin for top and bottom, 10mm for left and right
      filename: `${filename}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    // Generate PDF
    html2pdf()
      .from(content)
      .set(options)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages();

        // Loop through each page in the generated PDF
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);

          // Add background image for each page
          if (backgroundImage) {
            pdf.addImage(backgroundImage, "JPEG", 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);
          }

          // Add "Generated on" timestamp at the top of the page
          pdf.setFontSize(10);
          pdf.text(`Generated on: ${timestamp}`, 10, 40); // Position the timestamp near the top-left

          // Add page number if enabled
          if (page) {
            const pageNumber = `Page ${i} of ${totalPages}`;
            pdf.setFontSize(10);
            pdf.text(pageNumber, pdf.internal.pageSize.width / 2, pdf.internal.pageSize.height - 10, { align: "center" });
          }
        }

        // Trigger the download
        pdf.save();
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  return (
    <button
      onClick={handleDownload}
      className="download-btn border border-black p-2 rounded"
    >
      Generate Report
    </button>
  );
};

export default DownloadPDF;
