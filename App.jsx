import { Routes, Route } from "react-router-dom";
import MainLayout from "./src/components/layouts/MainLayout";
import Home from "./src/pages/Home";
import BlogList from "./src/pages/BlogList";
import BlogDetail from "./src/pages/BlogDetail";
import Contact from "./src/pages/Contact";
import NotFound from "./src/pages/NotFound";
import About from "./src/components/About";
import BlogCard from "./src/components/ui/BlogCard";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
         
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
