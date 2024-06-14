'use client'
import React, { useEffect, useState} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';




function AllCourses() {
  return (
    <div className = 'AllCourses'>
        <Container className='my-5'>
            <Row>
                <Col className='allcourses-top'>
                    <h6><img src='wave.gif' alt="wave" /> Admissions Going On</h6>
                    <h4>All courses at Rasik Bhita are </h4>
                    <h5>NSDC Certified <img src='logs.gif' alt="logs"/> <img src='logs2.gif' alt="logs2" /></h5>
                </Col>
            </Row>
            
            <Row className='CourseCards'>
                <Col>                    
                    <Card>
                    <Card.Body>
                        <div className='redCircleBlock'>
                            <div className='redCircle'>
                                <img src='vector.png' alt="designing" />
                            </div>
                        </div>
                        <Card.Title>Website Designing</Card.Title>
                        <Card.Subtitle>Neque porro quisquam est qui </Card.Subtitle>
                        <Card.Text>
                            HTML, CSS, Graphics Editing, Computer Animation, Bootstrap, Java Scripting, JQuery
                            Soft Skills and Code Editing.
                        </Card.Text>
                        <Button className='buttonalign' variant="secondary">Read More</Button>
                    </Card.Body>
                    </Card>                    
                </Col>
                
                <Col>                                        
                    <Card>
                    <Card.Body>
                        <div className='redCircleBlock'>
                            <div className='redCircle'>
                                <img src='web-development.png' alt="development" />
                            </div>
                        </div>
                        <Card.Title>Software Programming</Card.Title>
                        <Card.Subtitle>Neque porro quisquam est qui </Card.Subtitle>
                        <Card.Text>
                        Computer Fundamentals, DOS, Windows, Word, Excel, PowerPoint, Internet Microsoft Access
                        Python, SQL
                        </Card.Text>
                        <Button variant="secondary">Read More</Button>
                    </Card.Body>
                    </Card>                
                </Col> 

                <Col>                                           
                    <Card>
                    <Card.Body>
                        <div className='redCircleBlock'>
                            <div className='redCircle'>
                                <img src='document.png' alt="accounting" />
                            </div>
                        </div>
                        <Card.Title>Financial Accounting</Card.Title>
                        <Card.Subtitle>Neque porro quisquam est qui </Card.Subtitle>
                        <Card.Text>
                            Tally Prime (with VAT, FBT, TCS, CST, TDS, ST, Excise, Payroll, GST)
                            Advanced features of MS-Excel
                            Project & Soft Skill
                        </Card.Text>
                        <Button variant="secondary">Read More</Button>
                    </Card.Body>
                    </Card>                    
                </Col>

                {/* <Col>                                                               
                    <Card style={{ width: '309px', height:'380px'}}>
                    <Card.Body>
                        <div className='redCircleBlock'>
                            <div className='redCircle'>
                                <img src='multimedia.png'alt="multimedia" />
                            </div>
                        </div>
                        <Card.Title>Multimedia Course</Card.Title>
                        <Card.Subtitle>Neque porro quisquam est qui </Card.Subtitle>
                        <Card.Text>
                            Duration of Course: 1 year 6 months, Concept of Designing , Concept of Multimedia,Printing Technology
                            Graphics Designing and more.
                        </Card.Text>
                        <Button variant="secondary">Read More</Button>
                    </Card.Body>
                    </Card>                   
                </Col> */}
            </Row>
        </Container>
    </div>
  );
}

export default AllCourses;