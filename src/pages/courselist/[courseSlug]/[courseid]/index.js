import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head';
import Breadcrumb from '@/component/Breadcrumb';
import RedButton from '@/component/RedButton';
import CourseService from '@/services/Course';
import { Clock, Book } from 'react-feather';
import Link from "next/link";

const CourseDetails = ({ courseDurationMonth, courseDurationYear, courseDetails, courseOption }) => {
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
          breadCrumbCurrentPage={courseDetails?.course_name}
          pageTitle={courseDetails?.course_name}
        />
      </Container>
      <Container className='my-5'>
        {courseDetailsError ? (
          <Row className="coursedetails-row">
            <Col xs={12}>
              <Row>
                <Col xs={12}>
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
                    <span className='jobRoleBlock'>Job Roles</span>
                    <p className='jobrole-text mb-0'>{courseDetails?.job_role}</p>
                  </div>
                  <div className='approved-by'>
                    <p>{courseDetails?.approvedby}</p>
                    <img className='img-fluid' src={courseDetails?.approved_by_logo} alt="Approved by" />
                  </div>
                </div>
                <div className='courseImg'>
                  <img src={courseDetails?.course_img_path} alt="Course" />
                </div>
                <div className="duration">
                  <Clock />
                  <p>Duration of Course: {courseDurationYear !== 0 && `${courseDurationYear} year `} {courseDurationMonth} months</p>
                </div>
                <div className="courselist-modules">
                  <h3>Course Content</h3>
                  <div className='courselist-short-desc default-para-remove' dangerouslySetInnerHTML={{ __html: courseDetails?.course_content }}></div>
                </div>
                <div className="lines">
                  <p><span className="twolines">Eligibility:</span> {courseDetails?.eligibility_criteria}</p>
                  <p>Course Fee: ₹{courseDetails?.course_fees}</p>
                </div>
                <div className="twobuttons">
                  <RedButton buttonText="Apply Now" />
                </div>
              </div>
            </Col>
            <Col xs={12} lg={4}>
              <div className="courselistwithhead">
                <h3><Book /> Courses List</h3>
                <div className="courselist">
                  <ul>
                    {courseOption?.map((item, index) => (
                      <li key={index}><span>{item.group_name}</span>
                        <ul>
                          {item.coursesList?.map((course, idx) => (
                            <li key={idx}><Link href={`/courselist/${course.course_name.replace(/\s+/g, "-")}/${course.course_id}`}>{course.course_name}</Link></li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="schedule">
                <h6 className='text-left'><Clock /> Opening Hours</h6>
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
  const { courseSlug, courseid } = context.params;
  try {
    const CourseDetailsDataResponse = await CourseService.getCourseDetails(courseSlug, courseid);
    
    if (CourseDetailsDataResponse.error === false) {
      return {
        props: {
          courseDurationMonth: CourseDetailsDataResponse.body.month,
          courseDurationYear: CourseDetailsDataResponse.body.year,
          courseDetails: CourseDetailsDataResponse.body.coursedetail,
          courseOption: CourseDetailsDataResponse.body.coursegroup,
        },
      };
    } else {
      return {
        props: {
          courseDurationMonth: [],
          courseDurationYear: [],
          courseDetails: [],
          courseOption: [],
        },
      };
    }
  } catch (error) {
    console.error('Error fetching course data:', error);
    return {
      props: {
        courseDurationMonth: [],
        courseDurationYear: [],
        courseDetails: [],
        courseOption: [],
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
