import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(userId ? `/api/users/${userId}` : null, fetcher,{revalidateOnFocus : false});

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useUser;