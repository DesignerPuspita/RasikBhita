import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import Breadcrumb from '@/component/Breadcrumb';
import { MapPin } from 'react-feather';
import { PhoneCall } from 'react-feather';
import { Mail } from 'react-feather';
import { Book } from 'react-feather';
import { Clock } from 'react-feather';
import ContactService from '../services/Contact';
import Loader from '@/component/Loader';
import Link from 'next/link';
import Head from 'next/head';

const ContactUs = ({ contactData }) => {


    const [loading, setLoading] = useState(true)

    const [show, setShow] = useState(false);
    const [imageURL, setImageURL] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = (name) => {
        setImageURL(name)
        setShow(true)
    }

    // useEffect(()=>{
    //     const CourseFeeData = async () =>{
    //     try{
    //         const contactDataResponse = await ContactService.contact()
    //         if(contactDataResponse)
    //         {   

    //             setContactData(contactDataResponse)

    //             setLoading(false)                
    //         }else {  
    //             setLoading(true);
    //         }
    //     }
    //     catch (error){           
    //     }
    //     }
    //     CourseFeeData()
    // },[])


    return (
        <>

            {/* {loading && <Loader />} */}
            <Head>
            <title>{generateMetadata().title}</title>
            <meta name="description" content={generateMetadata().description} />
           </Head>
            <Container fluid className='px-0'>
                <Breadcrumb pageTitle="Contact Us" breadCrumbCurrentPage="Contact Us" />
            </Container>

            <Container className="contactcontainer my-5" >
                <Row>
                    <Col className="contacttop">
                        <h6><img src='/images/wave.png' alt="wave" /> Direct Contact</h6>
                        <h2>Get in <span className="redtexthead">touch</span></h2>
                        <p>Rasik Bhita, a part of Sri Sarada Math is devoted to help the society through a
                            variety of courses and trainings offered here.The students trained here are confident
                            and skillful enough to produce great work at the industry level as soon as they
                            complete the courses. We welcome all recruiters to hire our trained students and be a
                            part of this organization.
                        </p>
                    </Col>
                </Row>

                <Row>

                    {contactData?.map((item, index) => {
                        return (
                            <Col xs={12} lg={6} key={index}>
                                <div className="contactusdetails-left course-block" >
                                    <h2>{item?.big_Heading}</h2>

                                    <div className="locationinfo">
                                        <div className="locationinfoimg"><MapPin /></div>
                                        <div className="locationinfotext">
                                            <h6>Office Location</h6>
                                            <p>{item?.office_Location}</p>
                                        </div>
                                    </div>
                                    <div className="callinfo">
                                        <div className="callinfoimg"><PhoneCall /></div>
                                        <div className="callinfotext">
                                            <h6>Contact Number</h6>
                                            <p>{item?.contact_No}</p>
                                        </div>
                                    </div>
                                    <div className="emailinfo">
                                        <div className="emailinfoimg"><Mail /></div>
                                        <div className="emailinfotext">
                                            <h6>Official Email Address</h6>
                                            <p>{item?.office_email}</p>
                                        </div>
                                    </div>
                                    <div className="queriesinfo">
                                        <div className="queriesinfoimg"><Book /></div>
                                        <div className="queriesinfotext">
                                            <h6>For Admission & Course Related Queries</h6>
                                            <p>{item?.admission_Coursequeries}</p>
                                        </div>
                                    </div>
                                    <div className="timinginfo">
                                        <div className="timinginfoimg"><Clock /></div>
                                        <div className="timinginfotext">
                                            <h6>Visiting hours</h6>
                                            <p>{item?.visiting_hour}</p>
                                        </div>
                                    </div>
                                    <div className="mapsection mapBtn ">

                                        <Button variant="primary" onClick={() => handleShow(item.heading_img)}>
                                            View Road Map
                                        </Button>

                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton><Modal.Title>Road Map</Modal.Title></Modal.Header>
                                            <Modal.Body>
                                                <img className='img-fluid' src={imageURL}></img>
                                            </Modal.Body>
                                        </Modal>

                                        <Link className='google-map-button' href={item?.google_Map_Url}>View Google Map</Link>

                                    </div>
                                </div>
                            </Col>
                        )
                    })}
                </Row>

            </Container>

        </>

    )
}
export async function getServerSideProps() {
    try {
        const contactDataResponse = await ContactService.contact();
        if (contactDataResponse) {
            return {
                props: {
                    contactData: contactDataResponse,
                },
            };
        } else {
            return {
                props: {
                    contactData: [],
                },
            };
        }
    } catch (error) {
        console.error('Error fetching contact data:', error);
        return {
            props: {
                contactData: [],
            },
        };
    }
}
export function generateMetadata() {
    return {
      title: "Contact Us - Your Website Name",
      description: "Contact us for inquiries, location details, and more. Your description here.",
    };
  }
export default ContactUs
