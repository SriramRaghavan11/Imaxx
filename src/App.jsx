// src/App.jsx

import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetails from "./pages/products/ProductDetails";
import Dealers from "./pages/Dealers";
import Support from "./pages/Support";
import Contact from "./pages/Contact";

// Blog and Newsletter Pages
import Blogs from "./pages/Blogs/Blogs";
import BlogDetail from "./pages/Blogs/BlogDetail";
import Newsletter from "./pages/NewsLetter/Newsletter";
import NewsletterDetail from "./pages/NewsLetter/NewsletterDetail";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BlogManagement from "./pages/admin/BlogManagement";
import NewsletterManagement from "./pages/admin/NewsletterManagement";
import SupportDocsManagement from "./pages/admin/SupportDocsManagement";
import RepresentativeManagement from "./pages/admin/RepresentativeManagement";
import PrivateRoute from "./components/auth/PrivateRoute";
// import ComingSoon from "./pages/ComingSoon";
import ScrollToTop from "./components/layout/ScrollToTop";

function App() {
  return (
    // --- FIX: This div is the universal "safety net" for horizontal overflow ---
    <div className="overflow-x-hidden">
      <ScrollToTop />
      <Routes>
        {/* Public Routes with Layout (Header + Footer) */}
        {/* <Route path="/" element={<ComingSoon />} /> */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:productRoute" element={<ProductDetails />} />
          <Route path="dealers" element={<Dealers />} />
          <Route path="support" element={<Support />} />
          <Route path="contact" element={<Contact />} />

          {/* Blog Routes */}
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:id" element={<BlogDetail />} />

          {/* Newsletter Routes */}
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="newsletter/:id" element={<NewsletterDetail />} />
        </Route>

        {/* Admin Routes (without main layout) */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <PrivateRoute>
              <BlogManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/newsletters"
          element={
            <PrivateRoute>
              <NewsletterManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/support-docs"
          element={
            <PrivateRoute>
              <SupportDocsManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/representatives"
          element={
            <PrivateRoute>
              <RepresentativeManagement />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;