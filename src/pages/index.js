import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

import HomeService from "@/services/Home";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import CarousalSlider from "@/component/CarousalSlider";
import RedButton from "@/component/RedButton";
import Link from 'next/link';


const inter = Inter({ subsets: ["latin"] });

export default function Home({
  homeCarouselData,
  homeCourseListData,
  bigImage,
  homeAboutUsData,
  homeOurActivitiesQuoteData,
  homeOurActivitiesData,
  corporateLogo,
  homeStudentProjectData,
  homeStudentsSayData,
  homeOtherCardAreaData,
  homeNewsData
}) {
  return (
    <>
      <main>
        <Container fluid className="px-0">
          <Row className="mx-0">
            <Col className="topbanner px-0">
              <div>
                <Carousel>
                  {homeCarouselData?.map((item, index) => {
                    return (
                      <Carousel.Item key={index}>
                        <div className="image-container">
                          <img
                            src={item.imageurl}
                            className="img-fluid"
                            alt="image"
                          />
                        </div>
                        <Carousel.Caption>
                          <h3>{item.bigheading}</h3>
                          <p>
                            {item.shortdesc}
                            <br></br>
                            <Button
                              className="topbannerbutton"
                              href={`http://${item.buttonurl}`}
                            >
                              <img
                                src="images/play-button.png"
                                alt="pbutton"
                              ></img>
                              {item.buttonnmae}
                            </Button>
                          </p>
                        </Carousel.Caption>
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </div>
            </Col>
          </Row>
        </Container>









        <Container className="my-5">
          <Row>
            <Col className="allcourses-top">
              <h6>
                <img src="/images/wave.png" alt="wave" /> Admissions Going On
              </h6>
              <h3 className="hmTextTitle text-center my-4">
                All courses at Rasik Bhita are
                <span className="d-block">
                  NSDC Certified
                  <img src="images/logs.gif" alt="logs" />
                  <img src="images/logs2.gif" alt="logs2" />
                </span>
              </h3>
            </Col>
          </Row>

          <Row className="CourseCards mt-3">
            <CarousalSlider page="course" data={homeCourseListData} />
          </Row>

          <Row>
            <Col>
              {/* <a href={"/courselist"}>
                <RedButton buttonText='View All Courses' />
              </a> */}
              <div class="d-flex justify-content-center my-3">
                <a href="/courselist">
                  <div class="hvr-sweep-to-right">View All Courses</div>
                </a>
              </div>
            </Col>
          </Row>
        </Container>




        <Container fluid className="px-0">
          <Row className="aboutussection mx-0">
            <Col className="px-0" xs={12} lg={5}>
              <div className="aboutuspic">
                <img src={bigImage} alt="image" />
              </div>
            </Col>

            <Col className="chardzar" xs={12} lg={7}>
              <h6>
                <img src="/images/wave.png" alt="wave" className="mx-2" />
                About Us
              </h6>
              <h3 className="hmTextTitle">
                Sri Sarada Math Rasik Bhita
                <span> Educational </span> & <span> Cultural </span> Wing of Sri
                Sarada Math
              </h3>
              <p className="contentTxtGrey">
                The house of Rasik in Dakshineswar, now houses the Educational
                and Cultural unit of Sri Sarada Math - 'Sri Sarada Math - Rasik
                Bhita' which provides vocational and technical education to
                women.
              </p>
              <div className="ContentArea py-3">
                <Row>
                  {homeAboutUsData.map((item, index) => {
                    if (item.category == "About_Us") {
                      return (
                        <Col key={index} xs={12} lg={6}>
                          <div className="rasikstory">
                            <div className="rasikstorypic">
                              <img src={item.small_img_path} alt="storyrasik" />
                            </div>
                            <div className="rasikstorytext">
                              <h6>{item.heading}</h6>
                              <p>{item.description}</p>
                              <a href={item.redirect_url}>Read More...</a>
                            </div>
                          </div>
                        </Col>
                      );
                    }
                  })}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>









        <section className="ouractivitiescont">
          <Container className="pad-100">
            <Row className="ouractivitiesrow mb-5">
              <Col className="ouractivitiescol">
                <h6>
                  <img src="/images/wave.png" alt="wave" /> Our Activities
                </h6>
                <h2>{homeOurActivitiesQuoteData?.subdiscription}<span className="redtext"> {homeOurActivitiesQuoteData?.speaker_name}</span> </h2>

              </Col>
            </Row>
            <CarousalSlider page="activities" data={homeOurActivitiesData} />
          </Container>
        </section>






        <Container fluid className="px-0">
          <Row className="corporateConnect mx-0">

            <Col className="chardzar padnw-100" xs={12} lg={7}>
              <h6>
                <img src="/images/wave.png" alt="wave" className="mx-2" />
                Some Demo Text
              </h6>
              <h3 className="hmTextTitle">Sri Sarada Math Rasik Bhita
                <span> Corporate Connect</span></h3>
              <p className="contentTxtGrey">The house of Rasik in Dakshineswar, now houses the Educational and Cultural unit of Sri Sarada Math - 'Sri Sarada Math - Rasik Bhita' which provides vocational and technical education to women.</p>
              <div className="ContentArea py-3">
                <Row>

                  {homeAboutUsData.map((item, index) => {
                    if (item.category == "Corporate_Connect") {
                      return (
                        <Col key={index} xs={12}>
                          <div className="rasikstory">
                            <div className="rasikstorypic">
                              <img src={item.small_img_path} alt="storyrasik" />
                            </div>
                            <div className="rasikstorytext">
                              <h6>{item.heading}</h6>
                              <p>{item.description}</p>
                              <a href={item.redirect_url}>Read More...</a>
                            </div>
                          </div>
                        </Col>
                      );
                    }
                  })}
                </Row>
              </div>
            </Col>
            <Col className="px-0" xs={12} lg={5}>
              <div className="aboutuspic">
                <img src="images/leftpic.gif" alt="leftpic" />
              </div>
            </Col>

          </Row>
        </Container>



        <div className="corporatestripcolSection">
          <Container fluid>
            <Row>
              <Col className="corporatestripcol">
                <div className="corporatestrip ">
                  <div className="corporatestripimg1">
                    {corporateLogo.map((item, index) => {
                      return <img key={index} src={item.imageLogo} />;
                    })}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          <section className="projectarea">
            <Container>
              <Row>
                <Col className="studproj">
                  <h6>
                    <img src="/images/wave.png" alt="wave" /> Students Project
                  </h6>
                  <h2>Those that persevere will see the light, sooner or later.</h2>
                </Col>
              </Row>

              <Row className="projcards mt-5">
                {homeStudentProjectData.map((item, index) => {
                  return (
                    <Col key={index}>
                      <div className="image1">
                        <img className="image-proj img-fluid" src={item.projectImg} alt="image" />
                      </div>
                    </Col>
                  );
                })}


              </Row>
              <Row>
                <Col xs={12}>
                  <div className="d-flex justify-content-center my-3">
                    <a href={"/studentprojects"}>
                      <RedButton buttonText='View Project' />
                    </a>
                  </div>

                </Col>
              </Row>
            </Container>
          </section>
        </div>





        <Container className="mt-80">
          <Row>
            <Col className="FirstJob mb-4">
              <h6 className="mb-2">
                <img src="/images/wave.png" alt="wave" /> Students Say
              </h6>
              <h3 className="hmTextTitle text-center">How I Got My First Job</h3>
            </Col>
          </Row>
          <div>
            <CarousalSlider data={homeStudentsSayData} page="testimonials" />
          </div>
        </Container>




        <section className="othercardarea-row">
          <Container>
            <Row>
              {homeOtherCardAreaData?.map((item, index) => {
                return (
                  <Col key={index} xs={12} lg={3}>
                    <Card>
                      <div className="othercardimgs">
                        <img
                          className="img-fluid"
                          src={item.titleUrl}
                          alt="VivekLib"
                        />
                      </div>
                      <Card.Body>
                        <Card.Title className="hmTextTitle">{item.title}</Card.Title>
                        <Card.Text className="misleniousBox">{item.description}</Card.Text>
                        <Button
                          href={
                            item.buttonName == "Appeal Now"
                              ? "images/Appeal 2020.jpg"
                              : item.buttonName == "Download PDF"
                                ? "images/Magazine.pdf"
                                : item.buttonName == "View More"
                                  ? "/placement"
                                  : "/contact"
                          }
                          variant="tertiary"
                        >
                          {item.buttonName}
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </section>





        <Container className="my-5 latestNewsWrap">
          <Row>
            <Col className="DiaryPages">
              <h6>
                <img src="/images/wave.png" alt="wave" /> Latest News
              </h6>
              <h3 className="hmTextTitle text-center">
                Pages From <span>Rasik Bhita</span> Diary
              </h3>
            </Col>
          </Row>
          <Row className="py-5">
            {homeNewsData.map((item, index) => {
              return (
                <Col xs={12} lg={4} key={index}>
                  <Card>
                    <div className="hmNewsWrap">
                      <img src={item.recentEventImages[0].image_url} alt="image" />
                    </div>

                    <Card.Body>
                      <div className="hmNewsTitle">
                        <Card.Title className="hmTextTitle">{item.desc_heading}</Card.Title>
                      </div>


                      <div>
                        <div className="cms-top homepageNewsCrop">
                          <div
                            dangerouslySetInnerHTML={{ __html: item.short_desc }}
                          ></div>
                        </div>
                      </div>
                      <Link href={{ pathname: `/news/${item.desc_heading.replace(/\s+/g, "-")}` }}>
                        <Button variant="secondary mt-4">
                          Read More
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>














      </main>
    </>
  );
}

export async function getServerSideProps() {
  const slidersection = await HomeService.homeSlider();
  const courselist = await HomeService.courseList();
  const aboutUs = await HomeService.aboutUs();
  const activitiesquote = await HomeService.activitiesQuote();
  const activities = await HomeService.activities();
  let filteredActivitis = [];
  if (activities.error == false) {
    activities.body.forEach((element) => {
      if (element.storyTableEntity.category == "ACTIVITY") {
        filteredActivitis.push(element);
      }
    });
  }
  const corpsLogs = await HomeService.corpsLogs();
  const homeStudentProject = await HomeService.studProjs();
  const testimonials = await HomeService.testimonialSection();
  const miscl = await HomeService.miscSection();
  const homeNews = await HomeService.homeNews();


  return {
    props: {
      homeCarouselData: slidersection.error == false ? slidersection.body : [],
      homeCourseListData: courselist.error == false ? courselist.body : [],
      homeAboutUsData: aboutUs.error == false ? aboutUs.body : [],
      bigImage: aboutUs.error == false ? aboutUs.body[0].big_img_path : "",
      homeOurActivitiesQuoteData: activitiesquote.error == false ? activitiesquote.body[0] : "",
      homeOurActivitiesData: filteredActivitis,
      corporateLogo: corpsLogs.error == false ? corpsLogs.body : [],
      homeStudentProjectData: homeStudentProject.error == false ? homeStudentProject.body : [],
      homeStudentsSayData: testimonials.error == false ? testimonials.body : [],
      homeOtherCardAreaData: miscl.error == false ? miscl.body : [],
      homeNewsData: homeNews.recentEvents.slice(0, 3)

    },
  };
}
