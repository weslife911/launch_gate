// @/utils/exportUtils.ts

export const downloadCSV = (data: any[], fileName: string) => {
  if (data.length === 0) return;

  // 1. Define headers based on your Referral data structure
  const headers = ["Date", "Clicks"];
  
  // 2. Convert JSON to CSV rows
  const csvRows = [
    headers.join(","), // Header row
    ...data.map(row => `${row.date},${row.clicks}`) // Data rows
  ].join("\n");

  // 3. Create a Blob and trigger download
  const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  link.setAttribute("href", url);
  link.setAttribute("download", `${fileName}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};