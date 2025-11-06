import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Blogs"
            description="Manage blog posts"
            link="/admin/blogs"
            icon={<BlogIcon />}
          />
          <DashboardCard
            title="Newsletters"
            description="Manage newsletters"
            link="/admin/newsletters"
            icon={<NewsletterIcon />}
          />
          <DashboardCard
            title="Support Docs"
            description="Manage support documents"
            link="/admin/support-docs"
            icon={<SupportIcon />}
          />
          <DashboardCard
            title="Representatives"
            description="Manage representatives"
            link="/admin/representatives"
            icon={<RepIcon />}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

const DashboardCard = ({ title, description, link, icon }) => (
  <Link
    to={link}
    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-orange-300"
  >
    <div className="flex items-center mb-4">
      <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4">
        {icon}
      </div>
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    </div>
    <p className="text-gray-600">{description}</p>
  </Link>
);

// Simple SVG icons
const BlogIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
    />
  </svg>
);

const NewsletterIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const SupportIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const RepIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

export default AdminDashboard;
