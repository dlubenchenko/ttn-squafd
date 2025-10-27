import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import * as PiIcons from 'react-icons/pi';
import * as TbIcons from 'react-icons/tb';
import * as MdIcons from 'react-icons/md';
import * as FcIcons from 'react-icons/fc';
import * as IoIcons from 'react-icons/io5';
import * as SiIcons from 'react-icons/si';
import * as FaIcons from 'react-icons/fa6';
import * as CiIcons from 'react-icons/ci';

import { CiFileOn } from 'react-icons/ci';

const iconPacks: Record<string, any> = {
  Ri: RiIcons,
  Bs: BsIcons,
  Ai: AiIcons,
  Pi: PiIcons,
  Tb: TbIcons,
  Md: MdIcons,
  Fc: FcIcons,
  Io: IoIcons,
  Si: SiIcons,
  Fa: FaIcons,
  Ci: CiIcons,
};

export function getIconByName(name?: string): React.ReactNode {
  if (!name) return <CiFileOn />;
  const prefix = name.slice(0, 2);
  const pack = iconPacks[prefix];
  if (pack && pack[name]) {
    const IconComponent = pack[name];
    return <IconComponent />;
  }
  return <CiFileOn />;
}