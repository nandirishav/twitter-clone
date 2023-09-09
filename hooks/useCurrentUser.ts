"use client"
import useSWR from 'swr'
import fetcher from '@/libs/fetcher';

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher,{revalidateOnFocus : false});  

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useCurrentUser;