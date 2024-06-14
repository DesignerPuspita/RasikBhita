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



const CmsService = {};

CmsService.cmsPage = () => getService(`allcms`);
CmsService.cmsSinglePage = (storyId) => getService(`getcms/${storyId}`);

export default CmsService;
