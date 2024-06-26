import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Breadcrumb from "@/component/Breadcrumb";
import CmsService from "@/services/Cms";
import Carousel from "react-bootstrap/Carousel";

const AboutDetails = ({storyIdWithoutHyphen,cmsEntity,cmsImage,cmsStoryTableEntity}) => {
 

  return (
    <> 
      <Container fluid className="px-0">
        <Breadcrumb
          pageTitle={storyIdWithoutHyphen}
          breadCrumbCurrentPage={storyIdWithoutHyphen}
        />
      </Container>

      <Container fluid className="px-0">
        {cmsEntity?.map((entity, entityIndex) => {
          const relatedImages = cmsImage.filter(
            (image) => image.story_cms_id == entity.story_cms_id
          );
          let arr = [];
          if (relatedImages.length > 0) {
            relatedImages.forEach((image) => {
              arr.push(image.cms_body_img_path);
            });
          }
          return (
            <section className="cmsBg py-5"  key={entityIndex}>
              <Container>
                <Row>
                  <Col xs={12}>
                    <div className="cmsWrap">
                      {arr.length > 1 && (
                        <div className="officeimage-left">
                          <Carousel>
                            {relatedImages.map((image, imageIndex) => (
                              <Carousel.Item  key={imageIndex}>
                                <div className="text-container-under-image">
                                  <img
                                    src={image.cms_body_img_path}
                                    className="img-fluid"
                                    alt={`CMS Image ${imageIndex}`}
                                  />
                                  <div className="bottom-left">
                                    {image.image_text}
                                  </div>
                                </div>
                              </Carousel.Item>
                            ))}
                          </Carousel>
                        </div>
                      )}
                      {arr.length <= 1 &&
                        relatedImages.map((image, imageIndex) => (
                          <div className="officeimage-left" key={imageIndex}>
                            <img
                              src={image.cms_body_img_path}
                              className="img-fluid"
                              alt={`CMS Image ${imageIndex}`}
                            />
                          </div>
                        ))}
                      <div className="cms-top">
                        <h6 className="boldTitle">
                          <img src="/images/wave.png" alt="wave" /> {entity.bigHeading}
                        </h6>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: entity.courseContent,
                          }}
                        ></div>
                      </div>
                      <div className="clear"></div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          );
        })}
      </Container>
    </>
  );
};

export default AboutDetails;


export async function getServerSideProps(context){  

  const storyIdWithoutHyphen = context.query.aboutDetails.replace(/-/g, " ");
  const CMSDataResponse = await CmsService.cmsSinglePage(context.query.aboutDetails);
  const cmsEntity = CMSDataResponse.error==false?CMSDataResponse.body.cmsEntity:[]
  const cmsImage = CMSDataResponse.error==false?CMSDataResponse.body.cmsImagestableEntity:[]
  const cmsStoryTableEntity = CMSDataResponse.error==false?CMSDataResponse.body.storyTableEntity:{}



  return {
    props:{
      storyIdWithoutHyphen:storyIdWithoutHyphen,
      cmsEntity:cmsEntity,
      cmsImage:cmsImage,
      cmsStoryTableEntity:cmsStoryTableEntity

    }
  }
}