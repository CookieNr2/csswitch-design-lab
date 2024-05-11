import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import UserData from "./pages/user-account/user-data";
import UserConfigsList from "./pages/user-account/user-configs-list";
import { AlertProvider } from "./contexts/alert.context";
import Configurator from "./pages/configurator";
import Navbar from "./components/ui/navbar/Navbar";
import Footer from "./components/ui/footer/Footer";

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
            <Route path="/register" element={<Register />} />
            <Route path="/profile/data" element={<UserData />} />
            <Route
              path="/profile/configurations"
              element={<UserConfigsList />}
            />
          </Routes>
        </AlertProvider>
        <Footer />
      </main>
    </>
  );
}

export default App;
