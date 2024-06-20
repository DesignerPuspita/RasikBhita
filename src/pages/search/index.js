import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import SearchService from "@/services/Search";
import Loader from "@/component/Loader";
import Breadcrumb from "@/component/Breadcrumb";
import { useSearchParams } from "next/navigation";
import YouTubeEmbed from "@/component/YoutubeEmbed";
import { Button as RedButton } from "react-bootstrap";
import { MapPin } from "react-feather";
import { PhoneCall } from "react-feather";
import { Mail } from "react-feather";
import { Book } from "react-feather";
import { Clock } from "react-feather";
import  Link  from 'next/link';

const SearchResults = () => {
  const params = useSearchParams();
  const [galleryVideoData, setGalleryVideoData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [contactUsData, setContactUsData] = useState([]);
  const [cmsActivityData, setCmsActivityData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [found, setFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchResult = await SearchService.searchThis(params.get("q"));
        console.log("SEARCH RESULTTTTTTT", searchResult);
        if (searchResult.error == false) {
          setGalleryVideoData(searchResult.body.GalleryVideoData);
          setCourseData(searchResult.body.CoursesData);
          setContactUsData(searchResult.body.contactUsData);
          setCmsActivityData(searchResult.body.cmsActivity);
          setNewsData(searchResult.body.news);
          setFound(isEmpty(searchResult.body))

        }
      } catch (error) { }
    };
    fetchData();
  }, [params]);

  function getYoutubeVideoId(url) {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    if (match && match[1]) {
      return match[1];
    } else {
      return null;
    }
  }

  function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
    return true;
  }

  return (
    <>
      <Container fluid className="px-0">
        <Breadcrumb
          pageTitle={`search result - ${params.get("q")}`}
          breadCrumbCurrentPage="Search"
        />
      </Container>

      <Container className="my-4 srchBlock">
        <Row>
          <Col xs={12} >
            {found && (
              <p>No data found!</p>
            )}

          </Col>
        </Row>



        <Row>



            {galleryVideoData?.map((item, index) => {
              return (
                <Col xs={12} lg={6} key={index}>
                <div className="search-result">
                  
                    <div>
                      <h3>{item.videotext}</h3>
                    </div>
                  
                  
                    <div>
                      <YouTubeEmbed
                        embedId={getYoutubeVideoId(item.gallery_video_url)}
                      />
                    </div>
                  
                  
                    <div className="mt-3">
                      <Link href="/videogallery" className="hvr-sweep-to-right">View Details</Link>
                      
                    </div>
                                   
                </div>
                </Col>
              );
            })}

          
          
            {courseData?.map((item, index) => {
              return (
                <Col xs={12} lg={6}  key={index}>
                <div className="search-result">
                  
                    <div>
                      <h3>{item.course_name}</h3>
                    </div>
                 
                  
                    <div>
                      <div className="srchImgHeight">
                        <img src={item.course_icon} alt="image"/>
                      </div>
                    </div>
                  
                  {/* <Row>
                    <Col xs={12}>
                      <div
                        dangerouslySetInnerHTML={{ __html: item?.course_desc }}
                      ></div>
                    </Col>
                  </Row> */}
                  
                    <div className="mt-3">
                      <Link className="hvr-sweep-to-right"
                        href={`courselist/${item.course_name.replace(/\s+/g, "-")}`}
                      >
                        View Details
                      </Link>
                    </div>
                  
                </div>
                </Col>
              );
            })}
          



          
            {contactUsData?.map((item, index) => {
              return (
                <Col xs={12} lg={6}  key={index}>
                <div className="search-result">
                  <Col xs={12} key={index}>
                    <div className="contactusdetails-left">
                      <h3>{item?.big_Heading}</h3>
                      <div className="srchImgHeightText">
                        <div className="locationinfo">
                          <div className="locationinfoimg">
                            <MapPin />
                          </div>
                          <div className="locationinfotext">
                            <h6>Office Location</h6>
                            <p>{item?.office_Location}</p>
                          </div>
                        </div>
                        <div className="callinfo">
                          <div className="callinfoimg">
                            <PhoneCall />
                          </div>
                          <div className="callinfotext">
                            <h6>Contact Number</h6>
                            <p>{item?.contact_No}</p>
                          </div>
                        </div>
                        <div className="emailinfo">
                          <div className="emailinfoimg">
                            <Mail />
                          </div>
                          <div className="emailinfotext">
                            <h6>Official Email Address</h6>
                            <p>{item?.office_email}</p>
                          </div>
                        </div>
                        <div className="queriesinfo">
                          <div className="queriesinfoimg">
                            <Book />
                          </div>
                          <div className="queriesinfotext">
                            <h6>For Admission & Course Related Queries</h6>
                            <p>{item?.admission_Coursequeries}</p>
                          </div>
                        </div>
                        <div className="timinginfo">
                          <div className="timinginfoimg">
                            <Clock />
                          </div>
                          <div className="timinginfotext">
                            <h6>Visiting hours</h6>
                            <p>{item?.visiting_hour}</p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </Col>
                  <Row>
                    <Col xs={12} lg={3} className="mt-3">
                      <Link className="hvr-sweep-to-right"
                        href={`/contact`}
                      >
                        View Details
                      </Link>
                    </Col>
                  </Row>
                </div>
                </Col>
              );
            })}
          



          
            {cmsActivityData?.map((item, index) => {
              return (
                <Col xs={12} lg={6}  key={index}>
                <div className="search-result">
                    <div>
                      <h3>{item.bigHeading}</h3>
                    </div>                  
                  <div className="srchImgHeightText">
                    <div>
                      <div
                        dangerouslySetInnerHTML={{ __html: item?.courseContent }}
                      ></div>
                    </div>                  
                  </div>
                    <div className="mt-3">
                      <Link className="hvr-sweep-to-right"
                         href={item && item.bigHeading ? `about/${item.bigHeading.replace(/\s+/g, "-")}` : '#'}
                      >
                        View Details
                      </Link>
                    </div>
                </div>
                </Col>
              );
            })}
          




          
            {newsData?.map((item, index) => {
              return (
              <Col xs={12} lg={6}  key={index}>
                <div className="search-result">                  
                    <div>
                      <h3>{item.desc_heading}</h3>
                    </div>
                    <div>
                         <div className="srchImgHeight">
                             <img src={item.recentEventImages[0].image_url} alt="image"/>
                         </div>
                    </div>                  
                  {/* <div className="srchImgHeightText">
                  <Row>
                    
                    <Col xs={12}>
                      <div
                        dangerouslySetInnerHTML={{ __html: item?.short_desc }}
                      ></div>
                    </Col>
                  </Row>
                  </div> */}                  
                    <div className="mt-3">
                      <Link className="hvr-sweep-to-right"
                        href={`/news/${item.desc_heading.replace(/\s+/g, "-")}`}
                      >
                        View Details
                      </Link>
                    </div>                  
                </div>
                </Col>
              );
            })}
          




        </Row>
      </Container>
    </>
  );
};

export default SearchResults;
 