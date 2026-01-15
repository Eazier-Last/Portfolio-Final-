import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer-section" id="contact">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-text">EL</span>
              <span className="logo-name">Ezekiel Labay</span>
            </div>
            <p className="footer-tagline">
              IT Graduate aspiring to be a Graphic Designer
            </p>
          </div>
          
          <div className="footer-links">
            <div className="links-column">
              <h3 className="links-title">Contact</h3>
              <a href="mailto:ezekiellabaycarable@gmail.com" className="footer-link">ezekiellabaycarable@gmail.com</a>
              <a href="tel:+639262942918" className="footer-link">+63 926-294-2918</a>
              <span className="footer-link">Based in Batangas, Philippines</span>
            </div>
            
            <div className="links-column">
              <h3 className="links-title">Follow</h3>
              <a href="#" className="footer-link">LinkedIn</a>             
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} Ezekiel Labay.
          </p>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;