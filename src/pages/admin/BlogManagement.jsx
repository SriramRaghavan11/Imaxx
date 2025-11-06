// BlogManagement.jsx - Updated for Cloudinary URLs
import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";
import { toast } from "react-toastify";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/blogs");
      console.log("API response data:", response.data);

      // Handle the response structure properly
      if (Array.isArray(response.data)) {
        setBlogs(response.data);
      } else if (response.data.blogs && Array.isArray(response.data.blogs)) {
        setBlogs(response.data.blogs);
      } else {
        setBlogs([]);
        toast.error("Unexpected response format from API");
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      toast.error("Failed to fetch blogs");
      setBlogs([]);
    }
  };

  // Handle image file selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate required fields before submission
    if (!title.trim()) {
      toast.error("Title is required");
      setIsLoading(false);
      return;
    }

    if (!content.trim()) {
      toast.error("Content is required");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("content", content.trim());
    if (image) {
      formData.append("image", image);
    }

    // Debug: Log form data
    console.log("Form data being sent:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        toast.error("No authentication token found");
        setIsLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      if (editingBlog) {
        // Update existing blog
        await axios.put(
          `http://localhost:8000/api/blogs/${editingBlog._id}`,
          formData,
          config
        );
        toast.success("Blog updated successfully");
        setEditingBlog(null);
      } else {
        // Create new blog
        await axios.post("http://localhost:8000/api/blogs", formData, config);
        toast.success("Blog added successfully");
      }

      // Reset form
      resetForm();
      fetchBlogs();
    } catch (err) {
      console.error("Error submitting blog:", err);
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to save blog";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImage(null);
    setImagePreview(null);
    const fileInput = document.getElementById("image-input");
    if (fileInput) fileInput.value = "";
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setContent(blog.content);
    setImage(null);
    // Set preview to existing image if available
    setImagePreview(blog.imageUrl || null);
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        toast.error("No authentication token found");
        return;
      }

      await axios.delete(`http://localhost:8000/api/blogs/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Blog deleted successfully");
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to delete blog";
      toast.error(errorMessage);
    }
  };

  const cancelEdit = () => {
    setEditingBlog(null);
    resetForm();
  };

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Blog Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingBlog ? "Edit Blog" : "Add New Blog"}
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
                  placeholder="Enter blog title"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Content</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows="5"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  placeholder="Enter blog content"
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Image (Optional)
                </label>
                <input
                  id="image-input"
                  type="file"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={handleImageChange}
                  accept="image/*"
                />

                {/* Image Preview */}
                {imagePreview && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-md border"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors disabled:bg-orange-300 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Saving..."
                    : editingBlog
                    ? "Update Blog"
                    : "Add Blog"}
                </button>
                {editingBlog && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Existing Blogs</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <div key={blog._id} className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-lg">{blog.title}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-2">
                      Created: {new Date(blog.createdAt).toLocaleDateString()}
                    </p>

                    <p className="text-gray-600 text-sm mb-2">
                      Author: {blog.author?.username || "Unknown"}
                    </p>

                    <p className="text-gray-600 text-sm mb-2">
                      Published:{" "}
                      {new Date(
                        blog.publishedAt || blog.createdAt
                      ).toLocaleDateString()}
                    </p>

                    {/* Cloudinary Image Display */}
                    {blog.imageUrl && (
                      <div className="mb-3">
                        <img
                          src={blog.imageUrl}
                          alt={blog.title}
                          className="w-full h-48 object-cover rounded-md"
                          onError={(e) => {
                            console.error(
                              "Error loading image:",
                              blog.imageUrl
                            );
                            e.target.style.display = "none";
                          }}
                          onLoad={() => {
                            console.log(
                              "Image loaded successfully:",
                              blog.imageUrl
                            );
                          }}
                        />
                      </div>
                    )}

                    <p className="text-gray-700 line-clamp-3">{blog.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No blogs found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BlogManagement;
