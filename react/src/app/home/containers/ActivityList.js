import React from 'react';
import {Row, Col, notification, Empty, List} from 'antd';

import ActivityListItem from "../components/ActivityListItem";

import Provider from "../../../utils/provider";


class ActivityList extends React.Component {
    state = {
        activities: [],
        count: 0,
    };

    componentDidMount() {
        this.getActivities(1, 10)
    }

    getActivities = (pageNum, pageSize) => {
        Provider.get('/api/activity/', {
            params: {
                page: pageNum,
                page_size: pageSize
            }
        }).then((res) => {
            console.log(res.data['results']);
            this.setState({activities: res.data['results'], count: res.data['count']});
        }).catch((err) => {
            notification.error({
                message: 'Oops...',
                description: '获取活动列表失败了，请检查你的网络',
            });
        })
    };

    renderActivityList = () => {
        const activities = this.state.activities;
        if (activities.length !== 0) {
            return (
                <List
                    itemLayout="horizontal"
                    dataSource={activities}
                    pagination={{
                           showSizeChanger: true,
                           total: this.state.count
                       }}
                    renderItem={activity => (
                        <ActivityListItem activity={activity}/>
                    )}
                />
            )
        }
        return <Empty description="现在还没有活动"/>
    };

    render() {
        return (
            <Row>
                <Col>
                    {this.renderActivityList()}
                </Col>
            </Row>
        )
    }
}

export default ActivityList;