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

  const ContactService = {};
  
  ContactService.contact = () => getService(`contactus`);

  export default ContactService;  