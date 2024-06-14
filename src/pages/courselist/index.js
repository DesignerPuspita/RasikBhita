
// import { useRouter } from 'next/navigation';
import React, { useEffect, useState} from 'react';
import Breadcrumb from '@/component/Breadcrumb';
import RedButton from '@/component/RedButton';
import { Row, Col, Container } from "react-bootstrap";
// import CourseService from '../services/Course';
import Loader from '@/component/Loader';
import Link from 'next/link'
import CourseService from '@/services/Course';


const CourseList = ({courseDetails}) => {

  // const [courseDetails, setCourseDetails] = useState([]); 
  // const [loading, setLoading] = useState(true);
  // const router = useRouter(); 
//   useEffect(() => {

//     const CourseListData = async () => {
//         try {
//             const CourseListDataResponse = await CourseService.courseList();
//             console.log('CourseListDataResponse', CourseListDataResponse.body);
//             if (CourseListDataResponse.error === false) {
//                 setCourseDetails(CourseListDataResponse.body); 
//                 setLoading(false);
               
                
//             } else {  
//                 setLoading(true);
//             }
//         } catch (error) {
//             // console.log('Course List Data Fetch', error);
//         }
//     };

//     CourseListData();
// }, []); 

// const handleCourseDetails = (courseId) =>{

//   router.push(`/coursedetails/${courseId}`);
 
//  // console.log('courseId', courseId);

// }
  return (
    <>
     {/* {loading && <Loader />} */}
    <Container fluid className='px-0'>      
        <Breadcrumb pageTitle="All Courses" breadCrumbCurrentPage="All Courses"/>
    </Container>
    
    <Container>
        <Row className='rowgallery1'>
          {courseDetails.map((item,index)=>{
            
            return(
              <Col xs={12} lg = {4} md={6} key = {index}>
                <div className='course-block'>
                    <div className='courseImgBlock'>
                        <img src={(item.course_img_path == null)? 'placeholder.png':item?.course_img_path} alt="gallery" className='img-fluid mb-4'/>
                      </div> 
                      <div className='pad-15'>
                      <p className='courselist-coursename'>{item?.course_name}</p>
                    {/* {item.course_id} */}
                    {/* <p>{item?.course_short_desc}</p> */}
                    <div className='courselist-short-desc listingDataCourse' dangerouslySetInnerHTML={{__html: item?.course_desc}}></div>
                    <Link href={`courselist/${item.course_name.replace(/\s+/g, '-')}`}> <RedButton buttonText='View More'/></Link>
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
export default CourseList