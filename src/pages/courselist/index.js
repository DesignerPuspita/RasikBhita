import React from 'react';
import Breadcrumb from '@/component/Breadcrumb';
import RedButton from '@/component/RedButton';
import { Row, Col, Container } from "react-bootstrap";
import Loader from '@/component/Loader';
import Link from 'next/link'
import CourseService from '@/services/Course';

const CourseList = ({courseDetails}) => {
  function generateSlug(title) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  return (
    <>
      {/* {loading && <Loader />} */}
      <Container fluid className='px-0'>      
        <Breadcrumb pageTitle="All Courses" breadCrumbCurrentPage="All Courses"/>
      </Container>
    
      <Container>
        <Row className='rowgallery1'>
          {courseDetails.map((item, index) => {
            // const courseSlug = item.course_name.replace(/\s+/g, '-');
            const courseSlug = generateSlug(item.course_name);
            return (
              <Col xs={12} lg={4} md={6} key={index}>
                <div className='course-block'>
                  <div className='courseImgBlock'>
                    <img 
                      src={item.course_img_path == null ? 'placeholder.png' : item?.course_img_path} 
                      alt="gallery" 
                      className='img-fluid mb-4'
                    />
                  </div> 
                  <div className='pad-15'>
                    <p className='courselist-coursename listingCourseName'>{item?.course_name}</p>
                    <div 
                      className='courselist-short-desc listingDataCourse' 
                      dangerouslySetInnerHTML={{__html: item?.course_desc}}
                    ></div>
                    <Link href={`/courselist/${courseSlug}/${item.course_id}`} className='listVwBtn'>
                      <RedButton buttonText='View More'/>
                    </Link>
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
    const CourseListDataResponse = await CourseService.courseList();
    if (CourseListDataResponse.error === false) {
      return {
        props: {
          courseDetails: CourseListDataResponse.body,
        },
      };
    } else {
      return {
        props: {
          courseDetails: [],
        },
      };
    }
  } catch (error) {
    console.error('Error fetching course data:', error);
    return {
      props: {
        courseDetails: [],
      },
    };
  }
}

export default CourseList;
