import React from 'react';
import {Row, Col, notification, Empty, List} from 'antd';

import SocietyListItem from "../components/SocietyListItem";

import Provider from "../../../utils/provider";


class StudentSociety extends React.Component {
    state = {
        societies: [],
        count: 0,
    };

    componentDidMount() {
        this.getSocieties(1, 10)
    }

    getSocieties = (pageNum, pageSize) => {
        Provider.get('/api/student/society/', {
            params: {
                page: pageNum,
                page_size: pageSize
            }
        }).then((res) => {
            this.setState({societies: res.data['results'], count: res.data['count']});
        }).catch((err) => {
            notification.error({
                message: 'Oops...',
                description: '获取社团列表失败了，请检查你的网络',
            });
        })
    };

    renderSocietyList = () => {
        const societies = this.state.societies;
        if (societies.length !== 0) {
            return (
                <List
                    bordered={true}
                    itemLayout="horizontal"
                    dataSource={societies}
                    renderItem={society => (
                        <SocietyListItem society={society}/>
                    )}
                />
            )
        }
        return <Empty description="社团们不见了"/>
    };

    render() {
        return (
            <Row>
                <Col>
                    {this.renderSocietyList()}
                </Col>
            </Row>
        )
    }
}

export default StudentSociety;