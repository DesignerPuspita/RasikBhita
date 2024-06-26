import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "@/component/Breadcrumb";
import Loader from "@/component/Loader";

import React, { useEffect, useState } from "react";
import GalleryService from "@/services/Gallery";
import { ZoomIn } from "react-feather";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import Link from 'next/link';

const PressReview = ({ imageData }) => {
  const captionsRef = React.useRef(null);
  const zoomRef = React.useRef(null);
  const [loading, setLoading] = useState(true);
  const [imageList, setImageList] = useState([]);
  const [catList, setCatList] = useState([]);
  const [selectedCat, setSelectedCat] = useState("all");
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(0);
  const [catRange, setCatRange] = useState([0, 4]);

  useEffect(() => {
    const formattedSlides = imageData.map((item) => ({
      src: item.img_path,
      title: item.img_name,
    }));
    setSlides(formattedSlides);
  }, [imageData]);

  function openLightbox(selectedIndex) {
    setClickedIndex(selectedIndex);
    setOpen(true);
  }

  return (
    <>
      <Container fluid className="px-0">
        <Breadcrumb pageTitle="Press Review" breadCrumbCurrentPage="Press Review" />
      </Container>
      <Container className="my-5">
        <Row>
          {imageData.map((item, index) => (
            <Col xs={12} md={6} lg={4} key={index}>
              <div className="galleryWrapImg" onClick={() => openLightbox(index)}>
                <div className="content">
                  <div className="content-overlay"></div>
                  <div className="galleryWrapImgBox">
                    <img src={item.img_path} alt={item.img_name} />
                  </div>
                  <div className="content-details fadeIn-top">
                    <div className="zoomWrap">
                      <ZoomIn />
                    </div>
                  </div>
                </div>
                <h6 className="gallery-heading-txt">
                  {item.textlink == '' ? (
                    item.img_name
                  ) : (
                    <Link href={item.textlink} target="_blank" className="black-color-text">
                      Read Full Article : {item.img_name}
                    </Link>
                  )}
                </h6>
              </div>
            </Col>
          ))}
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
            (captionsRef.current?.visible ? captionsRef.current?.hide : captionsRef.current?.show)?.();
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

export async function getServerSideProps() {
  const photos = await GalleryService.pressReview();
  console.log('photos', photos);
  const imageData = photos.error === false ? photos.body : [];

  return {
    props: {
      imageData: imageData,
    },
  };
}

export default PressReview;
