import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Mail } from 'react-feather';
import { PhoneCall } from 'react-feather';
import { MapPin } from 'react-feather';
import { Book } from 'react-feather';

const Topbar = () => {
  return (
    <div className='topBar top-link'>
      <Container className='topBarBox'>
        <Row className='high-z-index div1'>
          <Col xs={4} lg={4} md={5} sm={6}><p><Book /> Admission & Course Related Queries</p></Col>
          <Col xs={8} lg={8} md={7} sm={6}>
            <Row className='justify-content-end'>
              <Col xs={4} lg={4} md={2} sm={4}>
                <div className='text-right topIconText '><div className='topIconBox'><PhoneCall /></div> <div className='topIconBoxTxt position-relative'>
                  <span className="change">Dakshineswar: 033-2544-4999</span>
                  <span className="change">Dumdum Park: 033 2590 6116</span>
                  <span className="change">Dakshineswar: 033-2544-4999</span>
                  <span className="change">Dumdum Park: 033 2590 6116</span>
                </div></div></Col>
              <Col xs={4} lg={4} md={2} sm={4}><div className='text-right topIconText'><div className='topIconBox'><Mail /></div>  <div className='topIconBoxTxt position-relative'>
                <span className="change w-160">rasikbhita10@gmail.com</span>
                <span className="change w-160">vivek.library@yahoo.com</span>
                <span className="change w-160">rasikbhita10@gmail.com</span>
                <span className="change w-160">vivek.library@yahoo.com</span>

              </div></div></Col>
              <Col xs={4} lg={4} md={2} sm={4}><div className='text-right topIconText'><div className='topIconBox'><MapPin /></div> <div className='topIconBoxTxt position-relative'>
                
                <span className="change">24/1,R.N.Tagore Road,Kol-35</span>
                <span className="change">490, Dumdum Park, Kolkata-55</span>
                <span className="change">24/1,R.N.Tagore Road,Kol-35</span>
                <span className="change">490, Dumdum Park, Kolkata-55</span>
                </div></div></Col>
            </Row>
          </Col>
        </Row>

      </Container>
    </div>
  )
}

export default Topbar