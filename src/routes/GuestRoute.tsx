import { useGetCurrentUserQuery } from '@/redux/auth';
import { Loader } from '@/components/common';
import { ReactNode } from 'react';
import { NotFoundPage } from '@/pages/NotFoundPage/Page';
import { PageLayout } from '@/layouts/PageLayout';

export const GuestRoute = ({ children }: { children: ReactNode }) => {
  const { data: user, isLoading: loading } = useGetCurrentUserQuery();

  if (loading) return <Loader />;
  return user ? (
    <PageLayout>
      <NotFoundPage />
    </PageLayout>
  ) : (
    <>{children}</>
  );
};
