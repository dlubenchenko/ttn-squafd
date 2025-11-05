import { useEffect, useState } from "react";
import { Table, Select, Space } from "antd";

import styles from "./Schedule.module.scss";

import { cols as AntDCols, rows as AntDRows } from "../../helpers";
import { getSheetData, getMonthDays, parseSheetName } from "../../utils";
import { getDataFromFirestore, fetchSheetData } from "../../api";
import { fetchSheetsList } from "../../api/fetchSheetsList";

export default function Schedule() {
  const [columns, setColumns] = useState<any[]>([]);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [sheets, setSheets] = useState<{ name: string, month: string, year: string }[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null);

  // 1. Завантажуємо список листів
  useEffect(() => {
    async function loadSheetsSchedule() {
      const config = await getDataFromFirestore("config", "uukhzawgfo12mxNhSMkn");

      if (!config?.GOOGLE_SHEETS_API_KEY) return;

      fetchSheetsList(config.GOOGLE_SHEETS_ALL_SCHEDULE).then(list => {
        setSheets(list);
        // За замовчуванням — останній (найновіший)
        if (list.length) setSelectedSheet(list[list.length - 1].name);
      });
    }
    loadSheetsSchedule()
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
      const agents = users
        // .filter((row: any) => row.division === "invol" && row.role !== "teamlead")
        .map((row: any) => row.nameUkr);

      // console.log(selectedSheet);


      // Витягуємо місяць/рік з selectedSheet
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
        // Перевіряємо, чи є хоч одна непорожня зміна (крім імені)
        return scheduleRow.values.slice(1).some((v: any) => v && v !== "");
      });

      setColumns(AntDCols(days, weekdays, styles));
      setDataSource(AntDRows(agentsWithSchedule, scheduleData, days));
      setLoading(false);
    }

    loadAll();
  }, [selectedSheet]);

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Select
          value={selectedSheet}
          onChange={setSelectedSheet}
          style={{ width: 120 }}
          placeholder="Оберіть місяць"

        >
          {sheets.map(s => (
            <Select.Option key={s.name} value={s.name}>
              {s.month} {s.year}
            </Select.Option>
          ))}
        </Select>
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
