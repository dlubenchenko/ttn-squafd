export function rows(agents: string[], scheduleData: any[], days: number[]) {
  return agents.map((name) => {
    // Знаходимо рядок у графіку для цього агента
    const scheduleRow = scheduleData.find(
      (row) => (typeof row.values[0] === "string" ? row.values[0].trim() : "") === name.trim()
    );
    const rowObj: any = { name };
    let weekendCount = 0;

    days.forEach((day, i) => {
      // У графіку дні починаються з індексу 1 (values[1] — 1 число)
      const cellValue = scheduleRow ? scheduleRow.values[i + 1] : "";
      const cellBg = scheduleRow ? scheduleRow.backgrounds[i + 1] : "#fff";
      rowObj[`d${day}`] = cellValue;
      rowObj[`bg${day}`] = cellBg;
      if (cellValue === "x") weekendCount++;
    });

    rowObj.workDays = days.length - weekendCount;
    rowObj.weekendDays = weekendCount;
    rowObj.onCell = () => ({ style: { fontWeight: "bold" } });
    return rowObj;
  });
}