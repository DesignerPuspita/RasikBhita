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
  
  
  
  const GalleryService = {};
  
  GalleryService.videos = () => getService(`getvideogallery`);
  GalleryService.images = () => getService(`galleryimage`);
  GalleryService.pressReview = () => getService(`pressnews`);
//   GalleryService.cmsSinglePage = (storyId) => getService(`getcms/${storyId}`);
  
  export default GalleryService;
  