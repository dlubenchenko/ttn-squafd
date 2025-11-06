import { useEffect, useState } from "react"
import { getSheetData } from "../../utils"
import { getDataFromFirestore } from "../../api"
import type { ConfigType, User } from "../../types"

export default function UserEdit() {
  const [data, setData] = useState<ConfigType | null>(null);
  const [data1, setData1] = useState<User[] | null>();


  useEffect(() => {
    getDataFromFirestore('config', 'uukhzawgfo12mxNhSMkn').then(setData)
  }, [])

  useEffect(() => {
    if (!data?.GOOGLE_SHEETS_API_KEY) return;
    getSheetData('users', data?.GOOGLE_SHEETS_API_KEY).then(sheet => setData1(sheet))
  }, [data])

  return (
    <>
      <h2>UserEdit Page</h2>
      {data1 && data1.map(item => (
        <>
          <p key={item.email}>{item.department} - {item.division} - {item.role} - {item.nameUkr}</p>
        </>
      ))}
    </>
  )
}
