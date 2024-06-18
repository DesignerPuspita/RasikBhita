import {
  deleteServiceAuthorized,
  getService,
  getServiceAuthorized,
  postService,
  postServiceAuthorized,
  postServiceFormData,
  postServiceFormDataAuthorized,
  putServiceAuthorized,
} from "@/configs/FetchRequest";



const CourseService = {};


CourseService.courseFee = () => getService(`CoursesFees`);
CourseService.courseList = () => getService(`Courses`);
CourseService.getCourseDetails=(courseName,courseId)=>getService(`CoursesDetails/${courseName}/${courseId}`)
CourseService.getCourseGroups=()=>getService('coursegroup')

export default CourseService;
