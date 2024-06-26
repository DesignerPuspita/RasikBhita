import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "@/component/Breadcrumb";
import React, { useEffect, useState } from "react";
import ProjectService from "@/services/Project";
import Loader from "@/component/Loader";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { ZoomIn } from "react-feather";

const Project = ({ projects }) => {
  const captionsRef = React.useRef(null);
  const [imageList, setImageList] = useState([]);
  const [catList, setCatList] = useState([]);
  const [selectedCat, setselectedCat] = useState("all");
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const getPhotos = async () => {
      let category = [];
      projects.forEach((element) => {
        category.push(element.category);
      });
      category = [...new Set(category)];
      setCatList(category);

      let images = [];
      let fullImageObjects = [];
      projects.forEach((element) => {
        if (selectedCat == "all") {
          images.push({ src: element.image, title: element.name });
          fullImageObjects.push(element);
          setImageList(fullImageObjects);
        } else if (selectedCat == element.category) {
          images.push({ src: element.image, title: element.name });
          fullImageObjects.push(element);
          setImageList(fullImageObjects);
        }
      });
      setSlides(images);
    };
    getPhotos();
  }, [selectedCat]);

  function categoryPress(catName) {
    setLoading(true);
    setselectedCat(catName);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }

  function openLightbox(selectedIndex) {
    setClickedIndex(selectedIndex);
    setOpen(true);
  }

  return (
    <>
      {loading && <Loader />}
      <Container fluid className="px-0">
        <Breadcrumb
          pageTitle="Student Projects"
          breadCrumbCurrentPage="Student Projects"
        />
      </Container>
      <Container className="my-5">
        <Row>
          <Col className="gallery">
            <div className="threebuttons">
              <div
                className={selectedCat == "all" ? "button1" : "button2"}
                onClick={categoryPress.bind("catName", "all")}
              >
                All Category
              </div>
              {catList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={selectedCat == item ? "button1" : "button2"}
                    onClick={categoryPress.bind("catName", item)}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>

        <Row className="rowgallery1">
          {imageList.map((item, index) => {
            if (selectedCat == "all") {
              return (
                <Col xs={12} lg={4} key={index}>
                  {item.type == 'VIDEO' ? (
                    <div>

                      <iframe
                        width="100%"
                        height="200"
                        src={`https://www.youtube.com/embed/${item.project_video_url.split('v=')[1]}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={item.videotext}
                      ></iframe>
                      <h6 className="gallery-heading-txt">{item.videotext}</h6>
                    </div>
                  ) : (
                    <div
                      className="galleryWrapImg"
                      onClick={() => openLightbox(index)}
                    >
                      <div className="content">
                        <div className="content-overlay"></div>
                        <div className="galleryWrapImgBox">
                          <img src={item.image} alt="Project" />
                        </div>
                        <div className="content-details fadeIn-top">
                          <div className="zoomWrap">
                            <ZoomIn />
                          </div>
                        </div>
                      </div>
                      <h6 className="gallery-heading-txt">{item.name}</h6>
                    </div>
                  )}
                </Col>
              );
            } else if (item.category == selectedCat) {
              return (
                <Col xs={12} lg={4} key={index}>
                  {item.type == 'VIDEO' ? (
                    <div>

                      <iframe
                        width="100%"
                        height="200"
                        src={`https://www.youtube.com/embed/${item.project_video_url.split('v=')[1]}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={item.videotext}
                      ></iframe>
                      <h6 className="gallery-heading-txt">{item.videotext}</h6>
                    </div>
                  ) : (
                    <div
                      className="galleryWrapImg"
                      onClick={() => openLightbox(index)}
                    >
                      <div className="content">
                        <div className="content-overlay"></div>
                        <div className="galleryWrapImgBox">
                          <img src={item.image} alt="Project" />
                        </div>
                        <div className="content-details fadeIn-top">
                          <div className="zoomWrap">
                            <ZoomIn />
                          </div>
                        </div>
                      </div>
                      <h6 className="gallery-heading-txt">{item.name}</h6>
                    </div>
                  )}
                </Col>
              );
            }
          })}
        </Row>
      </Container>



      <Lightbox
        index={clickedIndex}
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        plugins={[Thumbnails, Zoom]}
        on={{
          click: () => {
            (captionsRef.current?.visible
              ? captionsRef.current?.hide
              : captionsRef.current?.show)?.();
          },
        }}
        animation={{ zoom: 500 }}
        zoom={{
          maxZoomPixelRatio: 15,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
      />
    </>
  );
};

export default Project;

export async function getServerSideProps() {
  const projectsRes = await ProjectService.projects();
  const projects = projectsRes.error == false ? projectsRes.body : [];

  return {
    props: {
      projects: projects,

    },
  };
}
