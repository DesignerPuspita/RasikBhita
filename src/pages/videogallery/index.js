import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "@/component/Breadcrumb";
import GalleryService from "@/services/Gallery";
import YouTubeEmbed from "@/component/YoutubeEmbed";
import Loader from "@/component/Loader";

const VideoGallery = ({videoData}) => {
  const currentYear = new Date().getFullYear();
  const [buttonVal, setButtonVal] = useState("Recent");
  const [loading, setLoading] = useState(true);
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
  function getYearFromDate(dateString) {
    const parts = dateString.split(" ");
    const year = parts[parts.length - 1];
    return year;
  }

  const handleButton = (response) => {
    setButtonVal(response);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };
  return (
    <>
      <Container fluid className="px-0">
        <Breadcrumb
          pageTitle=" Video Gallery"
          breadCrumbCurrentPage=" Video Gallery"
          breadCrumbPrevPage="Gallery"
        />
      </Container>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col className="gallery" xs={12}>
            <div className="threebuttons">
              <div
                className={buttonVal == "Recent" ? "button1" : "button2"}
                onClick={() => {
                  handleButton("Recent");
                }}
              >
                Recent Videos
              </div>
              <div
                className={buttonVal == "Archieve" ? "button1" : "button2"}
                onClick={() => {
                  handleButton("Archieve");
                }}
              >
                Archive Videos
              </div>
            </div>
          </Col>
        </Row>
        <Row className="rowgallery1">
          {buttonVal == "Recent" && (
            <>
              {videoData?.map((item, index) => {
                if (getYearFromDate(item.creation_date) == currentYear) {
                  return (
                    
                      <Col xs={12} md ={6} lg={4} key={index}>
                      <div className="galleryWrapVid mb-3">
                        <div className="embed-responsive embed-responsive-16by9">
                          <YouTubeEmbed
                            embedId={getYoutubeVideoId(item.gallery_video_url)}
                          />
                        </div>
                        <h6 className="gallery-heading-txt">
                          {item.videotext}
                        </h6>
                      </div>
                    </Col>
                  );
                }
              })}
            </>
          )}
          {buttonVal == "Archieve" && (
            <>
              {videoData?.map((item, index) => {
                if (getYearFromDate(item.creation_date) != currentYear) {
                  return (
                    <Col xs={12} md ={6} lg={4} key={index}>
                      <div className="galleryWrapVid mb-3">
                        <div className="embed-responsive embed-responsive-16by9">
                          <YouTubeEmbed
                            embedId={getYoutubeVideoId(item.gallery_video_url)}
                          />
                        </div>
                        <h6 className="gallery-heading-txt">
                          {item.videotext}
                        </h6>
                      </div>
                    </Col>

                  );
                }
              })}
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default VideoGallery;

export async function getServerSideProps() {
  const VideoGalleryResponse = await GalleryService.videos();
  const videoData = VideoGalleryResponse.error == false &&
          VideoGalleryResponse.body.length > 0?
          VideoGalleryResponse.body:[]

    return {
        props:{
            videoData:videoData
        }
    }
}
