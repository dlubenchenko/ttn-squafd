export function parseSheetName(sheetName: string) {
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const monthStr = sheetName.slice(0, 3).toUpperCase();
  const yearStr = sheetName.slice(3, 5);
  const month = months.indexOf(monthStr); // 0-based
  const year = 2000 + parseInt(yearStr, 10);
  return { month, year };
}