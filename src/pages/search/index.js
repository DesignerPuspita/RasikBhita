import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import SearchService from "@/services/Search";
import Breadcrumb from "@/component/Breadcrumb";
import { useSearchParams } from "next/navigation";
import YouTubeEmbed from "@/component/YoutubeEmbed";
import { MapPin, PhoneCall, Mail, Book, Clock } from "react-feather";
import Link from 'next/link';
import { useRouter } from "next/router";

const SearchResults = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [galleryVideoData, setGalleryVideoData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [contactUsData, setContactUsData] = useState([]);
  const [cmsActivityData, setCmsActivityData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [found, setFound] = useState(false);
  const [initialPageURL, setInitialPageURL] = useState("");

  useEffect(() => {
    // Store initial page URL in sessionStorage when component mounts
    const referrer = document.referrer || window.location.origin;
    if (!sessionStorage.getItem("initialPageURL")) {
      sessionStorage.setItem("initialPageURL", referrer);
    }
    setInitialPageURL(sessionStorage.getItem("initialPageURL"));

    // Fetch search results based on query params
    const fetchData = async () => {
      try {
        const searchResult = await SearchService.searchThis(params.get("q"));
        console.log("SEARCH RESULT", searchResult);
        if (!searchResult.error) {
          setGalleryVideoData(searchResult.body.GalleryVideoData);
          setCourseData(searchResult.body.CoursesData);
          setContactUsData(searchResult.body.contactUsData);
          setCmsActivityData(searchResult.body.cmsActivity);
          setNewsData(searchResult.body.news);
          setFound(isEmpty(searchResult.body));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [params]);

  useEffect(() => {
    // Handle browser back button
    const handlePopState = () => {
      const initialURL = sessionStorage.getItem("initialPageURL");
      if (initialURL) {
        sessionStorage.removeItem("initialPageURL");
        router.replace(initialURL); // Use router.replace to navigate within Next.js
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  const getYoutubeVideoId = (url) => {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  return (
    <>
      <Container fluid className="px-0">
        <Breadcrumb
          pageTitle={`Search result - ${params.get("q")}`}
          breadCrumbCurrentPage="Search"
        />
      </Container>

      <Container className="my-4 srchBlock">
        <Row>
          <Col xs={12}>
            {found && (
              <p>No data found!</p>
            )}
          </Col>
        </Row>
        <Row>
          {galleryVideoData?.map((item, index) => (
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
          ))}
          {courseData?.map((item, index) => (
            <Col xs={12} lg={6} key={index}>
              <div className="search-result">
                <div>
                  <h3>{item.course_name}</h3>
                </div>
                <div>
                  <div className="srchImgHeight">
                    <img src={item.course_icon} alt="image" />
                  </div>
                </div>
                <div className="mt-3">
                  <Link className="hvr-sweep-to-right"
                    href={`courselist/${item.course_name.replace(/\s+/g, "-")}`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </Col>
          ))}
          {contactUsData?.map((item, index) => (
            <Col xs={12} lg={6} key={index}>
              <div className="search-result">
                <Col xs={12}>
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
          ))}
          {cmsActivityData?.map((item, index) => (
            <Col xs={12} lg={6} key={index}>
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
          ))}
          {newsData?.map((item, index) => (
            <Col xs={12} lg={6} key={index}>
              <div className="search-result">
                <div>
                  <h3>{item.desc_heading}</h3>
                </div>
                <div>
                  <div className="srchImgHeight">
                    <img src={item.recentEventImages[0].image_url} alt="image" />
                  </div>
                </div>
                <div className="mt-3">
                  <Link className="hvr-sweep-to-right"
                    href={`/news/${item.desc_heading.replace(/\s+/g, "-")}`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchResults;
