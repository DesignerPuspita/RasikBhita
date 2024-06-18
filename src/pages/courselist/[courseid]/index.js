'use client'
import React, { useEffect, useState} from 'react';
import { Row, Col, Container } from "react-bootstrap";
import CourseService from '@/services/Course';
import RedButton from '@/component/RedButton';
// import Loader from '@/app/component/Loader';
import Breadcrumb from '@/component/Breadcrumb';
import { Clock } from 'react-feather';
import { Book } from 'react-feather';
import { useRouter } from 'next/router';
import Head from 'next/head';

const CourseDetails = ({courseDurationMonth,courseDurationYear,courseDetails,courseOption}) => {
   const [courseDetailsError, setCourseDetailsError] = useState(null); 
    const [loading, setLoading] = useState(true);      
   return (
        <>
            
            <Head>
            <title>{generateMetadata(courseDetails).title}</title>
            <meta name="description" content={generateMetadata(courseDetails).description} />
           </Head>
            <Container fluid className='px-0'>
                
                <Breadcrumb
                breadCrumbCurrentPage = {courseDetails?.course_name}
                pageTitle={courseDetails?.course_name}/>

            </Container>
            
            <Container className='my-5'>
                
                {courseDetailsError ? (
                    <Row className="coursedetails-row">
                        <Col xs={12}>
                            <Row>
                                <Col xs ={12}>
                                <div className='error-msg'>{courseDetailsError}</div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                ) : (
                    <Row className="coursedetails-row">
                        <Col xs={12} lg={8}>
                        <div className='desc-left'>
                            <div className="coursetop">
                                <h3>{courseDetails?.course_name}</h3>
                                <div className="jobRoleBlockWrap">
                                    <span className='jobRoleBlock'>Job Roles </span>
                                    {/* <p className='mb-0'>{courseDetails?.job_role}</p> */}
                                    <p className='jobrole-text mb-0'>{courseDetails?.job_role}</p>
                                </div>

                                <div className='aproved-by'>
                                    <p>{courseDetails?.approavedby}</p>
                                    <img className='img-fuid' src={courseDetails?.approved_by_logo} 
                                    />
                                </div>
                              
                            </div>
                            <div className='courseImg'>
                                <img src={courseDetails?.course_img_path} alt="Course" />
                            </div> 
                            <div className="duration">
                            <Clock />
                            <p>  Duration of Course: {courseDurationYear!== 0 && `${courseDurationYear} year `} {courseDurationMonth} months</p>
                            </div>
                            <div className="courselist-modules">    
                                <h3>Course Content</h3>
                                {/* <div>{courseDetails?.course_content}</div> */}
                                <div className='courselist-short-desc default-para-remove' dangerouslySetInnerHTML={{__html: courseDetails?.course_content}}></div>
                            </div>
                            <div className="lines">
                                <p><span className="twolines">Eligibility:</span> {courseDetails?.eligibility_criteria}</p>
                                <p>Course Fee: ₹{courseDetails?.course_fees}</p>
                            </div>
                            <div className="twobuttons">
                                <RedButton buttonText="Apply Now" />
                                {/* <div className='viewmorebutton'>View More</div> */}
                            </div>
                            </div>
                        </Col>
                        <Col xs={12} lg={4}>
                            <div className="courselistwithhead">
                                <h3><Book/> Courses List</h3> 
                                <div className="courselist">
                                    <ul>
                                        
     
                                        {courseOption?.map((item,index)=>{
                                            return(

                                                <li key={index}><span>{item.group_name}</span>
                                                <ul>
                                                    {item.coursesList?.map((item,index)=>{
                                                        return(
                                                          <li key={index}>{item.course_name}</li>
                                                        )
                                                    })} 
                                                </ul>
                                            </li> 
                                            )           
                                        })}
                                    </ul>
                                    {/* <ul>
                                    {courseOption?.map((item,key)=>{
                                        return(
                                            <li key={index}><span>{}</span></li>
                                        )
                                    })}
                                    </ul> */}
                                </div>
                            </div>

                            <div className="schedule">
                                <h6 className='text-left'><Clock/>  Opening Hours</h6>
                                <div className="weekdaysandtime">
                                   <ul>
                                    <li><span>Monday-Sunday</span><span>10:00 am-5:00 pm</span></li>
                                    <li><span>Tuesday</span><span>Closed</span></li>
                                   </ul>
                                </div>                             
                            </div>
                        </Col>
                    </Row>
                )}
            </Container>
        </>
    );
};
export async function getServerSideProps(context) {
    const { courseid } = context.query;
    // console.log('courseIdcourseIdcourseIdcourseId', courseid);
    // console.log('context.query:', context.query);
    // console.log('Requested URL:', context.req.url);
    
    try {
        const CourseDetailsDataResponse = await CourseService.getCourseDetails(courseid);
        console.log('courseOption', CourseDetailsDataResponse.body.coursegroup);
        if (CourseDetailsDataResponse.error === false) {
            return {
                props: {
                    courseDurationMonth: CourseDetailsDataResponse.body.month,
                    courseDurationYear:  CourseDetailsDataResponse.body.year,
                    courseDetails: CourseDetailsDataResponse.body.coursedetail,
                    courseOption: CourseDetailsDataResponse.body.coursegroup,
                    
                },
            };
        } else {
            return {
                props: {
                    courseDurationMonth: [],
                    courseDurationYear:  [],
                    courseDetails: [],
                    courseOption: []
                },
            };
        }
    } catch (error) {
        console.error('Error fetching course data:', error);
        return {
            props: {
                courseDurationMonth: [],
                courseDurationYear:  [],
                courseDetails: [],
                courseOption: []
            },
        };
    }
  }
  
  export function generateMetadata(courseDetails) {
    if (!courseDetails || !courseDetails.title || !courseDetails.meta_description) {
        return {
            title: 'Default Title',
            description: 'Default Description',
        };
    }
    return {
        title: courseDetails.title,
        description: courseDetails.meta_description,
    };
}
export default CourseDetails;

