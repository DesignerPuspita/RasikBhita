import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "react-feather";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const CarousalSlider = ({ data, page }) => {
    const NextArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="slick-arrow next-arrow" onClick={onClick}>
                <ChevronRight />
            </div>
        );
    };

    const PrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="slick-arrow prev-arrow" onClick={onClick}>
                <ChevronLeft />
            </div>
        );
    };

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Slider {...settings}>
            {page === "course" && data && data.length > 0 && data.map((item, index) => (
                <Col className="JobCards courseName" xs={12} lg={3} key={index}>
                    <Card>
                        <Card.Body>
                            <div className="courseRedImage">
                                <img className="img-fluid" src={item.home_logo_url} alt="course" />
                            </div>
                            <div>
                                <h5 className="home-course-head">{item.course_name}</h5>
                                <div
                                    className="course-list-short-desc"
                                    dangerouslySetInnerHTML={{ __html: item.course_desc }}
                                ></div>
                            </div>
                        </Card.Body>
                    </Card>
                    <Button href={`/courselist/${item.course_name.replace(/\s+/g, "-")}/${item.course_id}`}className="button-align hangingBtn" variant="secondary">
                        Read More
                    </Button>
                </Col>
            ))}
            {page === "activities" && data && data.length > 0 && data.map((item, index) => (
                <Col key={index} className="JobCards" xs={12} lg={3}>
                    <Card>
                        <Card.Body className="p-4">
                            <div className="homeActivictyImage">
                                <img src={item.storyTableEntity.home_logo_url} alt="quote" />
                            </div>
                            <h5>{item.cmsEntity[0].bigHeading}</h5>
                            <div
                                className="courselist-short-desc pt-3"
                                dangerouslySetInnerHTML={{ __html: item.cmsEntity[0].courseContent }}
                            ></div>
                            <Button href={`about/${item.storyTableEntity.page_name.replace(/\s+/g, "-")}`} className="button-align" variant="activitesHmBtn">
                                Read More ...
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            {page === "testimonials" && data && data.length > 0 && data.map((item, index) => (
                <Col key={index} className="JobCards" xs={12} lg={3}>
                    <Card>
                        <Card.Body>
                            <img src="/images/quote.png" alt="quote-img" />
                            <div className="testimonial-short-desc" dangerouslySetInnerHTML={{ __html: item.textarea }}></div>
                            <div className="testimonial-card">
                                <div className="QuoteImage">
                                    <img src={item.image_url} alt="quote" className="img-fluid" />
                                </div>
                                <div className="QuoteImage-body">
                                    <h5>{item.name}</h5>
                                    <strong>{item.role}</strong>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    
                </Col>
            ))}
        </Slider>
    );
};

export default CarousalSlider;
