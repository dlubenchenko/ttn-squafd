export const RoleColor = {
  admin: '#007BFF',
  teamlead: '#6C757D',
  agent: '#28A745',
  guest: '#FF7B54'
} as const;

export type RoleKey = keyof typeof RoleColor;

export const DivisionColor = {
  tkting: '#5A189A',
  'r&r': '#4361EE',
  invol: '#4CC9F0',
  analytic: '#F72585',
  all: '#B5179E'
} as const;

export type DivisionKey = keyof typeof DivisionColor;