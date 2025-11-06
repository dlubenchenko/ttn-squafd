export function sidebarCols() {
    return [
        {
            title: "Назва",
            dataIndex: "label",
            key: "label",
            onCell: () => ({
                style: {
                    fontWeight: "bold"
                },
            })
        },
        {
            title: "Шлях",
            dataIndex: "path",
            key: "path",
            onCell: () => ({
                style: {
                    fontWeight: "bold"
                },
            })
        },
        {
            title: "Доступність",
            dataIndex: "available",
            key: "available",
            onCell: () => ({
                style: {
                    fontWeight: "bold"
                },
            })
        },
        {
            title: "Вкладений",
            dataIndex: "childrenOf",
            key: "childrenOf",
            onCell: () => ({
                style: {
                    fontWeight: "bold"
                },
            })
        },
        {
            title: "Відділ",
            dataIndex: "division",
            key: "division",
            onCell: () => ({
                style: {
                    fontWeight: "bold"
                },
            })
        },
        {
            title: "Іконка",
            dataIndex: "icon",
            key: "icon",
            onCell: () => ({
                style: {
                    fontWeight: "bold"
                },
            })
        },
        {
            title: "Ключ",
            dataIndex: "key",
            key: "key",
            onCell: () => ({
                style: {
                    fontWeight: "bold"
                },
            })
        },
        {
            title: "Ролі",
            dataIndex: "roles",
            key: "roles",
            onCell: () => ({
                style: {
                    fontWeight: "bold"
                },
            })
        },

        {
            title: "",
            dataIndex: "edit",
            key: "edit",
            onCell: () => ({
                style: {
                    fontWeight: "bold"
                },
            })
        },
    ]
}