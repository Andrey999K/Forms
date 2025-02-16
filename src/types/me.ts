export type MeData = {
  id: string;
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt?: number;
  updatedAt?: number;
  avatarUrl?: string;
  formsCount?: number;
};

export type MeChangeFields = Omit<MeData, 'uid' | 'id' | 'createdAt' | 'updatedAt'>;
export type ChangePasswordFormValues = {
  currentPassword: string;
  newPassword: string;
};
