import { Button } from "antd";
import { useContext, useEffect } from "react";
import { MenuContext } from "../../context/MenuContext";
import Spinner from "../../components/common/Spinner/Spinner";

export default function Main() {
  const { menuLoading, loadMenu } = useContext(MenuContext)
  

  useEffect(() => {
    loadMenu()

  }, [])

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
