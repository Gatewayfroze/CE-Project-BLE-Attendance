import React from 'react'
import SlideMenu from 'react-slide-menu'
import '../Styles/styles.css'
import { Container, Row, Col, Table } from 'reactstrap'
const EnrollPage = () => {
    return (
        <div style={{ margin: '20px' }}>
            <Row>
                <Col>
                    <h1>Test</h1>
                </Col>

                <Col>
                    <h1>Test2</h1>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>asdsad</th>
                                <th>asdsad</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    asdasd
                                </td>
                                <td>
                                    asdasd
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    )
}
export default EnrollPage