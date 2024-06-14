import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import Link from "next/link";
import CmsService from "../services/Cms";
import CourseService from "../services/Course";
import Loader from "../component/Loader";
import { Search } from "react-feather";
import { X } from "react-feather";
import { useRouter } from "next/navigation";

const Menu = () => {
  const [cmsEntity, setCmsEntity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseGroups, setCourseGroups] = useState([]);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const CMSDataResponse = await CmsService.cmsPage();
        if (!CMSDataResponse.error) {
          let arrr = [];
          CMSDataResponse.body.forEach((element) => {
            arrr.push(element.storyTableEntity);
          });
          setCmsEntity(arrr);
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (error) {
        // console.log("CMSDataResponse Data Fetch", error);
      }

      try {
        const courseGroupDataResponse = await CourseService.getCourseGroups();
        console.log('courseGroupDataResponse', courseGroupDataResponse.body);
        setCourseGroups(courseGroupDataResponse.body);
      } catch (error) {
        // console.log("Course Details Data Fetch", error);
      }
    };

    fetchData();
  }, []);

  const toggleSearchBox = () => {
    setShowSearchBox(!showSearchBox);
  };

  const handleSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onSearchButtonClick = () => {
    if (searchValue == "") {
      return;
    }
    setShowSearchBox(false);
    router.replace(`/search/?q=${searchValue}`);
    setSearchValue("");
  };

  return (
    <>
      {loading && <Loader />}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          {/* <Navbar.Brand href="#home"><img src={logo} alt="Logo" /></Navbar.Brand>*/}
          <Navbar.Brand href="/">
            <img src="/images/seal.gif" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Brand href="/">
            <p className="MainHeading">Sri Sarada Math Rasik-Bhita</p>
            <p className="HeadDescription">
              The Educational & Cultural Wing of SRI SARADA MATH
            </p>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" className="nav-link">
                Home
              </Link>
              <NavDropdown title="About Us" id="basic-nav-dropdown">
                {cmsEntity.map((item, index) => {
                  if (item.category == "CMS") {
                    return (
                      <NavDropdown.Item
                        key={index}
                        href={`/about/${item.page_name.replace(/\s+/g, "-")}`}
                      >
                        {item.page_name}
                      </NavDropdown.Item>
                    );
                  }
                })}
              </NavDropdown>
              <NavDropdown title="Courses">
                {/* <NavDropdown.Item href="/courselist">
                All Courses
              </NavDropdown.Item> */}
                {/*              
                {courseGroups.map((item, index) => {
                  {
                    if (item.coursesList.length > 0) {
                      return (
                        <>
                        <NavDropdown
                          key={index}
                          title={item.group_name.replace(/\s+/g, "-")}
                        >
                          {item.coursesList.map((innerItem, innerIndex) => {
                            return (
                              <NavDropdown.Item
                                key={innerIndex}
                                href={`/courselist/${innerItem.course_name.replace(
                                  /\s+/g,
                                  "-"
                                )}`}
                              >
                                {innerItem.course_name}
                              </NavDropdown.Item>
                            );
                          })}
                        </NavDropdown>
                        
                        </>
                      );
                    } 
                    // else {
                    //   return (
                    //     <>
                       
                    //     <NavDropdown.Item
                    //       href={
                    //         item.group_name == "Course Fees Structure"
                    //           ? "/coursefee"
                    //           : "/"
                    //       }
                    //       key={index}
                    //     >
                    //       {item.group_name}
                    //     </NavDropdown.Item>
                    //     </>
                       
                    //   );
                    // }
                  }
                })} */}
                {courseGroups.map((item, index) => {
                  if (item.coursesList.length > 0) {
                    return (
                      <NavDropdown
                        key={index}
                        title={item.group_name.replace(/\s+/g, "-")}
                        className="dropdown-with-items" // Add the class here
                      >
                        {item.coursesList.map((innerItem, innerIndex) => {
                          return (
                            <NavDropdown.Item
                              key={innerIndex}
                              href={`/courselist/${innerItem.course_name.replace(/\s+/g, "-")}`}
                            >
                              {innerItem.course_name}
                            </NavDropdown.Item>
                          );
                        })}
                      </NavDropdown>
                    );
                  }

                })}

                <NavDropdown.Item href="/elearning" className="nav-link"> e-Learning</NavDropdown.Item>
                <NavDropdown.Item href="/coursefee" className="nav-link"> Course Fees Structure</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Activities" id="basic-nav-dropdown">
                {cmsEntity.map((item, index) => {
                  if (item.category == "ACTIVITY") {
                    return (
                      <NavDropdown.Item
                        key={index}
                        href={`/about/${item.page_name.replace(/\s+/g, "-")}`}
                      >
                        {item.page_name}
                      </NavDropdown.Item>
                    );
                  }
                })}
              </NavDropdown>

              <NavDropdown title="Gallery" id="basic-nav-dropdown">
                <NavDropdown.Item href="/photogallery">Photos</NavDropdown.Item>
                <NavDropdown.Item href="/videogallery">Videos</NavDropdown.Item>
              </NavDropdown>

              {/* <Link href="/coursefee" className="nav-link">
              Course Fees
            </Link> */}
              <NavDropdown title="News" id="basic-nav-dropdown">
                <NavDropdown.Item href="/news">Recent News</NavDropdown.Item>
                <NavDropdown.Item href="/archived-news">
                  Archive News
                </NavDropdown.Item>
              </NavDropdown>
              <Link href="/contact" className="nav-link">
                Contact Us
              </Link>
              {/* <Link href="/coursefee" className='nav-link'>Fees</Link> */}
              <div className="position-relative">
                <div className="searchicon" onClick={toggleSearchBox}>
                  {showSearchBox ? <X /> : <Search />}
                </div>
                {showSearchBox && (
                  <div className="search-box">
                    <div className="search-box-block">
                      <input
                        type="text"
                        placeholder=""
                        value={searchValue}
                        onChange={handleSearchValue}
                        onKeyDown={(e) => {
                          if (e.key == "Enter") {
                            onSearchButtonClick();
                          }
                        }}
                      />
                      <input
                        type="button"
                        value="Search"
                        onClick={onSearchButtonClick}
                      />
                    </div>
                  </div>
                )}
              </div>
              {/* <RedButton buttonText="Appeal"  /> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;
