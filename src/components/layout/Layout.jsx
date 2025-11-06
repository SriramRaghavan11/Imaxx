// src/components/layout/Layout.jsx
import { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMenuToggle={setIsMenuOpen} />
      <main className="flex-1 pt-20">
        <Outlet context={{ isMenuOpen }} />
      </main>
      <Footer />
    </div>
  );
};

// Custom hook to easily access the context in child components
export function useMenu() {
  return useOutletContext();
}

export default Layout;
