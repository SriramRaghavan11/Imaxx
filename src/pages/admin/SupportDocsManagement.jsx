import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";
import { toast } from "react-toastify";

const SupportDocsManagement = () => {
  const [docs, setDocs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      setFetchLoading(true);
      const response = await axios.get(
        "http://localhost:8000/api/support-docs"
      );

      // Fix: Handle the API response structure properly
      const docsData =
        response.data?.docs || response.data?.data || response.data || [];

      // Ensure docsData is an array
      if (Array.isArray(docsData)) {
        setDocs(docsData);
      } else {
        console.error("API response is not an array:", docsData);
        setDocs([]);
        toast.error("Invalid data format received from server");
      }
    } catch (err) {
      console.error("Error fetching docs:", err);
      toast.error("Failed to fetch support documents");
      setDocs([]); // Set empty array on error
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    try {
      const token = localStorage.getItem("adminToken");
      await axios.post("http://localhost:8000/api/support-docs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Document uploaded successfully");
      setTitle("");
      setDescription("");
      setFile(null);

      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";

      fetchDocs();
    } catch (err) {
      console.error("Upload error:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to upload document";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (docId) => {
    if (!window.confirm("Are you sure you want to delete this document?")) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:8000/api/support-docs/${docId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Document deleted successfully");
      fetchDocs();
    } catch (err) {
      console.error("Delete error:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to delete document";
      toast.error(errorMessage);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Support Documents Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Document</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Enter document title"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter document description (optional)"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">File *</label>
                <input
                  type="file"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG
                </p>
              </div>

              <button
                type="submit"
                className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors disabled:bg-orange-300 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Uploading..." : "Upload Document"}
              </button>
            </form>
          </div>

          {/* Documents List */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Existing Documents</h2>

            {fetchLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {docs && docs.length > 0 ? (
                  docs.map((doc) => (
                    <div
                      key={doc._id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-lg text-gray-800">
                          {doc.title}
                        </h3>
                        <button
                          onClick={() => handleDelete(doc._id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                          title="Delete document"
                        >
                          Delete
                        </button>
                      </div>

                      <p className="text-gray-600 text-sm mb-2">
                        Uploaded on:{" "}
                        {new Date(
                          doc.createdAt || doc.uploadedAt
                        ).toLocaleDateString()}
                      </p>

                      {doc.description && (
                        <p className="text-gray-700 mb-3 text-sm">
                          {doc.description}
                        </p>
                      )}

                      {doc.author && (
                        <p className="text-gray-500 text-xs mb-3">
                          By: {doc.author.username || "Unknown"}
                        </p>
                      )}

                      <div className="flex space-x-2">
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700 transition-colors"
                        >
                          View/Download
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No documents found</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Upload your first document using the form
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SupportDocsManagement;
