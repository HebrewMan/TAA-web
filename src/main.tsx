import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "@/store";
import "./index.css";
import "virtual:uno.css";
import "@rainbow-me/rainbowkit/styles.css";
import { AliveScope } from "react-activation";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
        <AliveScope>
          <App />
        </AliveScope>
      </Provider>
  </BrowserRouter>
);