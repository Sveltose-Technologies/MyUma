import React, { useEffect, useState } from "react";
import { Mail, Globe, Loader2 } from "lucide-react";
import { getAboutUsAPI } from "../features/auth/api";
import { toast } from "react-toastify";

const AboutUs = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await getAboutUsAPI();
        if (res.aboutUs && res.aboutUs.length > 0) {
          setData(res.aboutUs[0]);
        }
      } catch (err) {
        toast.error("Failed to load About Us content");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (!data)
    return <div className="text-center py-5">No content available.</div>;

  return (
    <div className="min-vh-100 bg-white">
      {/* Hero Section */}
      <div
        className="py-5 text-white text-center"
        style={{ backgroundColor: "#001f3f" }}
      >
        <div className="container">
          <h1 className="fw-bold display-4">About Us</h1>
          <p className="lead opacity-75">
            Learn more about our mission and vision
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            {/* Main Content Area */}
            <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4 mb-4">
              {/* IMPORTANT: Rendering Text Editor Content */}
              <div
                className="about-content-wrapper text-secondary fs-5"
                style={{ lineHeight: "1.8" }}
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            </div>

            {/* Contact Strip */}
            <div className="row g-3">
              <div className="col-md-6">
                <div className="d-flex align-items-center p-3 bg-light rounded-3">
                  <div className="bg-primary-subtle p-3 rounded-circle me-3">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <small className="text-muted d-block">Support Email</small>
                    <span className="fw-bold">{data.email}</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <a
                  href={data.webLink}
                  target="_blank"
                  rel="noreferrer"
                  className="d-flex align-items-center p-3 bg-light rounded-3 text-decoration-none text-dark"
                >
                  <div className="bg-success-subtle p-3 rounded-circle me-3">
                    <Globe className="text-success" size={24} />
                  </div>
                  <div>
                    <small className="text-muted d-block">
                      Official Website
                    </small>
                    <span className="fw-bold">Visit Link</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
