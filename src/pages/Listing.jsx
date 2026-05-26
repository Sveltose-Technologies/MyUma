

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Trash2,
  Globe,
  MapPin,
  Layers,
  Loader2,
  Video,
} from "lucide-react";
import {
  getCategoriesAPI,
  createListingAPI,
  getAllSubCategoriesApi,
} from "../services/authService";
import { getUser } from "../utils/storage";

const Listing = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [filteredSubCats, setFilteredSubCats] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    subCategoryId: "",
    description: "",
    address: "",
    phone: "",
    youtubeVideo: "",
    ownerId: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    whatsappNo: "",
  });

  const [images, setImages] = useState([]);
  const [items, setItems] = useState([{ name: "", price: "" }]);

  const theme = {
    primary: "#001f3f",
    accent: "#f39c12",
    lightBg: "#f8f9fa",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, subRes] = await Promise.all([
          getCategoriesAPI(),
          getAllSubCategoriesApi(),
        ]);

        if (catRes.success) setCategories(catRes.categories);
        if (subRes.success) setAllSubCategories(subRes.data);

        const user = getUser();
        if (user) {
          setFormData((prev) => ({ ...prev, ownerId: user.id || user._id }));
        }
      } catch (err) {
        toast.error("Failed to load categories! ❌");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (formData.categoryId) {
      const categoryGroup = allSubCategories.find(
        (group) => group.categoryId?._id === formData.categoryId,
      );
      setFilteredSubCats(categoryGroup ? categoryGroup.subcategories : []);
    } else {
      setFilteredSubCats([]);
    }
  }, [formData.categoryId, allSubCategories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryId") {
      setFormData({ ...formData, categoryId: value, subCategoryId: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
    toast.info(`${files.length} images selected 📸`);
  };
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   // 1. Validations
//   if (!formData.title) return toast.warn("Business Title is required! ⚠️");
//   if (!formData.categoryId) return toast.warn("Please select a Category! ⚠️");
//   if (images.length === 0)
//     return toast.warn("Please upload at least one image! 📸");

//   setLoading(true);
//   const toastId = toast.loading("Publishing your listing... ⏳");

//   try {
//     const data = new FormData();
//     data.append("categoryId", formData.categoryId);
//     data.append("subCategoryId", formData.subCategoryId);
//     data.append("ownerId", formData.ownerId);
//     data.append("title", formData.title);
//     data.append("description", formData.description);
//     data.append("address", formData.address);
//     data.append("phone", formData.phone);
//     data.append("youtubeVideo", formData.youtubeVideo);
//     data.append("whatsappNo", formData.whatsappNo);
//     data.append("items", JSON.stringify(items));
//     images.forEach((file) => data.append("images", file));

//     const res = await createListingAPI(data);

//     // ✅ SUCCESS CHECK (As per your JSON: {message: "Listing created successfully"})
//     if (res.listing || res.message?.includes("successfully")) {
//       // 1. Pehle Toast Update hoga (Isse GREEN dikhega)
//       toast.update(toastId, {
//         render: "Listing Created Successfully! 🎉",
//         type: "success",
//         isLoading: false,
//         autoClose: 3000, // 3 second tak toast dikhega
//       });

//       // 2. Redirect ko 3 second baad rakha hai taaki aap toast dekh sakein
//       // Agar aapko redirect NAHI chahiye, toh niche wali 3 lines delete kar dein

//     } else {
//       // ❌ Error Case
//       toast.update(toastId, {
//         render: res.message || "Failed to create listing ❌",
//         type: "error",
//         isLoading: false,
//         autoClose: 3000,
//       });
//     }
//   } catch (err) {
//     // ❌ Network Error
//     toast.update(toastId, {
//       render: err.response?.data?.message || "Something went wrong! ❌",
//       type: "error",
//       isLoading: false,
//       autoClose: 3000,
//     });
//   } finally {
//     setLoading(false);
//   }
// };
const handleSubmit = async (e) => {
  e.preventDefault();

  // 1. Validations
  if (!formData.title) return toast.warn("Business Title is required! ⚠️");
  if (!formData.categoryId) return toast.warn("Please select a Category! ⚠️");
  if (!formData.subCategoryId)
    return toast.warn("Please select a Sub-Category! ⚠️");
  if (images.length === 0)
    return toast.warn("Please upload at least one image! 📸");

  setLoading(true);
  const toastId = toast.loading("Publishing your listing... ⏳");

  try {
    const data = new FormData();

    // Standard Information
    data.append("ownerId", formData.ownerId);
    data.append("categoryId", formData.categoryId);
    data.append("subCategoryId", formData.subCategoryId);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("address", formData.address);
    data.append("phone", formData.phone);

    // Media & Socials (Using .trim() to prevent malformed data like ",)
    data.append("whatsappNo", (formData.whatsappNo || "").trim());
    data.append("facebook", (formData.facebook || "").trim());
    data.append("twitter", (formData.twitter || "").trim());
    data.append("linkedin", (formData.linkedin || "").trim());
    data.append("instagram", (formData.instagram || "").trim());

    // Ensure both YouTube fields are sent correctly
    data.append("youtube", (formData.youtube || "").trim());
    data.append("youtubeVideo", (formData.youtubeVideo || "").trim());

    // Complex data: Items (must be stringified)
    data.append("items", JSON.stringify(items));

    // Multiple Images
    images.forEach((file) => data.append("images", file));

    const res = await createListingAPI(data);

    if (res.listing || res.message?.toLowerCase().includes("successfully")) {
      toast.update(toastId, {
        render: "Listing Created Successfully! 🎉",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      // Redirect after success
    } else {
      toast.update(toastId, {
        render: res.message || "Failed to create listing ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  } catch (err) {
    toast.update(toastId, {
      render: err.response?.data?.message || "Something went wrong! ❌",
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: theme.lightBg }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div
              className="card border-0 shadow-lg"
              style={{ borderRadius: "20px" }}>
              <div
                className="p-5 text-white text-center"
                style={{
                  backgroundColor: theme.primary,
                  borderRadius: "20px 20px 0 0",
                }}>
                <h2 className="fw-bold mb-2">Create New Listing</h2>
                <p className="opacity-75">Submit your business details</p>
              </div>

              <form className="p-4 p-md-5" onSubmit={handleSubmit}>
                {/* Basic Info */}
                <div className="mb-5">
                  <h5
                    className="text-uppercase fw-bold mb-4"
                    style={{ color: theme.primary }}>
                    <Layers size={20} className="me-2" /> Basic Information
                  </h5>
                  <div className="row g-4">
                    <div className="col-md-12">
                      <label className="form-label small fw-bold">
                        Listing Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="form-control form-control-lg border-1 bg-light"
                        placeholder="Business Name"
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">
                        Category *
                      </label>
                      <select
                        name="categoryId"
                        className="form-select border-1 bg-light"
                        value={formData.categoryId}
                        onChange={handleInputChange}>
                        <option value="">Select Category...</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">
                        Subcategory *
                      </label>
                      <select
                        name="subCategoryId"
                        className="form-select border-1 bg-light"
                        value={formData.subCategoryId}
                        onChange={handleInputChange}
                        disabled={!formData.categoryId}>
                        <option value="">Select Sub-Category...</option>
                        {filteredSubCats.map((sub) => (
                          <option key={sub._id} value={sub._id}>
                            {sub.subcategoryName}
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
                        className="form-control border-1 bg-light"
                        rows="3"
                        placeholder="Tell us about your business..."
                        value={formData.description}
                        onChange={handleInputChange}></textarea>
                    </div>
                  </div>
                </div>

                {/* Media */}
                <div className="mb-5">
                  <h5
                    className="text-uppercase fw-bold mb-4"
                    style={{ color: theme.primary }}>
                    <Video size={20} className="me-2" /> Media Gallery
                  </h5>
                  <div className="row g-4">
                    <div className="col-12">
                      <label className="form-label small fw-bold">
                        YouTube Link
                      </label>
                      <input
                        type="url"
                        name="youtubeVideo"
                        className="form-control border-1 bg-light"
                        placeholder="https://youtube.com/..."
                        value={formData.youtubeVideo}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold">
                        Images *
                      </label>
                      <input
                        type="file"
                        multiple
                        className="form-control border-1 bg-light"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="mb-5">
                  <h5
                    className="text-uppercase fw-bold mb-4"
                    style={{ color: theme.primary }}>
                    <MapPin size={20} className="me-2" /> Address & Contact
                  </h5>
                  <div className="row g-4">
                    <div className="col-md-8">
                      <label className="form-label small fw-bold">
                        Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        className="form-control border-1 bg-light"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-bold">
                        Phone *
                      </label>
                      <input
                        type="text"
                        name="phone"
                        className="form-control border-1 bg-light"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-bold">
                        WhatsApp
                      </label>
                      <input
                        type="text"
                        name="whatsappNo"
                        className="form-control border-1 bg-light"
                        value={formData.whatsappNo}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Socials */}
                <div className="mb-5">
                  <h5
                    className="text-uppercase fw-bold mb-4"
                    style={{ color: theme.primary }}>
                    <Globe size={20} className="me-2" /> Social Media
                  </h5>
                  <div className="row g-3">
                    {[
                      "facebook",
                      "twitter",
                      "linkedin",
                      "youtube",
                      "instagram",
                    ].map((field) => (
                      <div className="col-md-4" key={field}>
                        <label className="form-label small text-capitalize">
                          {field}
                        </label>
                        <input
                          type="text"
                          name={field}
                          className="form-control border-1 bg-light"
                          value={formData[field]}
                          onChange={handleInputChange}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Items */}
                <div
                  className="mb-5 p-4 rounded-4"
                  style={{ backgroundColor: "#f0f4f8" }}>
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="fw-bold">Items & Pricing</h6>
                    <button
                      type="button"
                      onClick={addItem}
                      className="btn btn-sm btn-dark px-3">
                      <Plus size={16} /> Add
                    </button>
                  </div>
                  {items.map((item, index) => (
                    <div key={index} className="row g-2 mb-2">
                      <div className="col-7">
                        <input
                          type="text"
                          name="name"
                          className="form-control border-0"
                          placeholder="Item name"
                          value={item.name}
                          onChange={(e) => handleItemChange(index, e)}
                        />
                      </div>
                      <div className="col-3">
                        <input
                          type="number"
                          name="price"
                          className="form-control border-0"
                          placeholder="Price"
                          value={item.price}
                          onChange={(e) => handleItemChange(index, e)}
                        />
                      </div>
                      <div className="col-2">
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="btn btn-outline-danger border-0">
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-lg text-white w-100 fw-bold shadow py-3"
                  style={{
                    backgroundColor: theme.primary,
                    borderRadius: "12px",
                  }}>
                  {loading ? (
                    <>
                      <Loader2
                        size={20}
                        className="spinner-border spinner-border-sm me-2"
                      />{" "}
                      Publishing...
                    </>
                  ) : (
                    "Publish Listing"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;