import Routers from "./router";
import { useLocation } from "react-router-dom";
import Footer from "./components/footer";
import Web3Provider from "@/components/WalletConnect";
import UseWeb3Provider from "./providers";
import "./App.css";
import { videoStart } from "./utils";
function App() {
  const location = useLocation();
  const isHomeOrTasks =
    location.pathname === "/knapsack" || location.pathname === "/tasks";

  if (!localStorage.taaVideo || localStorage.taaVideo == 1) {
    document.addEventListener("click", () => {
      localStorage.taaVideo = 1;
      videoStart();
    });
  }

  return (
    <Web3Provider>
      <UseWeb3Provider>
        <Routers />
        {!isHomeOrTasks && <Footer />}
      </UseWeb3Provider>
    </Web3Provider>
  );
}

export default App;
