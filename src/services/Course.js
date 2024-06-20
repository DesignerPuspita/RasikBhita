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
// CourseService.getCourseDetails=(courseid,id)=>getService(`CoursesDetails/${courseid}/${id}`)
CourseService.getCourseDetails=(courseid,id)=>getService(`CoursesDetails/${courseid}/${id}`)

CourseService.getCourseGroups=()=>getService('coursegroup')

export default CourseService;
