export type MeData = {
  id: string;
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt?: number;
  updatedAt?: number;
  avatarUrl?: string;
};

export type MeChangeFields = Omit<MeData, 'uid' | 'id' | 'createdAt' | 'updatedAt'>;
