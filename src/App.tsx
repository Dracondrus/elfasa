import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";

import ErrorBoundary from "./features/app/components/error-boundary/ErrorBoundary";
import Loading from "./features/app/components/loading/Loading";

import "./styles/common.scss"
import "./styles/main.scss"

function App() {
  const queryClient = new QueryClient();
  const RootRouter = lazy(() => import("./routing/root/RootRouter"));

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Suspense fallback={<Loading />}>
              <RootRouter />
            </Suspense>
          </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
