import React from "react";
import { App, ZMPRouter, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import { Layout } from "./layout";
import { ConfigProvider } from "./config-provider";
import { Provider } from "react-redux";
import store from "redux/store";

const MyApp = () => {
  return (
    <Provider store={store}>
      <RecoilRoot>
        <ConfigProvider
          cssVariables={{
            "--zmp-background-color": "#f4f5f6",
          }}
        >
          <App>
            <SnackbarProvider>
              <ZMPRouter>
                <Layout />
              </ZMPRouter>
            </SnackbarProvider>
          </App>
        </ConfigProvider>
      </RecoilRoot>
    </Provider>
  );
};
export default MyApp;
