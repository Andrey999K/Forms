export type MeData = {
  id: string;
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt?: number;
  updatedAt?: number;
  avatarHash?: string;
};

export type MeChangeFields = Omit<MeData, 'uid' | 'id' | 'createdAt' | 'updatedAt'>;
