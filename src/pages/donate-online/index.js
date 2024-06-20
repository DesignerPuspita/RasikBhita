import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import Breadcrumb from "@/component/Breadcrumb";
const Donations = () => {
  return (
    <>      
      <Container fluid className="px-0">
        <Breadcrumb breadCrumbCurrentPage="Donate Online" pageTitle="Donate Online" />
      </Container>
      <Container className="placement-cont">
        <Row>
          <Col> 
            <p>SRI SARADA MATH – RASIK BHITA is envisioning to undertake a 
                project of setting up a new unit of vocational training center, 
                specifically meant for the <strong>visually impaired girls hailing from 
                financially challenged backgrounds with a view to making them self-reliant.</strong> 
            </p>

            <p>In line with the objectives of ‘Mission Shakti’, 
                <strong>the new project will enable the visually impaired girls to be economically independent, 
                facilitating their inclusion in the mainstream society. </strong>
                As there is no prominent institute in Kolkata for providing skill development 
                training to the visually impaired girls <strong> using Assistive Digital Technology at
                 nominal charges or free of cost,</strong>
                and our institute is well-connected to Kolkata and the suburbs by railway, 
                metro and bus, a large no. of visually impaired girls will be benefitted by this project.
             </p>

             <p>
                A parcel of land of area 301.653 Sq.M (04K-08Ch-07Sqft) 
                opposite Rasik Bhita main unit is now available for outright sale. 
                Rasik Bhita proposes to buy the land and construct a four storied building
                which would accommodate the following:
             </p>

             <ul>
                <li><strong>Training rooms for providing training in different courses of Computer, 
                    Communicative English and Soft skills for the visually impaired students</strong> with a view to 
                    making them economically independent and self-reliant. 
                </li>
                
                <li><strong>Additional training rooms to provide training to the 
                    visually impaired girls alongside their sighted peers.</strong>
                    This inclusive training environment will not only aid the personal and academic development
                     of all students but also provide an opportunity to benefit  from each other's strengths and experiences,
                      which would lead to a more inclusive and empathetic society.

                </li>

                <li><strong>An activity area for training in physical exercises, self-defence and Yoga</strong>
                    and a library for all the students. In the present times, need of training on self-defence, 
                    yoga, especially for the visually impaired girls cannot be overlooked. 
                </li>
             </ul>

            <p><strong>The estimated total cost of the project is Rs 6.42 Cr (land 2.90, buildings 3.02 & furniture 0.5). </strong>
                To start the project, acquiring the land is the need of the hour, the amount of which is <strong>Rs. 2.90 Crores.</strong> 
            </p>

            <p>We earnestly request one and all to generously donate towards the <strong>Land and Building Fund of 
                Sri Sarada Math - Rasik Bhita</strong>  to enable us to venture on our new project of serving the 
                visually impaired girls. Donations to the Math are exempt from Income Tax u/s 80G of the I.T. Act, 1961.
            </p>

            <p>The online Payment Gateway will soon be available here.
                For transferring funds directly to the bank account of Rasik Bhita, 
                send e-mail to rasikbhita10@gmail.com. 
            </p>

          </Col>
        </Row>

        
      </Container>
    </>
  );
};

export default Donations;


