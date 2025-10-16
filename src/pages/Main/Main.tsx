import { Button } from "antd";
import { useContext, useEffect } from "react";
import { MenuContext } from "../../context/MenuContext";
import Spinner from "../../components/common/Spinner/Spinner";
import { useAuthContext } from "../../context";

export default function Main() {
  const { menuLoading, loadMenu } = useContext(MenuContext)
  const { user } = useAuthContext();


  useEffect(() => {
    loadMenu()
    if (user && user.email) {
      console.log(user);
      // Якщо треба — можна ще підвантажити додаткові дані
    }

  }, [user])

  if (menuLoading) {
    return <Spinner />
  }


  return (
    <>
      <div>Main Page</div>
      <Button type="primary">AntD button</Button>
    </>
  )
}
