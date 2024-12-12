import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

const DownloadPDF = ({ contentId, filename, headerText, footerText , page}) => {
  const handleDownload = () => {
    const content = document.getElementById(contentId);

    const options = {
      margin: 10,
      filename: `${filename}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    html2pdf()
      .from(content)
      .set(options)
      .toContainer()
      .toCanvas()
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages();

        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(14);
          pdf.text(headerText, 10, 10); // Add header text
          pdf.text(footerText, 10, pdf.internal.pageSize.height - 10); // Add footer text
        }
      })
      .save();
  };

  return (
    <button onClick={handleDownload} className="download-btn border border-black p-2 rounded">
      Generate Report
    </button>
  );
};

export default DownloadPDF;
