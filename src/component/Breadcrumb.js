import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link';


const Breadcrumb = ({breadCrumbPrevPage,breadCrumbCurrentPage,pageTitle}) => {
  return (
    <>
        <div className='breadcrumbimage-container'>
            <div className='after'>
                <Container className='breadcrumb-area'>
                    <div className='breadCrumbTextArea'>
                        <Row>
                            <Col>
                             
                                 <div className='pageNameList'>
                                    <ul>
                                        <li><Link className='breadCrumbPageLink' href="/" >Home - </Link></li>
                                        {breadCrumbPrevPage &&
                                        <li><span className='breadCrumbPageLink'>{breadCrumbPrevPage} - </span></li>
                                    }
                                        <li className='breadCrumbPageLink'>{breadCrumbCurrentPage}</li>
                                    </ul>
                                 </div>
                                <div className='pageTitle'>{pageTitle}</div>
                            
                            </Col>
                        </Row>
                        </div>
                </Container>
            </div>
        </div>
    </>
  )
}

export default Breadcrumb