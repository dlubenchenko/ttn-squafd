import type { MenuProps } from "antd";
import type { MenuContextValueType } from "../types";
import { getIconByName } from "./getIconByName";

export function buildMenuTree(flatMenu: MenuContextValueType[]): MenuContextValueType[] {
  // Копія для роботи, щоб не мутувати оригінал
  const menuCopy = flatMenu.map(item => ({ ...item }));

  // Додаємо дочірні елементи до батьків
  menuCopy.forEach(item => {

    if (item.childrenOf) {
      const parent = menuCopy.find(parentItem => parentItem.label === item.childrenOf);
      if (parent) {
        if (!parent.children) parent.children = [];
        // Додаємо дочірній елемент у масив children батька
        (parent.children as MenuContextValueType[]).push(item);
      }
    }
  });

  // Повертаємо тільки ті, що не мають childrenOf і самі не є дочірніми
  return menuCopy.filter(item => !item.childrenOf);
}

export function mapMenuToAntdItems(menu: MenuContextValueType[]): MenuProps['items'] {
  return menu.map(item => ({
    key: item.key,
    label: item.label,
    icon: getIconByName(item.icon) || undefined,
    children: item.children && item.children.length > 0
      ? mapMenuToAntdItems(item.children)
      : undefined,
  }));
}