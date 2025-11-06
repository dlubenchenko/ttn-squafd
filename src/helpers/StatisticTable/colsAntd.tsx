export function statisticCols() {
    return [
        {
            title: "Користувач",
            dataIndex: "user",
            key: "user",
            onCell: () => ({
                style: {
                    fontWeight: "bold"
                },
            })
        },
        {
            title: "Час",
            dataIndex: "time",
            key: "time",
            onCell: () => ({
                style: {
                    fontWeight: "bold"
                },
            })
        },
        {
            title: "Результат",
            dataIndex: "output",
            key: "output",
            onCell: () => ({
                style: {
                    fontWeight: "bold"
                },
            })
        },
        {
            title: "Парсер",
            dataIndex: "key",
            key: "key",
            onCell: () => ({
                style: {
                    fontWeight: "bold"
                },
            })
        },
        {
            title: "Введення",
            dataIndex: "input",
            key: "input",
            onCell: () => ({
                style: {
                    fontWeight: "bold"
                },
            })
        },
        {
            title: "Помилка",
            dataIndex: "error",
            key: "error",
            onCell: () => ({
                style: {
                    fontWeight: "bold"
                },
            })
        },
    ]
}