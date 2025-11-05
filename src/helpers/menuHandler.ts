// helpers/menuHandler.ts
import { type RawMenuValue } from "../types";

// Пошук активного пункту меню
export function getActiveMenuItem(flatMenu: RawMenuValue[], pathname: string) {
  return flatMenu.find(item => {
    if (item.path && item.path.includes('/:')) {
      const base = item.path.split('/:')[0];
      return pathname.startsWith(base);
    }
    return item.path === pathname;
  });
}

// Обробник кліку по меню
export function handleMenuClick(flatMenu: RawMenuValue[], key: string, navigate: (path: string) => void) {
  const item = flatMenu.find(i => i.key === key);
  if (item && item.path) {
    navigate(item.path);
  }
}

// "main" — ключ головної сторінки
export function sortMenu(menu: RawMenuValue[], mainKey = 'main'): RawMenuValue[] {
  // Знаходимо головний пункт
  const main = menu.find(item => item.key === mainKey);
  // Інші пункти
  const rest = menu.filter(item => item.key !== mainKey);
  // Повертаємо новий масив з головною сторінкою на початку
  return main ? [main, ...rest] : rest;
}