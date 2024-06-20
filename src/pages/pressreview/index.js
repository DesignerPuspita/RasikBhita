import { Container } from "react-bootstrap";
import React from "react";
import { Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import CourseService from "@/services/Course";
import Breadcrumb from "@/component/Breadcrumb";

const index = () => {
  return (
    <>
            <>
      <Container fluid className="px-0">
        <Breadcrumb
          pageTitle="Press Review"
          breadCrumbCurrentPage="Press Review"
        />
      </Container>

      <Container>
      
      </Container>
    </>
    </>
  )
}

export default index