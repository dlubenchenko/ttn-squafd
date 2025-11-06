import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getDataFromFirestore, fetchSheetData } from "../api";
import { fetchSheetsList } from "../api/fetchSheetsList";
import { getSheetData, getMonthDays, parseSheetName } from "../utils";
import { monthMap } from "../constants";

export function useScheduleData() {
    const [sheets, setSheets] = useState<{ name: string; month: string; year: string }[]>([]);
    const [selectedSheet, setSelectedSheet] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
    const [days, setDays] = useState<number[]>([]);
    const [weekdays, setWeekdays] = useState<string[]>([]);
    const [agentsWithSchedule, setAgentsWithSchedule] = useState<string[]>([]);
    const [scheduleData, setScheduleData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function loadSheetsSchedule() {
            const config = await getDataFromFirestore("config", "uukhzawgfo12mxNhSMkn");
            if (!config?.GOOGLE_SHEETS_API_KEY) return;

            const list = await fetchSheetsList(config.GOOGLE_SHEETS_ALL_SCHEDULE);
            setSheets(list);
            if (list.length) setSelectedSheet(list[list.length - 1].name);
        }
        loadSheetsSchedule();
    }, []);

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
            const agents = users.map((row: any) => row.nameUkr.split(' ').length ? row.nameUkr.split(' ')[0] : row.nameUkr);

            const { month, year } = parseSheetName(selectedSheet);
            const { days, weekdays } = getMonthDays(year, month);
            setDays(days);
            setWeekdays(weekdays);

            const scheduleData = await getSheetData(selectedSheet, config.GOOGLE_SHEETS_ALL_SCHEDULE);


            if (!Array.isArray(scheduleData)) {
                setLoading(false);
                return;
            }
            setScheduleData(scheduleData);

            const filteredAgents = agents.filter((name: string) => {
                const scheduleRow = scheduleData.find(
                    (row: any) => (typeof row.values[0] === "string" ? row.values[0].trim() : "") === name.trim()
                );
                if (!scheduleRow) return false;
                return scheduleRow.values.slice(1).some((v: any) => v && v !== "");
            });

            setAgentsWithSchedule(filteredAgents);
            setLoading(false);
        }

        loadAll();
    }, [selectedSheet]);

    useEffect(() => {
        if (sheets.length) {
            const last = sheets[sheets.length - 1];
            const monthNum = monthMap[last.month];
            setSelectedDate(dayjs(`${last.year}-${monthNum}-01`, "YYYY-MM-DD"));
        }
    }, [sheets]);

    const handleDateChange = (date: dayjs.Dayjs | null) => {
        setSelectedDate(date);
        if (date) {
            const month = date.format("MMM").toUpperCase();
            const year = date.format("YYYY").slice(2);
            const sheetName = `${month}${year}`;
            const found = sheets.find((s) => s.name === sheetName);
            if (found) setSelectedSheet(found.name);
        }
    };

    return {
        sheets,
        selectedSheet,
        selectedDate,
        days,
        weekdays,
        agentsWithSchedule,
        scheduleData,
        loading,
        handleDateChange,
    };
}