import { Component } from "@angular/core"
import { CommonModule } from "@angular/common" // Required for ngIf, ngFor
import { RouterModule } from "@angular/router" // Required for routerLink

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [
    CommonModule, // Provides common directives
    RouterModule, // Provides routerLink
  ],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-brand">
            <h3>
              <i class="fas fa-plane"></i>
              SkyBooking
            </h3>
            <p>Your trusted partner for seamless flight booking experiences. Discover the world with confidence.</p>
            <div class="social-links">
              <a href="#" class="social-link">
                <i class="fab fa-facebook"></i>
              </a>
              <a href="#" class="social-link">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-link">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="social-link">
                <i class="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul class="footer-links">
            <li><a routerLink="/">Home</a></li>
            <li><a routerLink="/search">Search Flights</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Help Center</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Services</h4>
          <ul class="footer-links">
            <li><a href="#">Flight Booking</a></li>
            <li><a href="#">Hotel Booking</a></li>
            <li><a href="#">Car Rental</a></li>
            <li><a href="#">Travel Insurance</a></li>
            <li><a href="#">Group Booking</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Support</h4>
          <ul class="footer-links">
            <li><a href="#">Customer Service</a></li>
            <li><a href="#">Booking Management</a></li>
            <li><a href="#">Cancellation Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Contact Info</h4>
          <div class="contact-info">
            <div class="contact-item">
              <i class="fas fa-phone"></i>
              <span>+91 1234567890</span>
            </div>
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <span>support&#64;skybooking.com</span>
            </div>
            <div class="contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>123 Aviation Street, Mumbai, India</span>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p>&copy; {{ currentYear }} SkyBooking. All rights reserved.</p>
          <div class="payment-methods">
            <span>We Accept:</span>
            <i class="fab fa-cc-visa"></i>
            <i class="fab fa-cc-mastercard"></i>
            <i class="fab fa-cc-paypal"></i>
            <i class="fab fa-cc-amex"></i>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
    .footer {
      background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
      color: white;
      margin-top: auto; /* Pushes footer to the bottom */
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 60px 20px 40px;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr; /* Adjust column widths */
      gap: 40px;
    }

    .footer-section h3, .footer-section h4 {
      margin-bottom: 20px;
      color: white;
    }

    .footer-brand h3 {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.5rem;
      margin-bottom: 15px;
    }

    .footer-brand p {
      color: #bdc3c7;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .social-links {
      display: flex;
      gap: 15px;
    }

    .social-link {
      width: 40px;
      height: 40px;
      background: rgba(255,255,255,0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .social-link:hover {
      background: #3498db; /* A nice blue for hover */
      transform: translateY(-3px);
      color: white;
    }

    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-links li {
      margin-bottom: 10px;
    }

    .footer-links a {
      color: #bdc3c7;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer-links a:hover {
      color: #3498db;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #bdc3c7;
    }

    .contact-item i {
      color: #3498db;
      width: 16px; /* Fixed width for icons */
    }

    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.1);
      padding: 20px 0;
    }

    .footer-bottom-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
    }

    .footer-bottom p {
      color: #bdc3c7;
      margin: 0;
    }

    .payment-methods {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #bdc3c7;
    }

    .payment-methods i {
      font-size: 1.5rem;
      color: #3498db;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr; /* Stack columns on small screens */
        gap: 30px;
        text-align: center;
      }

      .footer-bottom-content {
        flex-direction: column;
        text-align: center;
      }

      .social-links {
        justify-content: center;
      }
    }

    @media (max-width: 1024px) and (min-width: 769px) {
      .footer-content {
        grid-template-columns: 1fr 1fr; /* Two columns on medium screens */
        gap: 30px;
      }
    }
  `,
  ],
})
export class FooterComponent {
  currentYear = new Date().getFullYear() // Dynamically get current year
}
