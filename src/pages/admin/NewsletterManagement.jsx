import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";
import { toast } from "react-toastify";

const NewsletterManagement = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/newsletters");
      setNewsletters(response.data.newsletters || []);
    } catch (err) {
      console.error("Error fetching newsletters:", err);
      toast.error("Failed to fetch newsletters");
      setNewsletters([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    };

    try {
      if (editMode) {
        await axios.put(
          `http://localhost:8000/api/newsletters/${editId}`,
          { title, content },
          config
        );
        toast.success("Newsletter updated successfully");
      } else {
        await axios.post(
          "http://localhost:8000/api/newsletters",
          { title, content },
          config
        );
        toast.success("Newsletter added successfully");
      }

      setTitle("");
      setContent("");
      setEditMode(false);
      setEditId(null);
      fetchNewsletters();
    } catch (err) {
      console.error("Error submitting newsletter:", err);
      toast.error("Failed to submit newsletter");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (newsletter) => {
    setTitle(newsletter.title);
    setContent(newsletter.content);
    setEditMode(true);
    setEditId(newsletter._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this newsletter?"))
      return;

    try {
      await axios.delete(`http://localhost:8000/api/newsletters/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      toast.success("Newsletter deleted");
      fetchNewsletters();
    } catch (err) {
      console.error("Error deleting newsletter:", err);
      toast.error("Failed to delete newsletter");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Newsletter Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              {editMode ? "Edit Newsletter" : "Add New Newsletter"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Content</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows="8"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors disabled:bg-orange-300"
                  disabled={isLoading}
                >
                  {isLoading
                    ? editMode
                      ? "Updating..."
                      : "Adding..."
                    : editMode
                    ? "Update Newsletter"
                    : "Add Newsletter"}
                </button>
                {editMode && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false);
                      setTitle("");
                      setContent("");
                    }}
                    className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Existing Newsletters</h2>
            <div className="space-y-4">
              {newsletters.length > 0 ? (
                newsletters.map((newsletter) => (
                  <div
                    key={newsletter._id}
                    className="border-b border-gray-200 pb-4"
                  >
                    <h3 className="font-medium text-lg">{newsletter.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {new Date(newsletter.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 mb-2 line-clamp-4">
                      {newsletter.content}
                    </p>
                    <div className="flex gap-3 text-sm">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => handleEdit(newsletter)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(newsletter._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No newsletters found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewsletterManagement;
