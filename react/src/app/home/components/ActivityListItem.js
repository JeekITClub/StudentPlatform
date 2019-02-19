import React from 'react';
import {List, Divider, Badge, Row, Col} from "antd";

import Provider from "../../../utils/provider";


class ActivityListItem extends React.Component {

    renderStartTime = () => {
        let startTime = new Date(this.props.activity.start_time);
        return <span>{startTime.toLocaleString()}</span>
    };

    renderStatusBadge = () => {
        const now = new Date();
        let startTime = new Date(this.props.activity.start_time);
        console.log((now - startTime) / 86400000);
        if (startTime > now) {
            return <span><Badge status="processing"/>即将到来</span>
        }
        if (((now - startTime) / 86400000) < 7) {
            return <span><Badge status="success"/>一周内</span>
        }
        return <span><Badge status="default"/>很久以前</span>
        // dif =
        // if (now.getDate() - startTime.getDate()
    };

    render() {
        const activity = this.props.activity;

        return <List.Item key={activity.id}>
            <List.Item.Meta
                title={activity.title}
                description={
                    <div>
                        <p>{this.renderStartTime()}</p>
                    </div>
                }
            />
            <Row type="flex" justify="end" align="middle" className="w-100 text-right mr-2">
                <Col xl={10} lg={12} md={15} sm={20} xs={24}>
                    <Row type="flex" justify="end">
                        <Col xs={8} md={7} span={6} className="text-left"><strong>举办者</strong></Col>
                        <Col xs={16} span={12} className="text-right">{activity.society}</Col>
                    </Row>
                    <Row type="flex" justify="end">
                        <Col xs={8} md={7} span={6} className="text-left"><strong>地点</strong></Col>
                        <Col xs={16} span={12} className="text-right">{activity.place}</Col>
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