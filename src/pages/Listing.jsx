import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Plus,
  Trash2,
  Globe,
  Image as ImageIcon,
  MapPin,
  Phone,
  Layers,
} from "lucide-react";
import { getCategoriesAPI } from "../features/auth/api";

const Listing = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    address: "",
    phone: "",
    youtube: "",
    linkedin: "",
    facebook: "",
  });

  const [images, setImages] = useState([]);
  const [items, setItems] = useState([{ name: "", price: "" }]);

  // Style Constants
  const theme = {
    primary: "#001f3f", // Deep Indigo
    accent: "#f39c12", // Gold
    lightBg: "#f8f9fa",
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const newItems = [...items];
    newItems[index][e.target.name] = e.target.value;
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { name: "", price: "" }]);
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoriesAPI();
        if (res.success) {
          setCategories(res.categories);
        }
      } catch (err) {
        toast.error("Failed to load categories ❌");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: theme.lightBg }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div
              className="card border-0 shadow-lg"
              style={{ borderRadius: "20px" }}
            >
              {/* Header */}
              <div
                className="p-5 text-white text-center"
                style={{
                  backgroundColor: theme.primary,
                  borderRadius: "20px 20px 0 0",
                }}
              >
                <h2 className="fw-bold mb-2">Create New Listing</h2>
                <p className="opacity-75">
                  Fill in the details below to showcase your property or service
                </p>
              </div>

              <form className="p-4 p-md-5" onSubmit={(e) => e.preventDefault()}>
                {/* Basic Info Section */}
                <div className="mb-5">
                  <h5
                    className="text-uppercase fw-bold mb-4"
                    style={{ color: theme.primary, letterSpacing: "1px" }}
                  >
                    <Layers size={20} className="me-2" /> Basic Information
                  </h5>
                  <div className="row g-4">
                    <div className="col-md-8">
                      <label className="form-label small fw-bold">
                        Listing Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="form-control form-control-lg border-0 bg-light"
                        placeholder="e.g. Modern 3BHK Apartment"
                        onChange={handleInputChange}
                      />
                    </div>
                    {/* <div className="col-md-4">
                      <label className="form-label small fw-bold">
                        Category
                      </label>
                      <select
                        name="category"
                        className="form-select form-control-lg border-0 bg-light"
                        onChange={handleInputChange}
                      >
                        <option value="">Select...</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Hotels">Hotels</option>
                        <option value="Services">Services</option>
                      </select>
                    </div> */}
                    <div className="col-md-4">
                      <label className="form-label small fw-bold">
                        Category
                      </label>
                      <select
                        name="category"
                        className="form-select form-control-lg border-0 bg-light"
                        onChange={handleInputChange}
                      >
                        <option value="">Select...</option>

                        {/* Map through the API categories */}
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold">
                        Description
                      </label>
                      <textarea
                        name="description"
                        rows="4"
                        className="form-control border-0 bg-light"
                        placeholder="Describe the highlights..."
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Contact & Location */}
                <div className="mb-5">
                  <h5
                    className="text-uppercase fw-bold mb-4"
                    style={{ color: theme.primary, letterSpacing: "1px" }}
                  >
                    <MapPin size={20} className="me-2" /> Location & Contact
                  </h5>
                  <div className="row g-4">
                    <div className="col-md-8">
                      <label className="form-label small fw-bold">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        className="form-control border-0 bg-light"
                        placeholder="Full street address"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-bold">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phone"
                        className="form-control border-0 bg-light"
                        placeholder="+91 ..."
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Media Section */}
                <div className="mb-5">
                  <h5
                    className="text-uppercase fw-bold mb-4"
                    style={{ color: theme.primary, letterSpacing: "1px" }}
                  >
                    <ImageIcon size={20} className="me-2" /> Gallery
                  </h5>
                  <div
                    className="upload-box border-dashed p-5 text-center bg-light rounded-4"
                    style={{ border: "2px dashed #ccc" }}
                  >
                    <input
                      type="file"
                      multiple
                      className="form-control d-none"
                      id="imageUpload"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="imageUpload" style={{ cursor: "pointer" }}>
                      <div className="btn btn-outline-dark mb-2">
                        Upload Images
                      </div>
                      <p className="text-muted small mb-0">
                        {images.length} files selected
                      </p>
                    </label>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="mb-5">
                  <h5
                    className="text-uppercase fw-bold mb-4"
                    style={{ color: theme.primary, letterSpacing: "1px" }}
                  >
                    <Globe size={20} className="me-2" /> Social Presence
                  </h5>
                  <div className="row g-3">
                    {["facebook", "linkedin", "youtube"].map((social) => (
                      <div className="col-md-4" key={social}>
                        <div className="input-group">
                          <span className="input-group-text border-0 bg-white text-capitalize">
                            {social[0]}
                          </span>
                          <input
                            type="url"
                            name={social}
                            className="form-control border-0 bg-light"
                            placeholder={`${social} URL`}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing / Items Section */}
                <div
                  className="mb-5 p-4 rounded-4"
                  style={{ backgroundColor: "#f0f4f8" }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5
                      className="text-uppercase fw-bold mb-0"
                      style={{ color: theme.primary }}
                    >
                      Items & Pricing
                    </h5>
                    <button
                      type="button"
                      onClick={addItem}
                      className="btn btn-sm text-white px-3"
                      style={{ backgroundColor: theme.accent }}
                    >
                      <Plus size={16} /> Add More
                    </button>
                  </div>

                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="row g-3 mb-3 align-items-end animate-fade-in"
                    >
                      <div className="col-md-7">
                        <label className="text-xs fw-bold text-muted mb-1">
                          Item/Service Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={item.name}
                          className="form-control border-0 shadow-sm"
                          placeholder="e.g. Master Bedroom"
                          onChange={(e) => handleItemChange(index, e)}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="text-xs fw-bold text-muted mb-1">
                          Price (₹)
                        </label>
                        <input
                          type="text"
                          name="price"
                          value={item.price}
                          className="form-control border-0 shadow-sm"
                          placeholder="5000"
                          onChange={(e) => handleItemChange(index, e)}
                        />
                      </div>
                      <div className="col-md-2">
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="btn btn-outline-danger border-0 w-100 shadow-sm"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Submit Button */}
                <div className="text-center mt-5">
                  <button
                    type="submit"
                    className="btn btn-lg text-white px-5 py-3 fw-bold shadow"
                    style={{
                      backgroundColor: theme.primary,
                      borderRadius: "12px",
                      width: "100%",
                    }}
                  >
                    Publish Listing Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
