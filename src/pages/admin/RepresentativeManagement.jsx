import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";
import { toast } from "react-toastify";

const RepresentativeManagement = () => {
  const [representatives, setRepresentatives] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    locationInput: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [geocodingLoading, setGeocodingLoading] = useState(false);

  useEffect(() => {
    fetchRepresentatives();
  }, []);

  const fetchRepresentatives = async () => {
    try {
      setFetchLoading(true);
      const response = await axios.get(
        "http://localhost:8000/api/representatives"
      );

      const repsData =
        response.data?.representatives ||
        response.data?.data ||
        response.data ||
        [];

      if (Array.isArray(repsData)) {
        setRepresentatives(repsData);
      } else {
        console.error("API response is not an array:", repsData);
        setRepresentatives([]);
        toast.error("Invalid data format received from server");
      }
    } catch (err) {
      console.error("Error fetching representatives:", err);
      toast.error("Failed to fetch representatives");
      setRepresentatives([]);
    } finally {
      setFetchLoading(false);
    }
  };

  // Geocoding function using OpenStreetMap Nominatim API (free)
  const geocodeAddress = async (address) => {
    try {
      setGeocodingLoading(true);
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}&limit=1`
      );

      if (response.data && response.data.length > 0) {
        const result = response.data[0];
        return {
          coordinates: [parseFloat(result.lon), parseFloat(result.lat)],
          formattedAddress: result.display_name,
        };
      } else {
        throw new Error("Location not found");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      throw new Error("Failed to geocode address");
    } finally {
      setGeocodingLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!formData.locationInput.trim()) {
      toast.error("Location is required");
      return;
    }

    setIsLoading(true);

    try {
      // Geocode the address
      const { coordinates, formattedAddress } = await geocodeAddress(
        formData.locationInput
      );

      const dataToSend = {
        name: formData.name.trim(),
        email: formData.email.trim() || undefined,
        phone: formData.phone.trim() || undefined,
        address: formData.address.trim() || formattedAddress,
        location: {
          type: "Point",
          coordinates: coordinates,
        },
      };

      const token = localStorage.getItem("adminToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      if (editingId) {
        // Update existing representative
        await axios.put(
          `http://localhost:8000/api/representatives/${editingId}`,
          dataToSend,
          config
        );
        toast.success("Representative updated successfully");
        setEditingId(null);
      } else {
        // Add new representative
        await axios.post(
          "http://localhost:8000/api/representatives",
          dataToSend,
          config
        );
        toast.success("Representative added successfully");
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        locationInput: "",
      });

      fetchRepresentatives();
    } catch (err) {
      console.error("Submit error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to save representative";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (rep) => {
    setFormData({
      name: rep.name,
      email: rep.email || "",
      phone: rep.phone || "",
      address: rep.address || "",
      locationInput:
        rep.address ||
        `${rep.location.coordinates[1]}, ${rep.location.coordinates[0]}`,
    });
    setEditingId(rep._id);
  };

  const handleDelete = async (repId) => {
    if (
      !window.confirm("Are you sure you want to delete this representative?")
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:8000/api/representatives/${repId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Representative deleted successfully");
      fetchRepresentatives();
    } catch (err) {
      console.error("Delete error:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to delete representative";
      toast.error(errorMessage);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      locationInput: "",
    });
  };

  const testGeocoding = async () => {
    if (!formData.locationInput.trim()) {
      toast.error("Please enter a location first");
      return;
    }

    try {
      const { coordinates, formattedAddress } = await geocodeAddress(
        formData.locationInput
      );
      toast.success(`Found: ${formattedAddress}`);
      setFormData((prev) => ({
        ...prev,
        address: formattedAddress,
      }));
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Representatives Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add/Edit Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Representative" : "Add New Representative"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter representative name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Location *</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    name="locationInput"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={formData.locationInput}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter city, address, or coordinates"
                  />
                  <button
                    type="button"
                    onClick={testGeocoding}
                    disabled={geocodingLoading}
                    className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                  >
                    {geocodingLoading ? "..." : "Test"}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Enter city name, full address, or coordinates (lat, lng)
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Address</label>
                <textarea
                  name="address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows="3"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Detailed address (auto-filled from location)"
                />
              </div>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors disabled:bg-orange-300 disabled:cursor-not-allowed"
                  disabled={isLoading || geocodingLoading}
                >
                  {isLoading
                    ? editingId
                      ? "Updating..."
                      : "Adding..."
                    : editingId
                    ? "Update Representative"
                    : "Add Representative"}
                </button>

                {editingId && (
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

          {/* Representatives List */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Representatives List</h2>

            {fetchLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {representatives && representatives.length > 0 ? (
                  representatives.map((rep) => (
                    <div
                      key={rep._id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-lg text-gray-800">
                          {rep.name}
                        </h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(rep)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                            title="Edit representative"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(rep._id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                            title="Delete representative"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      {rep.email && (
                        <p className="text-gray-600 text-sm mb-1">
                          <strong>Email:</strong> {rep.email}
                        </p>
                      )}

                      {rep.phone && (
                        <p className="text-gray-600 text-sm mb-1">
                          <strong>Phone:</strong> {rep.phone}
                        </p>
                      )}

                      {rep.address && (
                        <p className="text-gray-600 text-sm mb-2">
                          <strong>Address:</strong> {rep.address}
                        </p>
                      )}

                      <p className="text-gray-500 text-xs mb-2">
                        <strong>Coordinates:</strong>{" "}
                        {rep.location.coordinates[1].toFixed(6)},{" "}
                        {rep.location.coordinates[0].toFixed(6)}
                      </p>

                      <p className="text-gray-500 text-xs">
                        Added: {new Date(rep.createdAt).toLocaleDateString()}
                      </p>

                      <div className="mt-2">
                        <a
                          href={`https://www.google.com/maps?q=${rep.location.coordinates[1]},${rep.location.coordinates[0]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                        >
                          View on Map
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No representatives found</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Add your first representative using the form
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

export default RepresentativeManagement;
