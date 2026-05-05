import React from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  });
}

export function render(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  const testQueryClient = createTestQueryClient();

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light">
        <QueryClientProvider client={testQueryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";
export { userEvent } from "@testing-library/user-event";
