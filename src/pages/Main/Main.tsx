import { useAuthContext } from "../../context"
import { getColor } from "../../utils/colors";

export default function Main() {
  const { user } = useAuthContext();

  return (
    <>
      <div>
        <h1>Головна сторінка</h1>
        {user && (
          <div>
            <p>Вітаю, <strong>{user.displayName || user.email}</strong>!</p>
            <p>Роль: <strong style={{ color: getColor(user.role) }}>{user.role.toUpperCase()}</strong></p>
            {user.department && <p>Департамент: <strong>{user.department}</strong></p>}
            {user.division && <p>Відділ: <strong style={{ color: getColor(user.division) }}>{user.division.toUpperCase()}</strong></p>}
            <p>На основі вашої ролі та відділу формується доступне меню.</p>
          </div>
        )}
      </div>
    </>
  )
}
