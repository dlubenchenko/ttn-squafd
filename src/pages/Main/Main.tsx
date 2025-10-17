import { Button } from "antd";
import { useEffect } from "react";
import { useMenuContext } from "../../context/MenuContext";
import Spinner from "../../components/common/Spinner/Spinner";
import { useAuthContext } from "../../context";
import { useAppMessage } from "../../hooks";

export default function Main() {
  const { user } = useAuthContext();
  const { menu, menuLoading, loadMenu } = useMenuContext();
  const { logout } = useAuthContext();
  const { showMessageHandler } = useAppMessage();

  const logoutHandler = () => {
    logout();
    showMessageHandler.success('Ви вийшли з системи');
  }


  useEffect(() => {
    if (user) {
      loadMenu();
    }
  }, [user]);

  useEffect(() => {
    if (menu && menu.length > 0) {
      console.log(user);
      console.log(menu);
    }
  }, [menu]);

  if (menuLoading) {
    return <Spinner />
  }


  return (
    <>
      <div>Main Page</div>
      <Button type="primary" onClick={logoutHandler}>Вихід</Button>
    </>
  )
}
