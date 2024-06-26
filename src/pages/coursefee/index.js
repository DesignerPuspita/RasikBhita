
import { Container } from "react-bootstrap";
import React from "react";
import { Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import CourseService from "@/services/Course";
import Breadcrumb from "@/component/Breadcrumb";


const CourseFees = ({ courseFee }) => {
  return (
    <>
      <Container fluid className="px-0">
        <Breadcrumb
          pageTitle="Course Fees"
          breadCrumbCurrentPage="Course Fees"
        />
      </Container>

      <Container>
        <Row>
          <Col className="table-col">
            <Table striped bordered hover responsive className="main-table">
              <thead className="table-headings">
                <tr>
                  <th>Course Name</th>
                  <th>Duration</th>
                  <th>Total Course Fees</th>
                  <th>Admission Fees</th>
                  <th>Fees to be paid in installments</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {courseFee?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item?.course_name}</td>
                      <td className="courseduration-col">
                        {item.year !== 0 && `${item.year} year `} {item.month}{" "}
                        months
                      </td>
                      <td className="tot_coursefee-col">₹ {item?.total_course_fees}</td>
                      <td>{item?.admission_fees}</td>
                      <td>{item?.fees_to_installments}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CourseFees;

export async function getServerSideProps() {
  const CourseFeeDataResponse = await CourseService.courseFee();
  const courseFee =
    CourseFeeDataResponse.error == false ? CourseFeeDataResponse.body : [];

  return {
    props: {
      courseFee: courseFee,
    },
  };
}
