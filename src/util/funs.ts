export const getDetailRoute = (id: string | number, route: string) =>
  `${route}/${id}`;
import { clsx } from 'clsx';
export const cn = clsx;