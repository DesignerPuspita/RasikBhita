// import axios from 'axios';
// import {useState} from 'react';
import {
  API_BASE_URL,
} from '../constants/common';



const getService = async (url) => {


  try {
      const responseObj = await fetch(`${API_BASE_URL}${url}`,{
      method: 'get',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
      },
      
    }).then((response) => {
      
      return response.json()
    })

    
    return (
      responseObj
    )
  } catch(err){
    return err;
  }
  
}
const getServiceAuthorized = async (url,accessToken) => {
   try {
      const responseObj = await fetch(`${API_BASE_URL}${url}`,{
      method: 'get',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + accessToken
      },
      
    }).then((response) => {
    
      return response.json()
    })


    return (
      responseObj
    )
  } catch(err){
    return err;
  }
  
}


const postService = async (url, payload) => {
  try {
      const responseObj = await fetch(`${API_BASE_URL}${url}`,{
      method: 'post',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
      
    }).then((response) => {
     
      return response.json()
    })

   
    return (
      responseObj
    )
  } catch(err){
    return err;
  }
  
}
const postServiceAuthorized = async (url, payload, accessToken) => {
  try {
      const responseObj = await fetch(`${API_BASE_URL}${url}`,{
      method: 'post',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify(payload)
      
    }).then((response) => {
      return response.json()
    })
    return (
      responseObj
    )
  } catch(err){
    return err;
  }
  
}
const putServiceAuthorized = async (url, payload, accessToken) => {
  try {
      const responseObj = await fetch(`${API_BASE_URL}${url}`,{
      method: 'put',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify(payload)
      
    }).then((response) => {
    
      return response.json()
    })
    return (
      responseObj
    )
  } catch(err){
    return err;
  }
  
}
const deleteServiceAuthorized = async (url, payload, accessToken) => {
  try {
      const responseObj = await fetch(`${API_BASE_URL}${url}`,{
      method: 'delete',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify(payload)
      
    }).then((response) => {
      return response.json()
    })
    return (
      responseObj
    )
  } catch(err){
    return err;
  }
  
}

const postServiceFormData = async (url, formdata) => {
  try {
      const responseObj = await fetch(`${API_BASE_URL}${url}`,{
      method: 'post',
      // headers: {
          //     // Accept: "application/json",
          //     // "Content-Type": "application/json",
      // },
      body: formdata
      
    }).then((response) => {
      return response.json()
    })
    return (
      responseObj
    )
  } catch(err){
    return err;
  }
  
}
const postServiceFormDataAuthorized = async (url, formdata, accessToken) => {
  try {

      const responseObj = await fetch(`${API_BASE_URL}${url}`,{
      method: 'post',
      headers: {
              // Accept: "multipart/form-data",
              // "Content-Type": "multipart/form-data",
              'Authorization': 'Bearer ' + accessToken
      },
      body: formdata
      
    }).then((response) => {
      return response.json()
    })

    return (
      responseObj
    )
  } catch(err){
    return err;
  }
  
}

export  {getService, postService, postServiceFormData, getServiceAuthorized, postServiceAuthorized, postServiceFormDataAuthorized, putServiceAuthorized, deleteServiceAuthorized};