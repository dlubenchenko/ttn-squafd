import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Input, message, Select } from "antd";
import { CopyOutlined, DeleteOutlined, PlayCircleOutlined } from "@ant-design/icons";
import styles from "./Parser.module.scss";
import { useAiParser } from "../../utils/parser/aiParser";
import { useParser } from "../../utils/parser/useParser";
import { AI_MODELS, DATE_FORMAT } from "../../constants";
import { useAuthContext } from "../../context";
import { addSheetData } from "../../api/addSheetData";

// key => приклад
const EXAMPLES: Record<string, string> = {
  glory: `CRM: 123456\nПасажир: Ivan Ivanov\nДата: 01.01.2025\n...`,
  // інші приклади
};

export default function Parser() {
  // parserId — це key з меню (наприклад, "glory", "ai-parser" тощо)
  const { parserId = "" } = useParams<{ parserId: string }>();
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string>("");
  const [model, setModel] = useState(AI_MODELS[0].value);

  const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
  const { parseWithAi, loading, error } = useAiParser(OPENROUTER_API_KEY, model);
  const { menu, user } = useAuthContext();

  const menuKey = menu?.find(item => item.path.includes(parserId))?.key || ''
  // універсальний парсер: якщо є кастомний — використовує його, інакше AI
  const parse = useParser(menuKey, parseWithAi);

  // Очищення інпуту та результату при зміні parserId
  useEffect(() => {
    setInput("");
    setResult("");
  }, [parserId]);

  const handleParse = async () => {
    if (!input.trim()) return;
    setResult("");
    const parsed = await parse(input);
    await addSheetData({
      key: menuKey,
      user: user?.nameUkr || user?.email,
      input: input,
      output: result,
      time: new Date().toLocaleDateString('en-GB', DATE_FORMAT),
      error: null,
    }, 'parserStat');
    if (parsed) {
      addSheetData({
        key: menuKey,
        user: user?.nameUkr || user?.email,
        input: input,
        output: parsed.trim(),
        time: new Date().toLocaleDateString('en-GB', DATE_FORMAT),
        error: null,
      }, 'parserStat');
      setResult(parsed.trim());
      message.success("Парсинг виконано!");
    } else if (error) {
      setResult("Помилка: " + error);
      message.error("AI не відповів");
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      message.success("Результат скопійовано!");
    }
  };

  const handleClear = () => {
    if (result.length || input.length) {
      setInput("");
      setResult("");
      message.warning("Чисто!");
    }
  };

  // Визначаємо, чи це AI Parser
  const isAiParser = parserId === "ai-parser";

  return (
    <div className={styles.parserPage}>
      <h3>
        Parser{parserId ? ` - ${parserId.replace(/^\w/, c => c.toUpperCase())}` : ""}
      </h3>
      {/* Селект моделі тільки для AI Parser */}
      {isAiParser && (
        <div style={{ marginBottom: 16, maxWidth: 320 }}>
          <Select
            value={model}
            onChange={setModel}
            options={AI_MODELS}
            style={{ width: "100%" }}
          />
        </div>
      )}
      <div className={styles.mainBlock}>
        <div className={styles.inputBlock}>
          <Input.TextArea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`Вставте текст ${parserId ? parserId.replace(/^\w/, c => c.toUpperCase()) : ""}`}
            autoSize={{ minRows: 8, maxRows: 16 }}
          />
        </div>
        <div className={styles.resultBlock}>
          <div className={styles.resultTitle}>Результат:</div>
          <div className={styles.resultText}>{result}</div>
        </div>
      </div>
      <div className={styles.buttonRow}>
        <Button loading={loading} icon={<PlayCircleOutlined />} type="primary" onClick={handleParse}>
          Парсити
        </Button>
        <Button icon={<CopyOutlined />} onClick={handleCopy}>
          Копіювати
        </Button>
        <Button icon={<DeleteOutlined />} danger onClick={handleClear}>
          Очистити
        </Button>
      </div>
      <div className={styles.exampleBlock}>
        <div className={styles.exampleTitle}>Приклад</div>
        <pre className={styles.exampleText}>
          {EXAMPLES[parserId || ""] || "Тут буде приклад для цього парсера…"}
        </pre>
        <span>
          {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        </span>
      </div>
    </div>
  );
}
