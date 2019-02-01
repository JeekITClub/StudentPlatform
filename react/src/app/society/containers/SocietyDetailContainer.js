import React from 'react';
import {Row, Col, Skeleton, Carousel} from 'antd';

import '../styles/SocietyDetail.scss'

class SocietyDetailContainer extends React.Component {

    render() {
        return (
            <div className="society-detail-container container">
                <Row>
                    <Col>
                        <Skeleton loading={false}>
                            <Carousel autoplay>
                                <div><h3>1</h3></div>
                                <div><h3>2</h3></div>
                                <div><h3>3</h3></div>
                                <div><h3>4</h3></div>
                            </Carousel>
                        </Skeleton>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="society-detail-name">
                            society name
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default SocietyDetailContainer;