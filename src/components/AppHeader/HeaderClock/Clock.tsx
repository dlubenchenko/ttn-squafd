import { useEffect, useState } from "react";
import type { ClockProps } from "../../../types";

import styles from './Clock.module.scss';

export default function Clock({ timeZone, label }: ClockProps) {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone,
      };
      setTime(now.toLocaleTimeString("uk-UA", options));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);


  return (
    <span className={styles.clock}>
      <b>{label}</b> {time}
    </span>
  )
}
