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

  const PlacementService = {};
  
  PlacementService.placement = () => getService(`studentplaced`);

  export default PlacementService;  