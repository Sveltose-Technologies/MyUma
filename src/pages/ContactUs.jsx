import React, { useState } from "react";
import { sendContactAPI } from "../services/authService"; // Adjust path as needed
import { toast, ToastContainer } from "react-toastify"; // Optional for feedback
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNo: "",
    address: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await sendContactAPI(formData);
      if (response.success || response) {
        toast.success("Message sent successfully!");
        setFormData({
          fullName: "",
          email: "",
          contactNo: "",
          address: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section py-5 bg-light">
      <ToastContainer />
      <div className="container py-5 umaFadeUp">
        <div className="row g-5">
          {/* Contact Information */}
          <div className="col-lg-5">
            <span className="uma-tag-tan">Get In Touch</span>
            <h1 className="uma-title text-navy mb-4">Contact Us</h1>
            <p className="uma-desc text-muted mb-5">
              Have questions? We're here to help. Send us a message and our team will get back to you shortly.
            </p>

            <div className="d-flex mb-4 transition-hover p-3 bg-white rounded shadow-sm">
              <div className="bg-tan p-3 rounded me-3">
                <i className="fas fa-map-marker-alt text-navy"></i>
              </div>
              <div>
                <h5 className="fw-800 text-navy mb-1">Address</h5>
                <p className="mb-0 text-muted">123 Legal Street, New York, USA</p>
              </div>
            </div>

            <div className="d-flex mb-4 transition-hover p-3 bg-white rounded shadow-sm">
              <div className="bg-tan p-3 rounded me-3">
                <i className="fas fa-phone-alt text-navy"></i>
              </div>
              <div>
                <h5 className="fw-800 text-navy mb-1">Phone Number</h5>
                <p className="mb-0 text-muted">+1 (234) 567-890</p>
              </div>
            </div>

            <div className="d-flex mb-4 transition-hover p-3 bg-white rounded shadow-sm">
              <div className="bg-tan p-3 rounded me-3">
                <i className="fas fa-envelope text-navy"></i>
              </div>
              <div>
                <h5 className="fw-800 text-navy mb-1">Email Address</h5>
                <p className="mb-0 text-muted">info@myuma.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm border-gold-top p-4 p-md-5">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-navy">Full Name</label>
                    <input
                      type="text"
                      className="form-control border-gold p-3"
                      placeholder="John Doe"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-navy">Email</label>
                    <input
                      type="email"
                      className="form-control border-gold p-3"
                      placeholder="name@example.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-navy">Contact No</label>
                    <input
                      type="text"
                      className="form-control border-gold p-3"
                      placeholder="+1 234..."
                      name="contactNo"
                      value={formData.contactNo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-navy">Address</label>
                    <input
                      type="text"
                      className="form-control border-gold p-3"
                      placeholder="City, Country"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold text-navy">Message</label>
                    <textarea
                      className="form-control border-gold p-3"
                      rows="4"
                      placeholder="How can we help you?"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="col-12 mt-4">
                    <button 
                      type="submit" 
                      className="uma-btn-navy w-100 fw-800 ls-1 border-0"
                      disabled={loading}
                    >
                      {loading ? "SENDING..." : "SEND MESSAGE"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;