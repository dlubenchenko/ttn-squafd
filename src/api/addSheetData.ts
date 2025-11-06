export async function addSheetData(data: Record<string, any>, sheet: string): Promise<boolean> {
    const scriptURL = `${import.meta.env.VITE_GOOGLE_SHEETS_ADD}${sheet}`;
    
    try {
        await fetch(scriptURL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sheet,
                ...data,
            }),
        });
        console.log('ok');
        return true;
    } catch (error) {
        // Тут можна додати логування або обробку помилок
        console.error("Помилка при надсиланні статистики парсера:", error);
        return false;
    }
}