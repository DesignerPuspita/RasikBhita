import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import NewsService from "@/services/News";
import Loader from "@/component/Loader";
import { Archive } from 'react-feather';
import RedButton from "@/component/RedButton";
import Link from "next/link";
import Breadcrumb from "@/component/Breadcrumb";

const NewsListing = ({categoryData,currentYear}) => {
  
  const [newsData, setnewsData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [yearWiseNewsData, setYearWiseNewsData] = useState(false);
  const [otherYear, setOtherYear] = useState("");
  const [visibleItemCount, setVisibleItemCount] = useState(5);
  const [totalNewsCount,SetTotalNewsCount]=useState(0)

  const [isYear, setIsYear] = useState(currentYear);


  const handleYear = (yearVal) => {
    setVisibleItemCount(5)
    setIsYear(yearVal);
  };


  useEffect(() => {
    const YearWiseDataFetch = async () => {
      try {
        const YearWiseDataFetchResponse =
          await NewsService.getYearwiseNewsDetails(isYear);
        if (
          YearWiseDataFetchResponse.error === false &&
          YearWiseDataFetchResponse.body.length > 0
        ) {
          setOtherYear(YearWiseDataFetchResponse.body.slice(0,visibleItemCount));
          SetTotalNewsCount(YearWiseDataFetchResponse.body.length)
          setYearWiseNewsData(true);
          setLoading(false);
        } else {
          setYearWiseNewsData(false);
          setLoading(false);
        }
      } catch (e) {
        console.error("YearWiseDataFetch", e);
      }
    };
    YearWiseDataFetch();
  }, [isYear,visibleItemCount]);


  const handleShowMore = () => {
    // console.log(visibleItemCount);
    setVisibleItemCount((prevCount) => prevCount + 5);
  };


  return (
    <>
      {loading && <Loader />}
      <Container fluid className="px-0">
        <Breadcrumb
          pageTitle="Recent News"
          breadCrumbCurrentPage="Recent News"
        />
      </Container>
      <Container className="my-4">
        <Row>
          {yearWiseNewsData && (
            <Col xs={12} lg={8}>
              {otherYear?.map((item, index) => {
                return (
                  <div className="textarea my-4">
                    <div key={index} className="my-2">
                      <div className="listingimgNews">
                        {item?.recentEventImages.map((eachImage, index) => {
                          return (
                            <img
                              key={index}
                              src={eachImage.image_url}
                              alt="listing"
                            />
                          );
                        })}
                      </div>

                      <h3>{item?.desc_heading}</h3>
                      <div
                        className="news-crop"
                        dangerouslySetInnerHTML={{ __html: item?.short_desc }}
                      ></div>

                      <div className="mt-4">
                        <Link
                          href={`news/${item.desc_heading.replace(
                            /\s+/g,
                            "-"
                          )}`}
                        >
                          <RedButton buttonText="Read More" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Col>
          )}

          {!yearWiseNewsData && (
            <>
              <Col xs={12} lg={8}>
                {newsData?.slice(0, visibleItemCount).map((item, index) => {
                  return (
                    <div className="textarea my-4">
                      <div key={index} className="my-2">
                        <div className="listingimgNews">
                          {item?.recentEventImages.map((eachImage, index) => {
                            return (
                              <img
                                key={index}
                                src={eachImage.image_url}
                                alt="listing"
                              />
                            );
                          })}
                        </div>

                        <h3>{item?.desc_heading}</h3>
                        <div className="news-crop">
                          dangerouslySetInnerHTML={{ __html: item?.short_desc }}
                        </div>

                        <div className="mt-4">
                          <Link
                            href={`news/${item.desc_heading.replace(
                              /\s+/g,
                              "-"
                            )}`}
                          >
                            <RedButton buttonText="Read More" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Col>
                       
            </>
          )}

          <Col xs={12} lg={4}>
            {/* <CategoryListNews/> */}
            <div className="categorylistwithhead">
              <h3><Archive/> Archive</h3>
              <div className="categorylist">
                <ul>
                  {categoryData?.map((item, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          handleYear(item);
                        }}
                      >
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Col>
        </Row>         
      </Container>


      {visibleItemCount<totalNewsCount &&
      <Container>
      <Row>
        <Col xs={12} lg ={3}>
           <RedButton buttonText="Show More" onClick={handleShowMore} />
        </Col>
        
      </Row>
      </Container>
      }
         
    </>
  );
};

export async function getServerSideProps(context){  
  const currentYear = new Date().getFullYear();
  const newsDataResponse = await NewsService.newsPage();    
  let years = newsDataResponse.allyears;
  years.reverse();             


  return{
      props:{
          categoryData:years,
          currentYear:currentYear
      }
  }
}


export default NewsListing;


