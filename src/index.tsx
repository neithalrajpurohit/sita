import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import { ConnectedRouter } from "connected-react-router";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import configureStore, { history } from "./configureStore";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { PersistGate } from "redux-persist/integration/react";
import ErrorHandling from "./component/ErrorHandling";
import reportWebVitals from "./reportWebVitals";
import { Suspense } from "react";
import "./index.css";
import "./i18n";
import LazyLoading from "./component/LazyLoading";

const initialState = (window as any).initialReduxState;
const { store, persistor } = configureStore(initialState);

const rootElement = document.getElementById("root");

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <>
      <ErrorHandling
        message={error?.message}
        resetErrorBoundary={resetErrorBoundary}
      />
    </>
  );
}

export type AppDispatch = typeof store.dispatch;

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Suspense fallback={<LazyLoading />}>
            <App />
          </Suspense>
        </ConnectedRouter>
      </PersistGate>
    </ErrorBoundary>
  </Provider>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
