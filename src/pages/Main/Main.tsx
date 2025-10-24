import { Button } from "antd";
import { useAuthContext } from "../../context";
import { useAppMessage } from "../../hooks";

export default function Main() {
  const { logout } = useAuthContext();
  const { showMessageHandler } = useAppMessage();

  const logoutHandler = () => {
    logout();
    showMessageHandler.success('Ви вийшли з системи');
  }


  return (
    <>
      <div>Main Page</div>
      <Button type="primary" onClick={logoutHandler}>Вихід</Button>
    </>
  )
}
