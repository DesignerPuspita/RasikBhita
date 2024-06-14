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
  
  
  
  const NewsService = {};
  
  NewsService.newsPage = () => getService(`recent-news`);
  NewsService.getNewsDetails=(newsId)=>getService(`recent-news/${newsId}`)
  NewsService.getYearwiseNewsDetails=(year)=>getService(`recent-news/year/${year}`)

 
  export default NewsService;
  