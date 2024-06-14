import {
    getService,
  } from "@/configs/FetchRequest";
  
  
  
  const ElearningService = {};
  
  ElearningService.elearning = () => getService(`elearning`);
  
  export default ElearningService;
  