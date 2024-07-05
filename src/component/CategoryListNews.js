"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import NewsService from "../services/News";
import Loader from '../component/Loader';
import RedButton from '../component/RedButton';
import Link from 'next/link'

const CategoryListNews = () => {
  const [newsData, setnewsData] = useState(null);
  const [categoryData, setcategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isYear, setIsYear] = useState('');
  const handleYear = (yearVal) => {

    setIsYear(yearVal)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsDataResponse = await NewsService.newsPage();

        if (newsDataResponse) {
          setnewsData(newsDataResponse.recentEvents)
          setcategoryData(newsDataResponse.allyears)
          setLoading(false);
        } else {
          setLoading(true);
        }
        // Handle the news data response here, e.g., update state
      } catch (error) {
        console.error('Error fetching news data:', error);
        // Handle errors, e.g., set an error state
      }
    };

    fetchData();
  }, [isYear]);

  useEffect(() => {
    const YearWiseDataFetch = async () => {
      try {


        const YearWiseDataFetchResponse = await NewsService.getYearwiseNewsDetails(isYear)

      }
      catch (e) {
        console.error('YearWiseDataFetch', YearWiseDataFetch);
      }
    }
    YearWiseDataFetch()
  }, [isYear])

  return (
    <div className="categorylistwithhead">
      <h3>Category</h3>
      <div className="categorylist">
        <ul>

          {categoryData?.map((item, index) => {
            return (
              <li key={index} onClick={() => { handleYear(item) }}>
                {item}
              </li>
            )
          })}
        </ul>
      </div>

    </div>


  )
}

export default CategoryListNews