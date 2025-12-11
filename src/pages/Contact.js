import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaTiktok, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import './Contact.css';

export default function Contact() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    returnRequest: false,
    returnReason: '',
    thankYouNote: ''
  });

  const [status, setStatus] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('https://formspree.io/f/xzzlelbo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '', email: '', phone: '', message: '',
          returnRequest: false, returnReason: '', thankYouNote: ''
        });
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    if (name === "returnRequest" && checked) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="contact-container">

      {/* ========== Toast Message ========== */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            key="return-toast"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "fixed",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#111",
              color: "#fff",
              padding: "16px 28px",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              fontSize: "1rem",
              zIndex: 9999,
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)",
              maxWidth: "90%",
              whiteSpace: "pre-line"
            }}
          >
            Terms&conditions
            Welcome to our page! We offer trusted quality products and a smooth, reliable shopping experience.
            Exchanges
            Exchanges are available within 2 days of receiving your order.
            Customers must pay the shipping fees for all exchange requests.
            Items must be in original condition (unused, unwashed, with tags and packaging)
            Returns
            No returns are accepted unless the item has a manufacturing defect.
            Defects must be reported within 24-48 hours with photos or video.
            Once confirmed, we will replace the item or offer a suitable solution.
            Sizing
            Please check your size carefully before placing the order.
            If the wrong size is chosen, the customer is responsible for all exchange shipping fees.
            Shipping & Delivery
            Delivery time is 5-7 business days.
            Ensure your address and phone number are correct to avoid delays.
            Orders may be delayed or canceled if the courier cannot reach you.
            Customer Support
            If you have any questions, feel free to contact us before placing your order. We are happy to assist you.
          </motion.div>
        )}
      </AnimatePresence>
      {/* =================================== */}

      <div className="contact-background">
        <img src="/image/sign.png" alt="signature background" />
      </div>
      <div className="contact-overlay" />

      <div className="contact-content">
        <div className="contact-header">
          <h1 className="contact-title">Contact Us</h1>
          <div className="contact-divider" />
          <p className="contact-subtitle">
            We're here to answer your questions and help you. Get in touch through any method that suits you
          </p>
        </div>

        <div className="contact-grid">

          {/* Contact Form */}
          <div className="contact-form-card">
            <h2 className="form-title">
              <svg className="form-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send Us a Message
            </h2>

            <form className="form-fields" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" placeholder="Your name" required />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="example@email.com" required />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input" placeholder="+201001002003" required />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="5" className="form-textarea" placeholder="Write your message..." required />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <input type="checkbox" name="returnRequest" checked={formData.returnRequest} onChange={handleChange} className="form-checkbox" />
                  <span style={{ marginRight: '8px' }}></span> I want to request a return/exchange
                </label>
              </div>

              {formData.returnRequest && (
                <div className="form-group">
                  <label className="form-label">Reason for Return</label>
                  <textarea name="returnReason" value={formData.returnReason} onChange={handleChange} rows="4" className="form-textarea" placeholder="Please tell us the reason..." required />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Thank You Note (Optional)</label>
                <textarea name="thankYouNote" value={formData.thankYouNote} onChange={handleChange} rows="3" className="form-textarea" placeholder="Any nice words or feedback..." />
              </div>

              <button type="submit" disabled={status === 'sending'} className="form-submit">
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && <div className="alert alert-success">Message sent successfully!</div>}
              {status === 'error' && <div className="alert alert-error">Something went wrong, try again.</div>}

            </form>
          </div>

          {/* Sidebar */}
          <div className="contact-sidebar">
            <div className="social-card">

              <h2 className="social-title">Follow & Contact Us</h2>

              <div className="social-links">

                <motion.a
                  href="https://www.instagram.com/kyn_eg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link instagram-link"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="social-icon instagram-icon">
                    <FaInstagram size={34} />
                  </div>
                  <div className="social-info">
                    <h3 className="social-name">Instagram</h3>
                    <p className="social-handle">@kyn_eg</p>
                  </div>
                  <span className="social-arrow">→</span>
                </motion.a>

                <motion.a
                  href="https://www.tiktok.com/@kyn_eg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link tiktok-link"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="social-icon tiktok-icon">
                    <FaTiktok size={34} />
                  </div>
                  <div className="social-info">
                    <h3 className="social-name">TikTok</h3>
                    <p className="social-handle">@kyn_eg</p>
                  </div>
                  <span className="social-arrow">→</span>
                </motion.a>

                <motion.a
                  href="https://wa.me/201096605584"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link whatsapp-link"
                  whileHover={{ scale: 1.15, color: "#25D366" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="social-icon whatsapp-icon">
                    <FaWhatsapp size={36} color="#25D366" />
                  </div>
                  <div className="social-info">
                    <h3 className="social-name">WhatsApp</h3>
                    <p className="social-handle">contact us</p>
                  </div>
                  <span className="social-arrow">→</span>
                </motion.a>

                <motion.a
                  href="mailto:kynegptian@gmail.com"
                  className="social-link email-link"
                  whileHover={{ scale: 1.15, color: "#FF4646" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="social-icon email-icon">
                    <FaEnvelope size={34} color="#FF4646" />
                  </div>
                  <div className="social-info">
                    <h3 className="social-name">Email</h3>
                    <p className="social-handle">kynegptian@gmail.com</p>
                  </div>
                  <span className="social-arrow">→</span>
                </motion.a>

              </div>
            </div>

            <div className="info-card">
              <h3 className="info-title">Business Hours</h3>
              <div className="info-content">
                <div className="info-row">
                  <span className="info-label">Saturday - Thursday</span>
                  <span className="info-value">9:00 AM - 6:00 PM</span>
                </div>
                <div className="info-divider" />
                <div className="info-row">
                  <span className="info-label">Friday</span>
                  <span className="info-value">Closed</span>
                </div>
              </div>
            </div>

            <div className="cta-card">
              <h3 className="cta-title">We're Happy to Serve You!</h3>
              <p className="cta-text">
                Our team is ready to respond to your inquiries as soon as possible
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}