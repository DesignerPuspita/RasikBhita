import { Col, Container, Row } from 'react-bootstrap';

import { Button } from 'react-bootstrap';

function TopCarousel(){
  return(
    <Container fluid>
        <Row>
          <Col className='topbanner'>
            <div className='bannerimgtext'> 
              <h3>Lorem Ipsum is dummy</h3>
              <p>If women get the right sort of education they may well turn out
                  to be the ideal women in the world. -Swami Vivekananda
                  <br></br>
                  <Button className='topbannerbutton'><img src='play-button.png' alt="pbutton"></img>Intro Video</Button>
              </p>
              
            </div>

            <div>
              <img src='banner.png' className='img-fluid' alt="banner"></img>
            </div>          
          </Col>
        </Row>
        
    </Container>
  );
}

export default TopCarousel;