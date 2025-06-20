import React from 'react';

const Footer = () => {
  return (
    <footer className="py-2 py-md-3 primary-bg-image">
      {/* Desktop Quick Links */}
      <div className="nav justify-content-center d-none d-md-flex border-bottom pb-3 mb-3">
        {[
          { label: 'Home', href: 'https://rtionline.assam.gov.in/index.php' },
          {
            label: 'National Portal of India',
            href: 'https://www.india.gov.in/',
            external: true,
          },
          {
            label: 'Complaint & Second Appeal to AIC',
            href: 'https://sic.assam.gov.in/public/second_appeal.jsp',
            external: true,
          },
          {
            label: 'FAQ',
            href: 'https://rtionline.assam.gov.in/faq.php',
          },
          {
            label: 'Contact Us',
            href: 'https://rtionline.assam.gov.in/contact-us.php',
          },
          {
            label: 'User Manual',
            href: 'https://rtionline.assam.gov.in/user-manual.pdf',
            external: true,
          },
        ].map((link, idx, arr) => (
          <React.Fragment key={link.label}>
            <div className="nav-item">
              <a
                href={link.href}
                target={link.external ? '_blank' : '_self'}
                rel={link.external ? 'noopener noreferrer' : ''}
                className="nav-link px-2 text-light"
              >
                {link.label}
                {link.external && (
                  <sup>
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </sup>
                )}
              </a>
            </div>
            {idx < arr.length - 1 && (
              <div className="nav-item d-md-flex my-auto px-2 text-light">|</div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile Quick Links */}
      <div className="nav justify-content-center d-block d-md-none border-bottom pb-1 pb-md-3 mb-3">
        <div className="ps-4 ps-md-0 nav-link py-1 text-light f-small fw-bold">
          Quick Links
        </div>
        {[
          { label: 'Home', href: 'https://rtionline.assam.gov.in/index.php' },
          {
            label: 'National Portal of India',
            href: 'https://www.india.gov.in/',
            external: true,
          },
          {
            label: 'Complaint & Second Appeal to AIC',
            href: 'https://sic.assam.gov.in/public/second_appeal.jsp',
            external: true,
          },
          { label: 'FAQ', href: 'https://rtionline.assam.gov.in/faq.php' },
          { label: 'Contact Us', href: 'https://rtionline.assam.gov.in/contact-us.php' },
          {
            label: 'User Manual',
            href: 'https://rtionline.assam.gov.in/user-manual.pdf',
            external: true,
          },
        ].map((link) => (
          <div className="nav-item ps-3 ps-md-0" key={link.label}>
            <a
              href={link.href}
              target={link.external ? '_blank' : '_self'}
              rel={link.external ? 'noopener noreferrer' : ''}
              className="nav-link pb-1 text-light f-small"
            >
              {link.label}
              {link.external && (
                <sup>
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </sup>
              )}
            </a>
          </div>
        ))}
      </div>

      {/* Portal Information */}
      <p className="d-none d-md-block text-center white">
        Contents of the portal is provided by Administrative Reforms, Training, Pension and Public Grievances Department, Govt. of Tripura
      </p>
      <p className="d-none d-md-block text-center white fw-medium">
        Copyright © 2024. All Rights Reserved. This portal is Maintained by Tripura Information Commission and Designed & Developed by National Informatics Centre, Tripura
      </p>

      <p className="d-md-none px-2 mb-1 text-center white f-small">
        Contents of the portal is provided by Administrative Reforms, Training, Pension and Public Grievances Department, Govt. of Tripura
      </p>
      <p className="d-md-none px-2 mb-1 text-center white fw-medium f-small">
        Copyright © 2024. All Rights Reserved. This portal is Maintained by Tripura Information Commission and Designed & Developed by National Informatics Centre, Tripura
      </p>

      {/* Visitor Counter */}
      <div className="container mt-2">
        <div className="d-flex justify-content-center">
          <div id="counter" className="text-center text-light d-flex">
            {['2', '7', '0', '9', '5', '3'].map((digit, index) => (
              <React.Fragment key={index}>
                <span className="d-none d-md-flex digit bg-light text-primary fw-bold fs-5">
                  {digit}
                </span>
                <span className="d-md-none digit bg-light text-primary fw-bold px-2 py-1 f-xsmall">
                  {digit}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="d-none d-md-block text-light text-center mt-2">
          Total Visitors Count
        </div>
        <div className="d-md-none text-light text-center mt-2 f-small">
          Total Visitors Count
        </div>
      </div>
    </footer>
  );
};

export default Footer;
