import { useEffect, useState } from "react";
import { Table, Space, DatePicker } from "antd";
import dayjs from "dayjs";

import styles from "./Schedule.module.scss";
import { cols as AntDCols, rows as AntDRows } from "../../helpers";
import { getSheetData, getMonthDays, parseSheetName } from "../../utils";
import { getDataFromFirestore, fetchSheetData } from "../../api";
import { fetchSheetsList } from "../../api/fetchSheetsList";
import { useAuthContext } from "../../context/AuthContext";
import { monthMap } from "../../constants";

export default function Schedule() {
  const [columns, setColumns] = useState<any[]>([]);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [sheets, setSheets] = useState<{ name: string; month: string; year: string }[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  const { user } = useAuthContext();

  // 1. Завантажуємо список листів
  useEffect(() => {
    async function loadSheetsSchedule() {
      const config = await getDataFromFirestore("config", "uukhzawgfo12mxNhSMkn");
      if (!config?.GOOGLE_SHEETS_API_KEY) return;

      fetchSheetsList(config.GOOGLE_SHEETS_ALL_SCHEDULE).then((list) => {
        setSheets(list);
        // За замовчуванням — останній (найновіший)
        if (list.length) setSelectedSheet(list[list.length - 1].name);
      });
    }
    loadSheetsSchedule();
  }, []);

  // 2. Завантажуємо дані для вибраного листа
  useEffect(() => {
    async function loadAll() {
      if (!selectedSheet) return;
      setLoading(true);

      const config = await getDataFromFirestore("config", "uukhzawgfo12mxNhSMkn");
      if (!config?.GOOGLE_SHEETS_API_KEY) {
        setLoading(false);
        return;
      }

      const users = await fetchSheetData("users", config.GOOGLE_SHEETS_API_KEY);
      const agents = users.map((row: any) => row.nameUkr);

      const { month, year } = parseSheetName(selectedSheet);
      const { days, weekdays } = getMonthDays(year, month);
      const scheduleData = await getSheetData(selectedSheet, config.GOOGLE_SHEETS_ALL_SCHEDULE);

      if (!Array.isArray(scheduleData)) {
        setLoading(false);
        return;
      }

      const agentsWithSchedule = agents.filter((name: string) => {
        const scheduleRow = scheduleData.find(
          (row: any) => (typeof row.values[0] === "string" ? row.values[0].trim() : "") === name.trim()
        );
        if (!scheduleRow) return false;
        return scheduleRow.values.slice(1).some((v: any) => v && v !== "");
      });

      setColumns(AntDCols(days, weekdays, styles));
      setDataSource(AntDRows(agentsWithSchedule, scheduleData, days, user));
      setLoading(false);
    }

    loadAll();
  }, [selectedSheet]);

  // Встановлюємо початкову дату після завантаження sheets
  useEffect(() => {
    if (sheets.length) {
      const last = sheets[sheets.length - 1];
      const monthNum = monthMap[last.month];
      setSelectedDate(dayjs(`${last.year}-${monthNum}-01`, "YYYY-MM-DD"));
    }
  }, [sheets]);

  // При зміні дати — шукаємо відповідний лист
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
    if (date) {
      const month = date.format("MMM").toUpperCase(); // "NOV"
      const year = date.format("YYYY").slice(2);      // "25"
      const sheetName = `${month}${year}`;
      const found = sheets.find((s) => s.name === sheetName);
      if (found) setSelectedSheet(found.name);
    }
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <DatePicker
          picker="month"
          value={selectedDate}
          onChange={handleDateChange}
          // renderExtraFooter={() => "extra footer"}
          style={{ width: 160 }}
          allowClear={false}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        bordered
        scroll={{ x: true }}
        rowKey="name"
        size="small"
        loading={loading}
      />
    </div>
  );
}
