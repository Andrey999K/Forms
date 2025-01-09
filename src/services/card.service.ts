import { Card } from '@/types/card';
import { http } from '@/services/http.service';

const cardsEndPoint = 'cards/';

export const cardService = {
  fetchAll: async (): Promise<Card[]> => {
    const { data } = await http.get(cardsEndPoint);
    return data.content;
  },
  remove: async (cardId: string): Promise<void> => {
    await http.delete(cardsEndPoint + cardId);
  },
};
