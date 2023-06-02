import Routers from './router';
import { useLocation } from 'react-router-dom';
import Footer from './components/footer';
function App() {
  const location = useLocation();
  const isHomeOrTasks = location.pathname === '/knapsack' || location.pathname === '/tasks';
  return (
    <>
      <Routers />
      {!isHomeOrTasks && <Footer />}
    </>
  )
}

export default App
