import Routers from "./router";
import { useLocation } from "react-router-dom";
import Footer from "./components/footer";
import Web3Provider from "@/components/WalletConnect";
import ConnectButton from "@/components/ConnectButton";
function App() {
  const location = useLocation();
  const isHomeOrTasks =
    location.pathname === "/knapsack" || location.pathname === "/tasks";
  return (
    <Web3Provider>
      <ConnectButton></ConnectButton>
      <Routers />
      {!isHomeOrTasks && <Footer />}
    </Web3Provider>
  );
}

export default App;
