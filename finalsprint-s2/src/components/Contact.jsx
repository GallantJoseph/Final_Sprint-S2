import "./Contact.css";
import "../App.css";

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <header className="contact-header">
        <h1>Contact Our Support Team</h1>
        <p>
          If you have any questions or need assistance, feel free to reach out
          to our support team. We're here to help!
        </p>
      </header>

      <section className="contact-info">
        <div className="info-item">
          <h2>Call Us</h2>
          <p>
            Our support team is available by phone Monday through Friday, 9 AM -
            6 PM EST.
          </p>
          <p>
            <strong>Phone Number:</strong> (555) 123-4567
          </p>
        </div>

        <div className="info-item">
          <h2>Email Us</h2>
          <p>
            If you prefer email, feel free to send us a message. We will get
            back to you as soon as possible.
          </p>
          <p>
            <strong>Email Address:</strong> support@codebrewpcbuilding.com
          </p>
        </div>
      </section>

      <footer className="contact-footer">
        <p>© 2025 Ultimate PC Shop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactUs;
