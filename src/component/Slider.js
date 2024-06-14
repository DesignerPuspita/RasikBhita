import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

const Slider = ({data,page,quote}) => {
  // State variables
  
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4; // Number of items per page

   
  // Function to handle "Next" button click
  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  // Function to handle "Previous" button click
  const handlePreviousClick = () => {
    setCurrentPage(currentPage - 1);
  };

  // Calculate the range of items to display
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


  if(page=='testimonials'){
    return (
      <div>
        <Row className="JobCardsRow">
          
          {data.slice(startIndex, endIndex).map((item, index) => (
            <Col key={index} className="JobCards" xs={12} lg={3}> 
              <Card>
                <Card.Body>
                  <div className="testimonial-card">
                    <div className="QuoteImage">
                      <img style={{height:"60px",width:'60px'}} src={item.image_url} alt="quote" />
                    </div>

                    <div>
                        <p>{item.name}</p>
                        <p>{item.role}</p>
                    </div>
                  
                  </div>
                      
                    <Card.Text>
                      <div className="courselist-short-desc" dangerouslySetInnerHTML={{ __html: item.textarea }}></div>
                    </Card.Text>
                  
                  {/* <div>
                    <div className="studentprofile">
                      <div className="jkolepic">
                        
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFc2GTvBs3jkf7QbA-5ENT75CH9k2pYuAvIAoMher9bg&s"/>
                      </div>
                      <div className="jkole">
                        <h6>Jayati Koley</h6>
                        <p>Student</p>
                      </div>
                    </div>
                  </div> */}
                </Card.Body>
              </Card>
            </Col>
           ))} 
        </Row>
        
        {currentPage > 0 && <button onClick={handlePreviousClick}>Previous</button>}
        
        {endIndex < data.length && <button onClick={handleNextClick}>Next</button>}
      </div>
    );
  }

  if(page=='course'){
    return (
      <div>
        <Row className="JobCardsRow">
          
          {data.slice(startIndex, endIndex).map((item, index) => (
            <Col key={index} className="JobCards" xs={12} lg={3}> 
              <Card>
                <Card.Body>
                  <div className="QuoteImage">
                    <img className='img-fluid'style={{height:"180px",width:'250px'}} src={item.course_icon} alt="quote" />
                  </div>
                  <div>
                    <Card.Text>
                      <h5 className="home-couse-head">{item.course_name}</h5>
                    <div
                  className="courselist-short-desc"
                  dangerouslySetInnerHTML={{ __html: item.course_short_desc }} 
                ></div>
                      
                    </Card.Text>
                  </div>
                  <Button href={`courselist/${item.course_name}`} className="buttonalign" variant="secondary">
                  Read More
                </Button>

                </Card.Body>
              </Card>
            </Col>
           ))} 
        </Row>
        
        {currentPage > 0 && <button onClick={handlePreviousClick}>Previous</button>}
        
        {endIndex < data.length && <button onClick={handleNextClick}>Next</button>}
      </div>
    );
  }

  if(page=='activities'){    
    return (
      <div>
        <Row className="ouractivitiesrow">
            <Col className="ouractivitiescol">
              <h6>
                <img src="images/wave.png" alt="wave" /> Our Activities
              </h6>
              <h3>--{"ssd"}</h3>
              <h6>-{"unknown"}</h6>

              
            </Col>
          </Row>
        <Row className="JobCardsRow">
          
          {data.slice(startIndex, endIndex).map((item, index) => (
            <Col key={index} className="JobCards" xs={12} lg={3}> 
              <Card>
                <Card.Body>
                  <div className="QuoteImage">
                    <img style={{height:"180px",width:'245px'}} src={item.cmsImagestableEntity[0].cms_body_img_path} alt="quote" />
                  </div>
                  <div>
                    <Card.Text>
                      <h5>{item.course_name}</h5>
                    <div
                  className="courselist-short-desc"
                  dangerouslySetInnerHTML={{ __html: item.storyTableEntity.page_name }}
                ></div>
                      
                    </Card.Text>
                  </div>

                </Card.Body>
              </Card>
            </Col>
           ))} 
        </Row>
        
        {currentPage > 0 && <button onClick={handlePreviousClick}>Previous</button>}
        
        {endIndex < data.length && <button onClick={handleNextClick}>Next</button>}
      </div>
    );
  }


};

export default Slider;
