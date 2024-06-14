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
  
  
  
  const HomeService = {};
  HomeService.homeSlider = () => getService('gethomebanner')
  HomeService.courseList = () => getService(`Courses`)
  HomeService.aboutUs = () => getService(`aboutus`)
  HomeService.activitiesQuote = () =>getService(`activities`)
  HomeService.activities = () => getService(`allcms`)
  HomeService.corpsLogs = () => getService(`getcorporatelogo`)
  HomeService.studProjs = () => getService(`getstudentprojects`)
  HomeService.testimonialSection = () => getService(`gettestimonial`);
  HomeService.miscSection = () => getService(`getmiscellaneous`);
  HomeService.homeNews = () => getService(`recent-news`);
  HomeService.upComingEvents = () => getService(`events`);
  

  
  export default HomeService;
  