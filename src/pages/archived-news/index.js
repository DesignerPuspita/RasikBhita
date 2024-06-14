import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import NewsService from "@/services/News";
import Loader from "@/component/Loader";
import RedButton from "@/component/RedButton";
import Link from "next/link";
import Breadcrumb from "@/component/Breadcrumb";
import { Folder } from "react-feather";

const NewsArchive = ({ categoryData }) => {
  const currentYear = new Date().getFullYear();
  const [nowShowNews, setNowShowNews] = useState(false);
  const [newsData, setnewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [yearWiseNewsData, setYearWiseNewsData] = useState(false);
  const [otherYear, setOtherYear] = useState([]);
  const [visibleItemCount, setVisibleItemCount] = useState(6);
  const [totalNewsCount, SetTotalNewsCount] = useState(0);

  const [isYear, setIsYear] = useState(currentYear);

  const handleYear = (yearVal) => {
    setLoading(true);
    window.scrollTo({ top: 0 });
    setTimeout(() => {
      setVisibleItemCount(1);
      setIsYear(yearVal);
      setNowShowNews(true);
      setLoading(false);
    }, 800);
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
          //console.log('YearWiseDataFetchResponse', YearWiseDataFetchResponse);
          setOtherYear(
            YearWiseDataFetchResponse.body.slice(0, visibleItemCount)
          );
          SetTotalNewsCount(YearWiseDataFetchResponse.body.length);
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
  }, [isYear, visibleItemCount]);

  const handleShowMore = () => {
    setVisibleItemCount((prevCount) => prevCount + 5);
  };

  return (
    <>
      {loading && <Loader />}
      <Container fluid className="px-0">
        <Breadcrumb
          pageTitle="Archived News"
          breadCrumbCurrentPage="Archived News"
        />
      </Container>

      {nowShowNews == false && (
        <Container className="py-5">
          <Row>
            {categoryData?.map((item, index) => {
              return (
                <Col
                  key={index}
                  sm={6}
                  lg={4}
                  xl={3}
                  className="bdr1 m--1 border-start-0 border-top-0"
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className="iconbox-style1 at-home12-v2"
                    onClick={() => {
                      handleYear(item);
                    }}
                  >
                    <div className="icon">
                      <Folder />
                    </div>
                    <div className="details mt20">
                      <h4 className="title">Archived News</h4>
                      <p className="mb-0 text-center">{item}</p>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      )}

      {nowShowNews == true && (
        <Container>
          <Row className="archievedMenuBtn">
            <Col xs={12} className="text-right">
              <div className="mt-3">
                <RedButton
                  buttonText="Back"
                  onClick={() => {
                    setLoading(true);
                    window.scrollTo({ top: 0 });
                    setTimeout(() => {
                      setNowShowNews(false);
                      setLoading(false);
                    }, 800);
                  }}
                />


              </div>
            </Col>
          </Row>
        </Container>


      )}

      {nowShowNews && (
        <>
          <Container className="my-2">
            <Row>
              {otherYear?.map((item, index) => {
                return (
                  <Col xs={12} lg={6}>
                    <div className="textarea my-4" key={index}>
                      <div className="my-2">
                        <div className="listingimgNews">
                          {item?.recentEventImages.map((eachImage, imgindex) => {
                            return <img key={imgindex} src={eachImage.image_url} />;
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
                  </Col>
                );
              })}
            </Row>
          </Container>
        </>
      )}

      {visibleItemCount < totalNewsCount && nowShowNews && (
        <Container>
          <Row className="archievedMenuBtn">
            <Col xs={12} className="text-center">
              <RedButton buttonText="Show More" onClick={handleShowMore} />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default NewsArchive;

export async function getServerSideProps() {
  const newsDataResponse = await NewsService.newsPage();
  const categoryData = newsDataResponse ? newsDataResponse.allyears : [];

  return {
    props: {
      categoryData: categoryData,
    },
  };
}
