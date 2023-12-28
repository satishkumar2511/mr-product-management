import React from "react";
import "./App.css";
import "./i18n";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import routes from "./routes";
import { path } from "./utils/constant";
import { GetToken, TokenFromState } from "./utils/helper";
import useThemeSelector from "./hook/useThemeSelector";
import MainTemplateContainer from "./components/wrapper";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const userToken = TokenFromState() || GetToken();
  const [theme, toggleTheme] = useThemeSelector();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            {routes().map((route) => {
              const WrappedComponent = route.isAuth ? (
                <MainTemplateContainer toggleTheme={toggleTheme}>
                  {route.component()}
                </MainTemplateContainer>
              ) : (
                <route.component />
              );
              return (
                <Route
                  path={route.path}
                  key={route.path}
                  element={WrappedComponent}
                />
              );
            })}
            <Route
              path="/"
              element={
                <Navigate
                  replace
                  to={userToken ? path.PLAYGROUND_PAGE : path.LOGIN_PAGE}
                />
              }
            />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
