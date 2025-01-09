import { cardService } from '@/services/card.service';
import { Sort } from '@/types';
import { Card } from '@/types/card';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

const CARDS_PER_PAGE = 30;

export const useCards = () => {
  const [list, setList] = useState<Card[]>([]);
  const [search, setSearch] = useState<string>('');
  const [order, setOrder] = useState<Sort>(Sort.DESC);
  const [page, setPage] = useState<number>(0);
  const [hasNext, setHasNext] = useState(true);

  const searchTimeout = useRef<null | NodeJS.Timeout>(null);

  const loadData = async (page: number) => {
    setPage(page);
    if (!hasNext) return;

    try {
      const allCards: Card[] = await cardService.fetchAll();
      const sortedCards = [...allCards].sort((a, b) => {
        let prev = a;
        let next = b;

        if (order === Sort.DESC) {
          prev = b;
          next = a;
        }
        return prev.createdAt > next.createdAt ? 1 : -1;
      });

      const filteredCards = search
        ? sortedCards.filter((card) => card.title.toLowerCase().includes(search.toLowerCase()))
        : sortedCards;

      const paginatedCards = filteredCards.slice(
        (page - 1) * CARDS_PER_PAGE,
        page * CARDS_PER_PAGE
      );

      if (paginatedCards.length < CARDS_PER_PAGE) {
        setHasNext(false);
      }

      setList((prev) => [...prev, ...paginatedCards]);
    } catch (error: any) {
      console.log('####: ');
      toast.error('Не удалось загрузить данные. Попробуйте позже.', error);
      setHasNext(false);
    }
  };

  const loadTimeout = useRef<null | NodeJS.Timeout>(null);
  const debouncedLoadData = (page: number) => {
    if (loadTimeout.current) {
      clearTimeout(loadTimeout.current);
    }

    loadTimeout.current = setTimeout(() => {
      loadData(page);
    }, 400);
  };

  const onSearch = (value: string) => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      setSearch(value);
      clearData();
    }, 300);
  };

  const clearData = () => {
    setList([]);
    setPage(0);
    setHasNext(true);
  };

  return {
    list,
    search,
    setSearch,
    order,
    setOrder,
    page,
    hasNext,
    setHasNext,
    setList,
    onSearch,
    clearData,
    debouncedLoadData,
  };
};
