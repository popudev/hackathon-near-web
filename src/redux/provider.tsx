"use client";

import { store } from "./store";
import { useState } from "react";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient());
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      </QueryClientProvider>
    </Provider>
  );
}
