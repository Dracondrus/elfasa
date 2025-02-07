import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import ErrorBoundary from "./features/app/components/error-boundary/ErrorBoundary";
import Loading from "./features/app/components/loading/Loading";
import { LocalStorage } from "./hooks/LocalStorage";
import { useAppDispatch } from "./hooks/redux";
import { userReducerActions } from "./store/reducers/userReducer";
import { USER } from "./features/app/utils/constants/LocalStorageKeys";

import "./styles/common.scss"
import "./styles/main.scss"

function App() {
  const queryClient = new QueryClient();
  const RootRouter = lazy(() => import("./routing/root/RootRouter"));

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleStorageChange = () => {
        const user = LocalStorage.get(USER);
        dispatch(userReducerActions.setIsAuth(!!user ));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
    
}, []);
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
