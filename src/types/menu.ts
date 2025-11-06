import { type UserRoles, type UserDivision } from './user';
export interface MenuContextValueType {
  key: string;
  label: string;
  path: string;
  roles?: UserRoles[] | string;
  available?: boolean | string;
  childrenOf?: string | null;
  children?: MenuContextValueType[] | null;
  icon?: string;
  division?: UserDivision[] | string;
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
  label: string;
  path: string;
  roles?: UserRoles[] | string;
  available?: boolean | string;
  childrenOf?: string | null;
  children?: RawMenuValue[] | null;
  icon?: string;
  division?: UserDivision[] | string;
}

export interface LoadMenuProps {
  role: UserRoles
  division: UserDivision
  setMenuLoading: (loading: boolean) => void;
  setMenu: (menu: MenuContextValueType[] | null) => void;
}
