import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import PlacementService from "@/services/Placement";
import Breadcrumb from "@/component/Breadcrumb";
const Placement = ({placementData}) => {
  const currentYear = new Date().getFullYear();
  const [YearSelect, setYearSelect] = useState(currentYear);
  const handleYear = (YearVal) => {
    setYearSelect(YearVal);
  };  

  return (
    <>      
      <Container fluid className="px-0">
        <Breadcrumb breadCrumbCurrentPage="Placement" pageTitle="Placement" />
      </Container>
      <Container className="placement-cont">
        <Row>
          <Col xs={12} lg={4}>
            <p className="mb-0">Select Year</p>
            <select
              onChange={(e) => handleYear(e.target.value)}
              className="form-control-search"
            >
              {placementData?.map((item, index) => {
                return (
                  <option onClick={() => handleYear(item.years)} key={index}>
                    {item.years}
                  </option>
                );
              })}
            </select>
          </Col>
        </Row>

        <Row>
          {placementData?.map((item, index) => {
            if (YearSelect == item.years) {
              return (
                <Col key={index} lg={4}>
                  <div className="student-card">
                    <div className="studentCardIMG">
                      <img src={item?.image} alt="student" />
                    </div>
                    <div className="student-card-text">
                      <h5>{item?.studentname}</h5>
                      <h6>{item?.occupation}</h6>
                      <p>{item?.schoolname}</p>
                      <p>{item?.description}</p>
                    </div>
                  </div>
                </Col>
              );
            }
          })}
        </Row>
      </Container>
    </>
  );
};

export default Placement;


export async function getServerSideProps(){
  const currentYear = new Date().getFullYear();
  const placementDataResponse = await PlacementService.placement();
  const placementData = placementDataResponse.error==false?placementDataResponse.body:[]

  return{
    props:{
      placementData:placementData
    }
  }
}
