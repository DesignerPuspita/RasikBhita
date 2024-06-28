import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "@/component/Breadcrumb";
import Loader from "@/component/Loader";

import React, { useEffect, useState } from "react";
import GalleryService from "@/services/Gallery";
import { ZoomIn, ChevronLeft, ChevronRight } from "react-feather";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";

const PhotoGallery = ({ imageData }) => {
  const captionsRef = React.useRef(null);
  const zoomRef = React.useRef(null);
  const [loading, setLoading] = useState(true);
  const [imageList, setImageList] = useState([]);
  const [catList, setCatList] = useState([]);
  const [selectedCat, setselectedCat] = useState("all");
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(0);
  const [catRange, setCatRange] = useState([0, 4]);
  const [categoriesPerView, setCategoriesPerView] = useState(4);
  useEffect(() => {
    setCatRange([0, categoriesPerView]);
  }, [categoriesPerView]);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        let category = [];
        imageData.forEach((element) => {
          category.push(element.category_name);
        });
        category = [...new Set(category)];
        console.log('category', category);
        let images = [];
        let fullImageObjects = [];
        imageData.forEach((element) => {
          if (selectedCat == "all") {
            images.push({
              src: element.gallery_img_path,
              title: element.file_name,
            });
            fullImageObjects.push(element);
            setImageList(fullImageObjects);
          } else if (selectedCat == element.category_name) {
            images.push({
              src: element.gallery_img_path,
              title: element.file_name,
            });
            fullImageObjects.push(element);
            setImageList(fullImageObjects);
          }
        });

        setSlides(images);
        setCatList(category);
        setLoading(false);
      } catch (error) {}
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
  function handlePrev() {
    setCatRange((prev) => [
      Math.max(prev[0] - categoriesPerView, 0),
      Math.max(prev[1] - categoriesPerView, categoriesPerView),
    ]);
  }

  function handleNext() {
    setCatRange((prev) => [
      Math.min(prev[0] + categoriesPerView, catList.length - categoriesPerView),
      Math.min(prev[1] + categoriesPerView, catList.length),
    ]);
  }
  return (
    <>
      {loading && <Loader />}
      <Container fluid className="px-0">
        <Breadcrumb pageTitle="Gallery" breadCrumbCurrentPage="Gallery" />
      </Container>
      <Container className="my-5">
        <Row>
          <Col className="gallery">
          <div className="threebuttons mb-3">
              {catRange[0] > 0 && (
                <ChevronLeft className="arrow" onClick={handlePrev} />
              )}
              {catList.slice(catRange[0], catRange[1]).map((item, index) => (
                <div
                  key={index}
                  className={selectedCat === item ? "button1" : "button2"}
                  onClick={() => categoryPress(item)}
                >
                  {item}
                </div>
              ))}
               {catRange[1] < catList.length && (
                <ChevronRight className="arrow" onClick={handleNext} />
              )} 
            </div>
          </Col>
        </Row>

        <Row>
          {imageList.map((item, index) => {
            if (selectedCat == "all") {
              return (
                <Col xs={12} md ={6} lg={4}>
                  <div
                    className="galleryWrapImg"
                    onClick={openLightbox.bind("selectedInbox", index)}
                  >
                    <div className="content">
                      <div className="content-overlay"></div>
                      <div className="galleryWrapImgBox">
                        <img src={item.gallery_img_path} alt="gallery" />
                      </div>
                      <div className="content-details fadeIn-top">
                        <div className="zoomWrap">
                          <ZoomIn />
                        </div>
                      </div>
                    </div>
                    <h6 className="gallery-heading-txt">{item.file_name}</h6>
                  </div>
                </Col>
              );
            } else if (item.category_name == selectedCat) {
              return (
                <Col xs={12} md ={6} lg={4}>
                  <div
                    className="galleryWrapImg"
                    onClick={openLightbox.bind("selectedInbox", index)}
                  >
                    <div className="content">
                      <div className="content-overlay"></div>
                      <div className="galleryWrapImgBox">
                        <img src={item.gallery_img_path} alt="gallery" />
                      </div>
                      <div className="content-details fadeIn-top">
                        <div className="zoomWrap">
                          <ZoomIn />
                        </div>
                      </div>
                    </div>
                    <h6 className="gallery-heading-txt">{item.file_name}</h6>
                  </div>
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
        plugins={[Thumbnails, Zoom, Captions]}
        captions={{ ref: captionsRef }}
        animation={{ zoom: 500 }}
        on={{
          click: () => {
            (captionsRef.current?.visible
              ? captionsRef.current?.hide
              : captionsRef.current?.show)?.();
          },
        }}
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

export default PhotoGallery;

export async function getServerSideProps() {
  const photos = await GalleryService.images();
  console.log('photos', photos);
  const imageData = photos.error == false ? photos.body : [];

  return {
    props: {
      imageData: imageData,
    },
  };
}
