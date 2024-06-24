import React, { useState, useEffect } from "react";
import { Row, Col, Container, Modal } from "react-bootstrap";
import { MapPin, PhoneCall, Mail, Book, Facebook, Youtube } from "react-feather";
import CustomCalender from "../component/CustomCalender";
import HomeService from "../services/Home";
import Link from "next/link";

const Footer = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendarData, setShowCalendarData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShowCalendar(false);
    setShow(false);
  };

  const handleShow = () => {
    setShowCalendar(true);
    setShow(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await HomeService.upComingEvents();
        if (!response.error && response.body.length > 0) {
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth();
         
          console.log("Current month (0-based):", currentMonth);
          const currentMonthEvents = response.body.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getMonth() === currentMonth;
          });
          setShowCalendarData(currentMonthEvents);
          console.log('Event Data', JSON.stringify(currentMonthEvents));
        } else {
          setShowCalendarData([]); // Empty array if no events found
        }
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      }
    };

    fetchUpcomingEvents();
  }, []);

  return (
    <div className="FooterContentArea">
      <div className="stickyBttnn">
        <Link href="/donate-online" className="play-btn">
          {" "}
          <span className="donate-txt">
            <span className="d-block">Donate</span> <span className="d-block">Online</span>{" "}
          </span>{" "}
        </Link>
      </div>
      <Container>
        <Row>
          <Col>
            <div className="upcomingevents">
              <div className="upcomingeventsicon">
                <img src="/images/calendar.png" alt="calendar" />
              </div>
              <div className="upcomingeventstext">
                <h6>Upcoming Events</h6>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
              <div className="checknowbutton" onClick={handleShow}>
                Check Now
              </div>

              {showCalendar && (
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Upcoming Events</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {showCalendarData.length > 0 ? (
                      <CustomCalender
                        selectedDate={selectedDate}
                        onDateChange={handleDateChange}
                        filteredData={showCalendarData}
                      />
                    ) : (
                      <p>No upcoming events are listed for this month.</p>
                    )}
                  </Modal.Body>
                </Modal>
              )}
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={4} md={12}>
            <h2>Sri Sarada Math-Rasik Bhita</h2>
            <p>
              The place is sanctified by the visits of Sri Ramakrishna.This holy place was donated to Sri Sarada Math,
              Dakshineswar, where the Math authorities started an Educational & Cultural wing, 'Sri Sarada Math - Rasik
              Bhita' to impart vocational and technical education to the girl students only, with a view to develop their
              personality combining modernity with tradition.
            </p>

            <div className="theparentdiv">
              <div>
                Call Us
                <div className="footcallicon">
                  <img src="/images/red-phone.png" alt="redphone" />
                </div>
              </div>
              <div className="callnoparentdiv">
                <div className="callno">
                  <ul>
                    <li>Dakshineswar: 033-2544-4999</li>
                    <li>Dumdum Park: 033-4999-2544</li>
                  </ul>
                </div>
              </div>
            </div>
          </Col>

          <Col xs={12} lg={4} md={6}>
            <div className="pl-50">
              <h6>Useful Links</h6>
              <Row className="LinkArea">
                <Col>
                  <ul>
                    <li>
                      {" "}
                      <Link href="/about/our-origin">Our Origin</Link>
                    </li>
                    <li>
                      <Link href="/about/premises-at-dakhineswar">Premises at Dakshineswar</Link>
                    </li>
                    <li>
                      <Link href="/about/premises-at-dum-dum-park">Premises at Dumdum Park</Link>
                    </li>
                    <li>
                      <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeOGtWKGYI7pLUJz4CBawWymVZZMYrProbRlZtkGA7F01FwNw/viewform?pli=1">
                        Admissions
                      </Link>
                    </li>
                  </ul>
                </Col>
                <Col>
                  <ul>
                    <li>
                      <Link href="/news">Recent News</Link>
                    </li>
                    <li>
                      <Link href="/photogallery">Recent Photo</Link>
                    </li>
                    <li>
                      <Link href="/placement">Placement</Link>
                    </li>
                    <li>
                      <Link href="/pressreview">Press Review</Link>
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>
          </Col>
          <Col lg={4} md={6}>
            <div className="contactdetails">
              <h6>Contact Details</h6>
              <p>
                <MapPin /> Dakshineswar-24/1,R.N. Tagore Road, Dakshineswar,Kol-35
              </p>
              <p>
                <MapPin /> Dumdum Park-490,Dumdum Park, <br />
                Near Tank No.3,Kol-55
              </p>
              <p>
                <Mail /> Official Email: rasikbhita10@gmail.com
              </p>
              <p>
                <Book /> For Admission & Course Related Queries: rbforstudent@gmail.com
              </p>
            </div>
            <div className="sosIcon">
              <ul className="social-media">
                <li>
                  <Facebook />
                </li>
                <li>
                  <a href="https://www.youtube.com/@ssmrbssp" target="_blank">
                    <Youtube />
                  </a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
