import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { api, queryKeys } from '@/lib/api/client';

export function useBetaAccess() {
  const { data: session } = useSession();
  
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.betaAccess.all,
    queryFn: () => api.auth.getBetaStatus(),
    enabled: !!session?.address,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return {
    hasBetaAccess: data?.hasBetaAccess || false,
    isLoading: session?.address ? isLoading : false,
    error,
  };
}