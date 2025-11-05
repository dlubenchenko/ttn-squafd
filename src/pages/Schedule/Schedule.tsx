import { useEffect, useState } from "react";
import { Table, Select, Space } from "antd";

import styles from "./Schedule.module.scss";

import { cols as AntDCols, rows as AntDRows } from "../../helpers";
import { getSheetData, getMonthDays } from "../../utils";
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
        .filter((row: any) => row.division === "invol" && row.role !== "teamlead")
        .map((row: any) => row.nameUkr);

      // console.log(selectedSheet);


      // Витягуємо місяць/рік з selectedSheet
      const now = new Date();
      const { days, weekdays } = getMonthDays(now.getFullYear(), now.getMonth());
      const scheduleData = await getSheetData(selectedSheet, config.GOOGLE_SHEETS_ALL_SCHEDULE);

      if (!Array.isArray(scheduleData)) {
        setLoading(false);
        return;
      }

      setColumns(AntDCols(days, weekdays, styles));
      setDataSource(AntDRows(agents, scheduleData, days));
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
