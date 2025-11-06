import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AdminLayout = ({ children }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-orange-600">
                  IMAXX Admin
                </h1>
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/admin/dashboard"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive("/admin/dashboard")
                      ? "border-orange-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/blogs"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive("/admin/blogs")
                      ? "border-orange-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Blogs
                </Link>
                <Link
                  to="/admin/newsletters"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive("/admin/newsletters")
                      ? "border-orange-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Newsletters
                </Link>
                <Link
                  to="/admin/support-docs"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive("/admin/support-docs")
                      ? "border-orange-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Support Docs
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button
                onClick={logout}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
