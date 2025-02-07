import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import ErrorBoundary from "./features/app/components/error-boundary/ErrorBoundary";
import Loading from "./features/app/components/loading/Loading";

import "./styles/common.scss";
import "./styles/main.scss";
import { USER } from "./features/app/utils/constants/LocalStorageKeys";
import { LocalStorage } from "./features/app/service/LocalStorage";
import { userReducerActions } from "./store/reducers/userReducer";
import { useDispatch } from "react-redux";

const RootRouter = lazy(() => import("./routing/root/RootRouter"));

function App() {

  const queryClient = new QueryClient();
  const dispatch = useDispatch();
  const { setIsAuth } = userReducerActions;

  useEffect(() => {
    const onStorageChange = () => {
      dispatch(setIsAuth(Boolean(LocalStorage.get(USER))));
    };

    window.addEventListener("storage", onStorageChange);

    return () => {
      window.removeEventListener("storage", onStorageChange);
    };
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
