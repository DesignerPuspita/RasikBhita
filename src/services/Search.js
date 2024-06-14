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
  
  
  
  const SearchService = {};
  
  SearchService.searchThis = (searchQuery) => postService(`search/${searchQuery}`,{});
  
  export default SearchService;
  