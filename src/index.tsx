import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

// 将 Apollo 客户端注入 React 应用
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";

// 导入i18n配置
import './i18n';

// import 'normalize.css/normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import './styles/global.module.css'

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
