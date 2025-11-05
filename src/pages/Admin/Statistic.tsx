import { useEffect, useState } from "react"
import { getSheetData } from "../../utils"
import { getDataFromFirestore } from "../../api"
import type { ConfigType, StatisticType } from "../../types"

export default function Statistic() {
  const [data, setData] = useState<ConfigType | null>(null);
  const [data1, setData1] = useState<StatisticType[] | null>();


  useEffect(() => {
    getDataFromFirestore('config', 'uukhzawgfo12mxNhSMkn').then(setData)
  }, [])

  useEffect(() => {
    if (!data?.GOOGLE_SHEETS_API_KEY) return;
    getSheetData('parserStat', data?.GOOGLE_SHEETS_API_KEY).then(sheet => setData1(sheet))
  }, [data])

  return (
    <>
      <h2>Statistic Page</h2>
      {data1 && data1.map(item => (
        <>
          <p key={item.time}>{item.key} - {item.output} - {item.time} - {item.user}</p>
        </>
      ))}
    </>
  )
}
