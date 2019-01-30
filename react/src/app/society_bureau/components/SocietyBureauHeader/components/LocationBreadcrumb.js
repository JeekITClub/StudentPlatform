import React from 'react';
import {Breadcrumb, Row, Col} from 'antd';


class LocationBreadcrumb extends React.Component {
    renderBreadcrumb = () => {
        return null
    };

    render() {
        return (
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
                    <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
                    <Breadcrumb.Item>An Application</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
        )
    }
}

export default LocationBreadcrumb;