import Routers from "./router";
import { useLocation } from "react-router-dom";
import Footer from "./components/footer";
import Web3Provider from "@/components/WalletConnect";
import UseWeb3Provider from "./providers";

function App() {
  const location = useLocation();
  const isHomeOrTasks =
    location.pathname === "/knapsack" || location.pathname === "/tasks";
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
