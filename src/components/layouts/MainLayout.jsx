import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import SmoothScroll from "../animations/SmoothScroll";
import ScrollToTop from "../common/ScrollToTop";

const MainLayout = () => {
  return (
    <SmoothScroll>
      <ScrollToTop />
      <header>
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </SmoothScroll>
  );
};

export default MainLayout;
 