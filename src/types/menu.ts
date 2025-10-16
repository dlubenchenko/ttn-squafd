import { type UserRoles } from './user';
import { type UserDivision } from './user';
export interface MenuContextValueType {
  key: string;
  title: string;
  path: string;
  roles?: UserRoles[];
  visible?: boolean | string;
  children?: string;
  icon?: string;
  division?: UserDivision[];
}

export type MenuContextType = {
  menu: MenuContextValueType[] | null;
  setMenu: (menu: MenuContextValueType[] | null) => void;
  menuLoading: boolean;
  setMenuLoading: (loading: boolean) => void;
  loadMenu: () => Promise<void>
};

export interface RawMenuValue {
  key: string;
  title: string;
  path: string;
  roles?: string;
  visible?: boolean | string;
  children?: string;
  icon?: string;
  division?: UserDivision[];
}