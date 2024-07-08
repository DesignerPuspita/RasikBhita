import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "@/component/Breadcrumb";
import Table from "react-bootstrap/Table";
import HomeService from "@/services/Home";
const index = () => {
    const [showCalendarData, setShowCalendarData] = useState([]);
    useEffect(() => {
        const fetchUpcomingEvents = async () => {
            try {
                const response = await HomeService.upComingEvents();
                if (!response.error && response.body.length > 0) {
                    setShowCalendarData(response.body);
                } else {
                    setShowCalendarData([]); // Empty array if no events found
                }
            } catch (error) {
                console.error("Error fetching upcoming events:", error);
            }
        };

        fetchUpcomingEvents();
    }, []);
    return (
        <>
            <Container fluid className="px-0">
                <Breadcrumb
                    pageTitle="Upcoming Events"
                    breadCrumbCurrentPage="Upcoming Events"
                />
            </Container>

            <Container>
                <Row>
                    <Col className="table-col">
                        <Table striped bordered hover responsive className="main-table">
                            <thead className="table-headings">
                                <tr>
                                    <th>Date</th>
                                    <th>Events Name</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {showCalendarData?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td style={{ width: '300px' }}>
                                                {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </td>
                                            <td>{item.upcomingeventname}</td>

                                        </tr>
                                    )
                                })}

                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default index