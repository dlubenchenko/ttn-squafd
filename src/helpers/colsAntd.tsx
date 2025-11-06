export function cols(days: Array<number>, weekdays: Array<string>, styles: CSSModuleClasses): Array<any> {
  return [
    {
      title: "Агент", dataIndex: "name", key: "name", fixed: "left", width: 150, onCell: () => ({
        style: {
          fontWeight: "bold"
        },
      })
    },
    ...days.map((day, idx) => ({
      title: (
        <div>
          <div>{day}</div>
          <div style={{ fontSize: 12, color: "#888" }}>{weekdays[idx]}</div>
        </div>
      ),
      dataIndex: `d${day}`,
      key: `d${day}`,
      width: 40,
      align: "center",
      // Додаємо стиль для всієї клітинки
      onCell: (row: any) => ({
        style: {
          background: row[`bg${day}`] || "#fff",
          minHeight: 24,
          padding: 0,
          cursor: "default",
          // fontWeight: "bold",
        },
      }),
    })),
    {
      title: "Р",
      dataIndex: "workDays",
      key: "workDays",
      width: 50,
      align: "center",
      className: styles.summaryCol,
    },
    {
      title: "В",
      dataIndex: "weekendDays",
      key: "weekendDays",
      width: 50,
      align: "center",
      className: styles.summaryCol,
    },
  ]
}