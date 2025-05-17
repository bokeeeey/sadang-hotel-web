import { ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider as Provider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { isDev } from "@constants/env";
import ms from "ms";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: ms("3s"),
    },
  },
});

export default function QueryClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Provider client={client}>
      {children}
      {isDev ? <ReactQueryDevtools /> : null}
    </Provider>
  );
}
