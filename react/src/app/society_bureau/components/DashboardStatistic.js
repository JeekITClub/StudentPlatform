import React from 'react';
import {Statistic, Row, Col, Badge} from 'antd';

import Provider from '../../../utils/provider'

class DashboardStatistic extends React.Component {
    state = {
        active_user_count: 0,
        society_count: 0,
        activity_count: 0,
        waiting_society_count: 0,
        waiting_activity_count: 0
    };

    componentDidMount() {
        Provider.get('/api/manage/dashboard/statistic/')
            .then((res) => {
                console.log(res.data);
                this.setState(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <Row type="flex" justify="space-around">
                <Col>
                    <Statistic title="近60天活跃用户" value={this.state.active_user_count}/>
                </Col>
                <Col>
                    <Statistic
                        title="社团数量"
                        value={this.state.society_count}
                        suffix={<p>/ {this.state.waiting_society_count}</p>}/>
                </Col>
                <Col>
                    <Statistic
                        title="活动数量"
                        value={this.state.activity_count}
                        suffix={<p>/ {this.state.waiting_activity_count}</p>}/>
                </Col>
            </Row>
        )
    }
}

export default DashboardStatistic;