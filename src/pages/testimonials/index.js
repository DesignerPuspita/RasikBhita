import React, { useState } from "react";
import { Row, Col, Container, Button, Modal } from "react-bootstrap";
import Breadcrumb from "@/component/Breadcrumb";
import HomeService from "@/services/Home";
import RedButton from "@/component/RedButton";

const Testimonials = ({ homeStudentsSayData }) => {
  const [show, setShow] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleClose = () => setShow(false);

  const handleShow = (item) => {
    setCurrentItem(item);
    setShow(true);
  };

  return (
    <>
      <Container fluid className="px-0">
        <Breadcrumb breadCrumbCurrentPage="Student Testimonials" pageTitle="Student Testimonials" />
      </Container>
      <Container className="placement-cont testimonialContent">
        <Row>
          {homeStudentsSayData?.map((item, index) => (
            <Col xs={12} xl={6} key={index}>
              <div className="student-card">
                <div className="studentCardIMG">
                  <img src={item?.image_url} alt="student" />
                </div>
                <div className="student-card-text">
                  <h5>{item?.name}</h5>
                  <div
                    className="testimonialDetailspageText"
                    dangerouslySetInnerHTML={{ __html: item.textarea }}
                  ></div>
                  <div className="testiReadMore" onClick={() => handleShow(item)}> Read More... </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Testimonial</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {currentItem && (
              <div dangerouslySetInnerHTML={{ __html: currentItem.textarea }}></div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Testimonials;

export async function getServerSideProps() {
  const testimonials = await HomeService.testimonialSection();
  return {
    props: {
      homeStudentsSayData: testimonials.error === false ? testimonials.body : [],
    },
  };
}
