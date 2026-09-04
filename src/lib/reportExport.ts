// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import * as XLSX from "xlsx";
// import { formatCurrency } from "@/lib/format";
// import type { ReportSummary } from "@/types/report";

// export function exportReportToPdf(summary: ReportSummary, from: string, to: string) {
//   const doc = new jsPDF();
//   doc.setFontSize(16);
//   doc.text("Laporan Keuangan - DuitKita", 14, 18);
//   doc.setFontSize(10);
//   doc.text(`Periode: ${from} s/d ${to}`, 14, 25);

//   autoTable(doc, {
//     startY: 32,
//     head: [["Ringkasan", "Nominal"]],
//     body: [
//       ["Total Pemasukan", formatCurrency(summary.income)],
//       ["Total Pengeluaran", formatCurrency(summary.expense)],
//       ["Selisih (Cash Flow)", formatCurrency(summary.cashFlow)],
//     ],
//   });

//   autoTable(doc, {
//     startY: (doc as any).lastAutoTable.finalY + 10,
//     head: [["Kategori", "Nominal", "Persentase"]],
//     body: summary.categoryBreakdown.map((c) => [c.categoryName, formatCurrency(c.total), `${c.percentage.toFixed(1)}%`]),
//   });

//   doc.save(`laporan-${from}_${to}.pdf`);
// }

// export function exportReportToExcel(summary: ReportSummary, from: string, to: string) {
//   const wb = XLSX.utils.book_new();

//   const summarySheet = XLSX.utils.json_to_sheet([
//     { Ringkasan: "Total Pemasukan", Nominal: summary.income },
//     { Ringkasan: "Total Pengeluaran", Nominal: summary.expense },
//     { Ringkasan: "Selisih (Cash Flow)", Nominal: summary.cashFlow },
//   ]);
//   XLSX.utils.book_append_sheet(wb, summarySheet, "Ringkasan");

//   const categorySheet = XLSX.utils.json_to_sheet(
//     summary.categoryBreakdown.map((c) => ({ Kategori: c.categoryName, Nominal: c.total, Persentase: `${c.percentage.toFixed(1)}%` })),
//   );
//   XLSX.utils.book_append_sheet(wb, categorySheet, "Per Kategori");

//   XLSX.writeFile(wb, `laporan-${from}_${to}.xlsx`);
// }