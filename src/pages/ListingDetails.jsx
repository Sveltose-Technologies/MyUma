import React, { useState } from "react";
import {
  MapPin,
  Star,
  Share2,
  Heart,
  CreditCard,
  Mail,
  Globe,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  Info,
  Image as ImageIcon,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const ListingDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock Data (same as BrowseListings for now)
  const listings = [
    {
      id: 1,
      title: "Luxury Sky Villa",
      category: "Real Estate",
      price: 8500,
      rating: 4.8,
      reviews: 124,
      address: "Worli, Mumbai, Maharashtra",
      description:
        "Experience the pinnacle of urban living in this stunning Sky Villa. Featuring panoramic views of the Arabian Sea, this property offers world-class amenities including a private elevator, smart home automation, and a 24/7 concierge service. Perfect for families looking for luxury and security.",
      phone: "+91 98765 43210",
      email: "contact@skyvilla.com",
      website: "www.skyvilla.com",
      features: [
        "Free Wi-Fi",
        "Parking Space",
        "Swimming Pool",
        "Gym",
        "Security",
      ],
      items: [
        { name: "Master Suite", price: "3,500" },
        { name: "Guest Room", price: "2,000" },
        { name: "Maintenance Fee", price: "500" },
      ],
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=400",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400",
      ],
    },
    {
      id: 2,
      title: "The Grand Heritage Hotel",
      category: "Hotels",
      price: 4200,
      rating: 4.5,
      reviews: 98,
      address: "Banjara Hills, Hyderabad, Telangana",
      description:
        "A luxurious heritage hotel blending modern comfort with colonial architecture. Enjoy fine dining, spa treatments, and proximity to major attractions.",
      phone: "+91 98765 43211",
      email: "info@grandheritage.com",
      website: "www.grandheritage.com",
      features: [
        "Free Wi-Fi",
        "Restaurant",
        "Spa",
        "Fitness Center",
        "Concierge",
      ],
      items: [
        { name: "Deluxe Room", price: "2,500" },
        { name: "Suite", price: "4,200" },
        { name: "Breakfast", price: "500" },
      ],
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400",
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400",
      ],
    },
    {
      id: 3,
      title: "Oceanic Resort & Spa",
      category: "Hotels",
      price: 6000,
      rating: 4.9,
      reviews: 156,
      address: "Goa Beach, India",
      description:
        "Relax in paradise at this beachfront resort with private villas, infinity pools, and world-class spa services. Perfect for a romantic getaway or family vacation.",
      phone: "+91 98765 43212",
      email: "reservations@oceanicresort.com",
      website: "www.oceanicresort.com",
      features: [
        "Beach Access",
        "Infinity Pool",
        "Spa",
        "Restaurant",
        "Water Sports",
      ],
      items: [
        { name: "Villa Suite", price: "6,000" },
        { name: "Spa Treatment", price: "1,500" },
        { name: "Dining Package", price: "800" },
      ],
      images: [
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=400",
      ],
    },
    {
      id: 4,
      title: "Minimalist Loft",
      category: "Real Estate",
      price: 2500,
      rating: 4.2,
      reviews: 67,
      address: "Indiranagar, Bangalore, Karnataka",
      description:
        "A sleek, modern loft in the heart of Bangalore's tech hub. Features open-plan living, high ceilings, and proximity to cafes and parks.",
      phone: "+91 98765 43213",
      email: "contact@minimalistloft.com",
      website: "www.minimalistloft.com",
      features: [
        "Open Plan",
        "High Ceilings",
        "Modern Appliances",
        "Near Amenities",
        "Secure Building",
      ],
      items: [
        { name: "Monthly Rent", price: "2,500" },
        { name: "Utilities", price: "300" },
        { name: "Maintenance", price: "200" },
      ],
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400",
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400",
      ],
    },
    {
      id: 5,
      title: "Tech Hub Office Space",
      category: "Services",
      price: 1200,
      rating: 4.0,
      reviews: 45,
      address: "Cyber City, Gurgaon, Haryana",
      description:
        "Prime office space in Gurgaon's business district. Fully equipped with high-speed internet, meeting rooms, and modern facilities.",
      phone: "+91 98765 43214",
      email: "leasing@techhub.com",
      website: "www.techhub.com",
      features: [
        "High-Speed Internet",
        "Meeting Rooms",
        "Parking",
        "Cafeteria",
        "24/7 Access",
      ],
      items: [
        { name: "Office Space", price: "1,200" },
        { name: "Meeting Room", price: "200" },
        { name: "Parking", price: "100" },
      ],
      images: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400",
      ],
    },
    {
      id: 6,
      title: "Royal Palace Suites",
      category: "Hotels",
      price: 9000,
      rating: 5.0,
      reviews: 203,
      address: "Pink City, Jaipur, Rajasthan",
      description:
        "Experience royal luxury in Jaipur's historic palace suites. Marble floors, antique furnishings, and impeccable service await.",
      phone: "+91 98765 43215",
      email: "bookings@royalpalace.com",
      website: "www.royalpalace.com",
      features: [
        "Antique Furnishings",
        "Marble Floors",
        "Personal Butler",
        "Fine Dining",
        "City Tours",
      ],
      items: [
        { name: "Royal Suite", price: "9,000" },
        { name: "Butler Service", price: "1,000" },
        { name: "City Tour", price: "500" },
      ],
      images: [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400",
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400",
      ],
    },
    {
      id: 7,
      title: "Green Valley Farm",
      category: "Real Estate",
      price: 3500,
      rating: 4.6,
      reviews: 89,
      address: "Coorg, Karnataka",
      description:
        "Escape to this serene farm in Coorg's green valleys. Perfect for nature lovers seeking peace and organic living.",
      phone: "+91 98765 43216",
      email: "info@greenvalleyfarm.com",
      website: "www.greenvalleyfarm.com",
      features: [
        "Organic Produce",
        "Scenic Views",
        "Farm Stays",
        "Hiking Trails",
        "Peaceful Environment",
      ],
      items: [
        { name: "Farm Stay", price: "3,500" },
        { name: "Organic Meals", price: "800" },
        { name: "Guided Tours", price: "300" },
      ],
      images: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=400",
      ],
    },
    {
      id: 8,
      title: "Premium Gym Membership",
      category: "Services",
      price: 500,
      rating: 4.3,
      reviews: 112,
      address: "South Delhi, Delhi",
      description:
        "State-of-the-art gym with personal trainers, group classes, and premium equipment. Achieve your fitness goals in style.",
      phone: "+91 98765 43217",
      email: "memberships@premiumgym.com",
      website: "www.premiumgym.com",
      features: [
        "Personal Trainers",
        "Group Classes",
        "Premium Equipment",
        "Sauna",
        "Nutrition Counseling",
      ],
      items: [
        { name: "Monthly Membership", price: "500" },
        { name: "Personal Training", price: "2,000" },
        { name: "Group Classes", price: "300" },
      ],
      images: [
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400",
      ],
    },
    {
      id: 9,
      title: "Classic Penthouse",
      category: "Real Estate",
      price: 7800,
      rating: 4.7,
      reviews: 134,
      address: "Salt Lake, Kolkata, West Bengal",
      description:
        "A classic penthouse with city views, spacious rooms, and modern amenities. Ideal for urban professionals.",
      phone: "+91 98765 43218",
      email: "rentals@classicpenthouse.com",
      website: "www.classicpenthouse.com",
      features: [
        "City Views",
        "Spacious Rooms",
        "Modern Amenities",
        "Security",
        "Parking",
      ],
      items: [
        { name: "Penthouse Rent", price: "7,800" },
        { name: "Utilities", price: "400" },
        { name: "Maintenance", price: "300" },
      ],
      images: [
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400",
      ],
    },
  ];

  const listing = listings.find((item) => item.id === parseInt(id));

  if (!listing) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h2 className="fw-bold text-dark">Listing Not Found</h2>
          <p className="text-muted">
            The listing you're looking for doesn't exist.
          </p>
          <button onClick={() => navigate(-1)} className="btn btn-primary">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Rest of the component uses the dynamic `listing` object

  const [activeImg, setActiveImg] = useState(listing.images[0]);
  const [rating, setRating] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (!commentText.trim() || rating === 0) {
      setSuccessMessage("Please provide a comment and a star rating.");
      return;
    }

    const newComment = {
      id: Date.now(),
      rating,
      text: commentText.trim(),
      author: "Anonymous",
      date: new Date().toLocaleDateString(),
    };

    setComments([newComment, ...comments]);
    setCommentText("");
    setRating(0);
    setSuccessMessage("Your comment has been submitted successfully.");
  };

  return (
    <div className="min-vh-100 bg-light pb-5">
      {/* Navigation Bar */}
      <div className="bg-white border-bottom py-3 sticky-top shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-link text-dark text-decoration-none d-flex align-items-center fw-bold"
          >
            <ArrowLeft size={20} className="me-2" /> Back to Search
          </button>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary btn-sm rounded-pill px-3">
              <Share2 size={16} /> Share
            </button>
            <button className="btn btn-outline-danger btn-sm rounded-pill px-3">
              <Heart size={16} /> Save
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row g-4">
          {/* LEFT COLUMN: Media & Content */}
          <div className="col-lg-8">
            {/* Gallery Section */}
            <div className="mb-4">
              <div
                className="rounded-4 overflow-hidden mb-2 shadow-sm"
                style={{ height: "450px" }}
              >
                <img
                  src={activeImg}
                  alt="main"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="d-flex gap-2">
                {listing.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`rounded-3 overflow-hidden border-2 cursor-pointer ${activeImg === img ? "border-primary" : "border-transparent"}`}
                    style={{
                      width: "100px",
                      height: "70px",
                      cursor: "pointer",
                      border: activeImg === img ? "2px solid #001f3f" : "none",
                    }}
                    onClick={() => setActiveImg(img)}
                  >
                    <img
                      src={img}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                      alt="thumb"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Header Info */}
            <div
              className="card border-0 shadow-sm p-4 mb-4"
              style={{ borderRadius: "16px" }}
            >
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <span className="badge bg-primary-subtle text-primary mb-2 px-3">
                    {listing.category}
                  </span>
                  <h1 className="fw-bold text-dark">{listing.title}</h1>
                  <p className="text-muted d-flex align-items-center">
                    <MapPin size={18} className="me-1 text-danger" />{" "}
                    {listing.address}
                  </p>
                </div>
                <div className="text-end">
                  <div className="d-flex align-items-center justify-content-end mb-1">
                    <Star
                      size={20}
                      className="text-warning fill-warning me-1"
                    />
                    <span className="fw-bold fs-5">{listing.rating}</span>
                  </div>
                  <small className="text-muted">
                    {listing.reviews} Reviews
                  </small>
                </div>
              </div>
            </div>

            {/* Description */}
            <div
              className="card border-0 shadow-sm p-4 mb-4"
              style={{ borderRadius: "16px" }}
            >
              <h5 className="fw-bold mb-3">About this Listing</h5>
              <p className="text-secondary leading-relaxed">
                {listing.description}
              </p>

              <hr className="my-4 opacity-25" />

              <h5 className="fw-bold mb-3">Features & Amenities</h5>
              <div className="row g-3">
                {listing.features.map((f, i) => (
                  <div key={i} className="col-md-4 col-6">
                    <div className="d-flex align-items-center text-secondary">
                      <CheckCircle2 size={18} className="text-success me-2" />{" "}
                      {f}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comment Form */}
            <div
              className="card border-0 shadow-sm p-4 mb-4"
              style={{ borderRadius: "16px" }}
            >
              <h5 className="fw-bold mb-3">Leave a Comment</h5>
              <p className="text-muted small">
                Share your thoughts and rate this listing from 1 to 5 stars.
              </p>

              <div className="mb-3">
                <div className="d-flex align-items-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`btn btn-sm ${rating >= star ? "btn-warning text-white" : "btn-outline-secondary"}`}
                      onClick={() => setRating(star)}
                    >
                      <Star size={16} />
                    </button>
                  ))}
                  <span className="small text-muted">{rating} / 5</span>
                </div>
              </div>

              <form onSubmit={handleCommentSubmit}>
                <div className="mb-3">
                  <textarea
                    className="form-control border-0 shadow-sm"
                    rows={4}
                    placeholder="Write your comment here..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                </div>
                {successMessage && (
                  <div className="alert alert-success py-2" role="alert">
                    {successMessage}
                  </div>
                )}
                <button
                  type="submit"
                  className="btn btn-primary fw-bold"
                  style={{ backgroundColor: "#001f3f", borderColor: "#001f3f" }}
                >
                  Submit Comment
                </button>
              </form>
            </div>

            {comments.length > 0 && (
              <div
                className="card border-0 shadow-sm p-4 mb-4"
                style={{ borderRadius: "16px" }}
              >
                <h5 className="fw-bold mb-3">Recent Comments</h5>
                <div className="list-group list-group-flush">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="list-group-item border-0 px-0 py-3"
                    >
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="d-flex align-items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={14}
                              className={
                                star <= comment.rating
                                  ? "text-warning fill-warning"
                                  : "text-muted"
                              }
                            />
                          ))}
                        </div>
                        <small className="text-muted">{comment.date}</small>
                      </div>
                      <p className="mb-1 text-dark">{comment.text}</p>
                      <small className="text-muted">{comment.author}</small>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic Items / Pricing List */}
            <div
              className="card border-0 shadow-sm p-4"
              style={{ borderRadius: "16px" }}
            >
              <h5 className="fw-bold mb-4">Detailed Pricing</h5>
              <div className="list-group list-group-flush">
                {listing.items.map((item, i) => (
                  <div
                    key={i}
                    className="list-group-item border-0 px-0 d-flex justify-content-between align-items-center py-3"
                  >
                    <span className="fw-semibold text-dark">{item.name}</span>
                    <span className="fw-bold text-primary fs-5">
                      ${item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar Action */}
          <div className="col-lg-4">
            <div
              className="card border-0 shadow-lg p-4 sticky-top"
              style={{ top: "100px", borderRadius: "20px" }}
            >
              <div className="mb-4">
                <small className="text-muted d-block mb-1">Starting from</small>
                <h2 className="fw-bold text-dark">
                  ₹{listing.price.toLocaleString()}{" "}
                  <small className="fs-6 text-muted fw-normal">/ month</small>
                </h2>
              </div>

              <div className="d-grid gap-3 mb-4">
                <button
                  className="btn btn-lg text-white fw-bold py-3 shadow-sm"
                  style={{
                    backgroundColor: "#001f3f",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.opacity = "0.9")}
                  onMouseOut={(e) => (e.target.style.opacity = "1")}
                >
                  <CreditCard size={18} className="me-2" /> Book Now
                </button>

                {/* <button className="btn btn-lg btn-outline-dark fw-bold py-3 shadow-sm">
                  <Mail size={18} className="me-2" /> Send Inquiry
                </button> */}
              </div>

              <div className="pt-3 border-top">
                <h6 className="fw-bold mb-3">Contact Information</h6>
                <div className="space-y-3">
                  <div className="d-flex align-items-center mb-3 text-secondary">
                    <Globe size={18} className="me-3" />{" "}
                    <span>{listing.website}</span>
                  </div>
                  <div className="d-flex align-items-center text-secondary">
                    <Calendar size={18} className="me-3" />{" "}
                    <span>Available Mon - Sat</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-warning-subtle rounded-3">
                <div className="d-flex">
                  <Info size={20} className="text-warning me-2" />
                  <p className="small mb-0 text-dark-emphasis">
                    Verified Listing: This property has been manually checked
                    for authenticity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
