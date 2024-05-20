import React from "react";
import { Route, Routes } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AlertProvider } from "./contexts/alert.context";
import Home from "./pages/home";
import Inspiration from "./pages/inspiration";
import Configurator from "./pages/configurator";
import Login from "./pages/login";
import Register from "./pages/register";
import UserData from "./pages/user-account/user-data";
import UserConfigsList from "./pages/user-account/user-configs-list";
import Navbar from "./components/ui/navbar/Navbar";
import Footer from "./components/ui/footer/Footer";

function App() {
  const cld = new Cloudinary({ cloud: { cloudName: "dn4v19qto" } });

  const img = cld
    .image("cld-sample-5")
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(500).height(500));

  return (
    <>
      <main className="flex-shrink-0">
        <Navbar />
        <AlertProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/configurator" element={<Configurator />} />
            <Route path="/inspiration" element={<Inspiration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/data" element={<UserData />} />
            <Route
              path="/profile/configurations"
              element={<UserConfigsList />}
            />
            <Route path="/profile" element={<UserConfigsList />} />
          </Routes>
        </AlertProvider>
        <Footer />
      </main>
    </>
  );
}

export default App;
