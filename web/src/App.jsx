import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Configurator from "./pages/configurator";
import Navbar from "./components/ui/navbar/Navbar";

function App() {
  return (
    <>
      <main className="flex-shrink-0">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/configurator" element={<Configurator />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
