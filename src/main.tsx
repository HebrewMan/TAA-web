import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import "virtual:uno.css";
import "@rainbow-me/rainbowkit/styles.css";
// import store from '@/redux/store';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <App />
        </Provider>
      </PersistGate>
    </BrowserRouter>
  </StrictMode>
);

// store.subscribe(()=>{
//   root.render(
//     <StrictMode>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </StrictMode>
//   );
// })
