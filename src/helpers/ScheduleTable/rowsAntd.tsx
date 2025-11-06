import type { User } from "../../types";

export function rows(agents: string[], scheduleData: any[], days: number[], user: User | null): any[] {
  const agentRows = agents.map((name) => {
    // Тут вже не потрібно перевіряти, просто знаходимо рядок
    const scheduleRow = scheduleData.find(
      (row) => row.values[0].trim() === name.trim()
    );
    const rowObj: any = { name };
    // rowObj.onRow = () => ({ style: { fontWeight: "bold" } });
    let weekendCount = 0;

    days.forEach((day, i) => {
      const cellValue = scheduleRow ? scheduleRow.values[i + 1] : "";
      const cellBg = scheduleRow ? scheduleRow.backgrounds[i + 1] : "#fff";
      rowObj[`d${day}`] = cellValue;
      rowObj[`bg${day}`] = cellBg;
      if (cellValue === "x") weekendCount++;
    });

    rowObj.workDays = days.length - weekendCount;
    rowObj.weekendDays = weekendCount;

    return rowObj;
  });

  // === Додаємо summary-рядки ===
  // Підрахунок по кожному дню
  const countBy = (val: number) =>
    days.map(day =>
      agentRows.reduce((acc, row) => acc + (row[`d${day}`] === val ? 1 : 0), 0)
    );
  const countColor = (val: string) =>
    days.map(day =>
      agentRows.reduce((acc, row) => acc + (row[`bg${day}`] === val ? 1 : 0), 0)
    );
  const count8 = countBy(8);
  const count10 = countBy(10);
  const count16 = countBy(16);
  const countReissue = countColor("#00ff00");
  const ttl = days.map(
    (_day, idx) => count8[idx] + count10[idx] + count16[idx]
  );

  // console.log(Object.fromEntries(days.map((day, i) => [`bg${day}`, countReissue[i]])));
  // console.log(Object.fromEntries(days.map((day, i) => [`d${day}`, count16[i]])));


  // Summary-рядки
  const summaryRows = [
    { name: "8", isSummary: true, ...Object.fromEntries(days.map((day, i) => [`d${day}`, count8[i]])) },
    { name: "10", isSummary: true, ...Object.fromEntries(days.map((day, i) => [`d${day}`, count10[i]])) },
    { name: "16", isSummary: true, ...Object.fromEntries(days.map((day, i) => [`d${day}`, count16[i]])) },
    { name: "ttl", isSummary: true, ...Object.fromEntries(days.map((day, i) => [`d${day}`, ttl[i]])) },
    { name: "Опрацювання", isSummary: true, ...Object.fromEntries(days.map((day, i) => [`d${day}`, countReissue[i]])) },
    // { name: "Повернення", isSummary: true, ...Object.fromEntries(days.map((day, i) => [`d${day}`, ttl[i]])) },
  ];

  if (user?.role === 'admin' || user?.role === 'teamlead') {
    return [...agentRows, ...summaryRows];

  }

  return [...agentRows];

}