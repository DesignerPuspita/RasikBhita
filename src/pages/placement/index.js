import React, { useState } from "react";
import { Row, Col, Container, Table, Button } from "react-bootstrap";
import PlacementService from "@/services/Placement";
import Breadcrumb from "@/component/Breadcrumb";
import RedButton from "@/component/RedButton";

const Placement = ({ placementData }) => {
  const currentYear = new Date().getFullYear();
  const [YearSelect, setYearSelect] = useState(currentYear);
  const [visibleItemCount, setVisibleItemCount] = useState(50); // Initial number of items to display

  const handleYear = (YearVal) => {
    setYearSelect(YearVal);
    setVisibleItemCount(50); // Reset visible items when year changes
  };

  // Extract unique years
  const uniqueYears = [...new Set(placementData.map((item) => item.years))];

  const handleLoadMore = () => {
    setVisibleItemCount((prevCount) => prevCount + 50); // Increase visible items by 50
  };

  // Filter data by selected year
  const filteredData = placementData.filter((item) => YearSelect == item.years);

  return (
    <>
      <Container fluid className="px-0">
        <Breadcrumb breadCrumbCurrentPage="Placement" pageTitle="Placement" />
      </Container>
      <Container className="placement-cont">
        <Row className="mb-4">
          <Col xs={12} lg={4}>
            <p className="mb-0">Select Year</p>
            <select
              onChange={(e) => handleYear(e.target.value)}
              className="form-control-search"
              value={YearSelect}
            >
              {uniqueYears.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Table striped bordered hover className="main-table">
              <thead className="table-headings">
                <tr>
                  <th style={{ width: "70px" }}>Sr. No</th>
                  <th>Image</th>
                  <th>Student Name</th>
                  <th>Occupation</th>
                  <th>School Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredData
                  .slice(0, visibleItemCount) // Display up to visibleItemCount
                  .map((item, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td>
                        <img
                          src={item?.image}
                          alt="student"
                          style={{ width: "50px", height: "50px" }}
                        />
                      </td>
                      <td>{item?.studentname}</td>
                      <td>{item?.occupation}</td>
                      <td>{item?.schoolname}</td>
                      <td>{item?.description}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {visibleItemCount < filteredData.length && (
              <div className="text-center mt-3 smallRedBtn">
                <RedButton buttonText="Read More" onClick={handleLoadMore} />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Placement;

export async function getServerSideProps() {
  const placementDataResponse = await PlacementService.placement();
  const placementData =
    placementDataResponse.error === false ? placementDataResponse.body : [];

  return {
    props: {
      placementData: placementData,
    },
  };
}
