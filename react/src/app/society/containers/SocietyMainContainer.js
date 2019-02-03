import React from 'react';
import {Row, Col} from 'antd';

import '../styles/SocietyMainContainer.scss';

class SocietyMainContainer extends React.Component {

    render() {
        return (
            <Row className="society-main-container" type="flex" justify="space-around">
                <Col xs={22} sm={22} md={20} lg={20} xl={20} xxl={18}>{this.props.children}</Col>
            </Row>
        )
    }
}

export default SocietyMainContainer;