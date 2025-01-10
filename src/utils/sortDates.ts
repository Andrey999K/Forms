import { SortType } from './types.ts';
import { parseDate } from './parseDate.ts';

export const sortDates = <T extends { date: string }>(mass: T[], sortOrder: SortType): T[] => {
  return sortOrder === 'desc'
    ? mass.sort((a, b) => {
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        return dateA.getTime() - dateB.getTime();
      })
    : mass.sort((a, b) => {
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        return dateB.getTime() - dateA.getTime();
      });
};
