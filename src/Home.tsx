import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ActionCard from '/workspaces/NIC-pio-/src/Components/ActionCard';
import BannerSlider from '/workspaces/NIC-pio-/src/Components/BannerSlider';
import Swal from 'sweetalert2';
import { To, useNavigate } from 'react-router-dom';
import {
  faEnvelopeOpenText,
  faMagnifyingGlass,
  faGavel,
  faUniversity,
  faExternalLink
} from '@fortawesome/free-solid-svg-icons';

const Home1 = () => {
  const navigate = useNavigate();

  const handleCardClick = (title: string, to: To) => {
    if (title === "Second Appeal Request") {
      Swal.fire({
        icon: 'info',
        title: 'You are being redirected to an external website',
        text: 'Click Continue to proceed.',
        showCancelButton: true,
        confirmButtonText: 'Continue',
        cancelButtonText: 'Cancel',
        customClass: {
          popup: 'text-sm',
          title: 'text-base',
          confirmButton: 'text-sm',
          cancelButton: 'text-sm'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          window.open('https://rtionline.tripura.gov.in/sic/index.php', '_blank');
        }
      });
    } else {
      navigate(to);
    }
  };

  const cardData = [
    {
      icon: faEnvelopeOpenText,
      title: "Submit RTI Request",
      color: "#f59e0b",
      to: "/submit-rti"
    },
    {
      icon: faMagnifyingGlass,
      title: "View Request Status",
      color: "#3b82f6",
      to: "/view-status" // changed ./ to / for consistent routing
    },
    {
      icon: faGavel,
      title: "First Appeal Request",
      color: "#22c55e",
      to: "/first-appeal" // changed ./ to / for consistent routing
    },
    {
      icon: faUniversity,
      title: "Second Appeal Request",
      color: "#14b8a6",
      to: "#", // not used in navigation, handled by title condition
      appendIcon: faExternalLink 
    }
  ];

  return (
    <>
      <Container fluid className="primary-bg-image py-4">
        <Row className="justify-content-center mt-5 mb-5 gx-3 gy-4">
          {cardData.map((card, idx) => (
            <Col xs={6} sm={6} md={3} key={idx}>
              <div onClick={() => handleCardClick(card.title, card.to)} style={{ cursor: 'pointer' }}>
                <ActionCard
                  icon={card.icon}
                  title={card.title}
                  color={card.color}
                  to={card.to}
                  appendIcon={card.appendIcon}
                />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <BannerSlider />
    </>
  );
};
export default Home1;
