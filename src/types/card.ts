export type Card = {
  id: string;
  title: string;
  description: string;
  createdAt: number;
  updatedAt: number;
};

export interface CardWithCount extends Card {
  responseCount: number;
}
