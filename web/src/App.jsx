import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import { AlertProvider } from "./contexts/alert.context";
import Configurator from "./pages/configurator";
import Navbar from "./components/ui/navbar/Navbar";

function App() {
  return (
    <>
      <main className="flex-shrink-0">
        <Navbar />
        <AlertProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/configurator" element={<Configurator />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AlertProvider>
      </main>
    </>
  );
}

export default App;
