import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "@/component/Breadcrumb";
import ElearningService from "@/services/Elearning";
import YouTubeEmbed from "@/component/YoutubeEmbed";
import Loader from "@/component/Loader";

const Elearning = ({ elearningData, category }) => {
  const currentYear = new Date().getFullYear();
  const [buttonVal, setButtonVal] = useState("all");
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
          pageTitle="e-Learning"
          breadCrumbCurrentPage="e-Learning"
          
        />
      </Container>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col className="gallery" xs={12}>
            <div className="threebuttons">
              {category.length == 0 && <p>No data found</p>}
              {category.length > 0 && (
                <div
                  className={buttonVal == "all" ? "button1" : "button2"}
                  onClick={() => {
                    handleButton("all");
                  }}
                >
                  All
                </div>
              )}

              {category.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={buttonVal == item ? "button1" : "button2"}
                    onClick={() => {
                      handleButton(item);
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
        <Row className="rowgallery1">
          {elearningData.map((item, index) => {
            if (buttonVal == "all") {
              return (
                <Col xs={12} lg={4} key={index}>
                  <div className="galleryWrapVid mb-3">
                    <div className="embed-responsive embed-responsive-16by9">
                      <YouTubeEmbed
                        embedId={getYoutubeVideoId(item.video_url)}
                      />
                    </div>
                    <h6 className="gallery-heading-txt">{item.video_text}</h6>
                  </div>
                </Col>
              );
            } else if (item.category == buttonVal) {
              return (
                <Col xs={12} lg={4} key={index}>
                  <div className="galleryWrapVid mb-3">
                    <div className="embed-responsive embed-responsive-16by9">
                      <YouTubeEmbed
                        embedId={getYoutubeVideoId(item.video_url)}
                      />
                    </div>
                    <h6 className="gallery-heading-txt">{item.video_text}</h6>
                  </div>
                </Col>
              );
            }
          })}
        </Row>
      </Container>
    </>
  );
};

export default Elearning;

export async function getServerSideProps() {
  const elearningResponse = await ElearningService.elearning();
  const elearningData =
    elearningResponse.error == false && elearningResponse.body.length > 0
      ? elearningResponse.body
      : [];

  let category = [];
  elearningData.forEach((element) => {
    category.push(element.category);
  });
  category = [...new Set(category)];

  return {
    props: {
      elearningData: elearningData,
      category: category,
    },
  };
}
