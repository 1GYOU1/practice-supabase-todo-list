"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 쿼리 관련된 요청들의 캐시 관리 역할
export const queryClient = new QueryClient({});

export default function ReactQueryClientProvider({
  children,
}: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
