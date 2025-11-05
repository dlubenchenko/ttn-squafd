export function getMonthDays(year: number, month: number) {
    const days: number[] = [];
    const weekdays: string[] = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
        days.push(date.getDate());

        // Дві букви дня тижня (укр): нд, пн, вт, ср, чт, пт, сб
        const weekDaysShort = ["нд", "пн", "вт", "ср", "чт", "пт", "сб"];

        weekdays.push(weekDaysShort[date.getDay()]);
        date.setDate(date.getDate() + 1);
    }
    return { days, weekdays };
}