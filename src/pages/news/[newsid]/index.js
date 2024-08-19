import React from "react";
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import NewsService from "@/services/News";
import Loader from "@/component/Loader";
import Breadcrumb from "@/component/Breadcrumb";

import { Calendar } from "react-feather";
import { InlineShareButtons } from "sharethis-reactjs";

const Page = ({ newsData, newsImageData, allNewsData }) => {
  const formatDate = (date) => {
    const dateTime = new Date(date);
    let time = dateTime.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    time = time.split(" ");
    return `${time.slice(0, 1)} ${time.slice(1, 2)}`.split(",")[0];
  };

  return (
    <>
      <Container fluid className="px-0">
        <Breadcrumb
          breadCrumbCurrentPage={newsData?.desc_heading}
          pageTitle={newsData?.desc_heading}
        />
      </Container>

      <Container className="my-4">
        <Row>
          <Col xs={12} lg={8}>
            <div className="textarea">
              <div className="listingimg">
                <Carousel>
                  {newsImageData?.map((item, index) => {
                    return (
                      <Carousel.Item key={index}>
                        <div className="newsImageSingle">
                          <img src={item.image_url} alt="image" />
                        </div>
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </div>
              <div>
                <p className="mb-0">
                  <Calendar /> {formatDate(newsData?.date)}
                </p>

                <h3>{newsData?.desc_heading}</h3>

                <div
                  className="courselist-short-desc pt-0"
                  dangerouslySetInnerHTML={{ __html: newsData?.short_desc }}
                ></div>
              </div>
            </div>
            <div className="my-4">
              <InlineShareButtons
                config={{
                  alignment: "right",
                  color: "social",
                  enabled: true,
                  font_size: 16,
                  language: "en",
                  networks: [
                    "facebook",
                    "twitter",
                    "linkedin",
                    "whatsapp",
                    "linkedin",
                    "email",
                    "copy",
                  ],
                  padding: 12,
                  radius: 6,
                  size: 35,
                  top: 10,
                }}
              />
            </div>
          </Col>

          <Col xs={12} lg={4}>
            <div className="news-card-recent m-0">
              <h3 className="subbTitle">News</h3>
              {allNewsData.map((item, index) => {
                return (
                  <div className="news-card-recent-img-box"  key={index}>
                    <div className="newsRightImageWrap">
                      <div className="newsRightImage">
                        <img
                          src={item.recentEventImages[0].image_url}
                          alt="image"
                        />
                      </div>
                    </div>
                    <div className="newsLeftImage">
                      <h5>
                        {item.desc_heading.length > 100
                          ? `${item.desc_heading.slice(0, 100)}...`
                          : item.desc_heading}
                      </h5>
                      <p>
                        <Calendar /> <span className="mtt-2">{formatDate(item?.date)}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Page;

export async function getServerSideProps(context) {
  const newsId = context.query.newsid;
  const NewsDetailsDataResponse = await NewsService.getNewsDetails(newsId);

  const newsData = NewsDetailsDataResponse.error == false ? NewsDetailsDataResponse.body : [];
  const newsImageData = NewsDetailsDataResponse.error == false ? NewsDetailsDataResponse.body.recentEventImages : [];

  let allNewsData = await NewsService.newsPage();
  allNewsData = allNewsData.recentEvents.slice(0, 5);

  return {
    props: {
      newsId: newsId,
      newsData: newsData,
      newsImageData: newsImageData,
      allNewsData: allNewsData,
    },
  };
}
