import React from 'react';
import {List, Badge, Row, Col} from "antd";

import {Link} from "react-router-dom";


class ActivityListItem extends React.Component {

    renderStartTime = () => {
        let startTime = new Date(this.props.activity.start_time);
        return <span>{startTime.toLocaleString()}</span>
    };

    renderStatusBadge = () => {
        const now = new Date();
        let startTime = new Date(this.props.activity.start_time);
        if (startTime > now) {
            return <span><Badge status="processing"/>即将到来</span>
        }
        if (((now - startTime) / 86400000) < 7) {
            return <span><Badge status="success"/>一周内</span>
        }
        return <span><Badge status="default"/>很久以前</span>
    };

    render() {
        const activity = this.props.activity;

        return <List.Item key={activity.id}>
            <List.Item.Meta
                title={<Link to={`/activity/${activity.id}/`}>{activity.title}</Link>}
                description={this.renderStartTime()}
            />
            <Row type="flex" justify="end" align="middle" className="w-100 text-right mr-2">
                <Col xl={10} lg={12} md={15} sm={20} xs={24}>
                    <Row type="flex" justify="end">
                        <Col xs={0} md={8} span={6} className="text-left"><strong>举办者</strong></Col>
                        <Col xs={22} md={16} span={12} className="text-right">{activity.society}</Col>
                    </Row>
                    <Row type="flex" justify="end">
                        <Col xs={0} md={8} span={6} className="text-left"><strong>地点</strong></Col>
                        <Col xs={22} md={16} span={12} className="text-right">{activity.place}</Col>
                    </Row>
                </Col>
                <Col xl={8} lg={8} md={9} sm={24} xs={24}>
                    <Col span={24}>{this.renderStatusBadge()}</Col>
                </Col>
            </Row>
        </List.Item>;
    }
}

export default ActivityListItem;