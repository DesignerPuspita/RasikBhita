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
  
  
  
  const ProjectService = {};
  
  ProjectService.projects = () => getService(`studentprojectViewmore`);
  
  export default ProjectService;
  