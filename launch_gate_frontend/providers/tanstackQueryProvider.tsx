"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react";

const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                retry: 5,
                retryDelay: 1000
            }
        }
    }));

function TanstackQueryProvider({ children }: {
    children: ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default TanstackQueryProvider
