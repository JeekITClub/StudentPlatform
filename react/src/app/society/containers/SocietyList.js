import React from 'react';
import {observer} from 'mobx-react';
import {Empty, Row, Col, List, Avatar, Tag} from "antd";
import {Link} from 'react-router-dom';

import SocietyCard from "../components/SocietyCard";
import SocietySearch from "../components/SocietySearch";
import SocietyStore from "../stores/SocietyStore";
import '../styles/SocietyList.scss'

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

@observer
class SocietyList extends React.Component {
    renderCardList = () => {
        if (SocietyStore.societies.length !== 0) {
            return (
                <Row gutter={16}>
                    {
                        SocietyStore.societies.map((society) => {
                            return (
                                <Col lg={6} xs={12} key={society.society_id}>
                                    <SocietyCard
                                        society={society}
                                    />
                                </Col>
                            )
                        })
                    }
                </Row>
            )
        }
        return <Empty/>
    };

    renderItemList = () => {
        if (SocietyStore.societies.length !== 0) {
            return <List
                bordered={true}
                itemLayout="vertical"
                dataSource={SocietyStore.societies}
                renderItem={item => (
                    <List.Item
                        key={item.society_id}>
                        <List.Item.Meta
                            avatar={<Avatar
                                shape="square"
                                size="large"
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                            title={<Link to={`/society/${item.society_id}/`}>{item.name}</Link>}
                            description={(<div><Tag color="red">red</Tag><Tag color="geekblue">geekblue</Tag></div>)}
                        />

                    </List.Item>
                )}
            />
        }
        return <Empty/>
    };

    renderHeader = () => {
        return <SocietySearch/>
    };

    render() {
        return (
            <div className="society-list-container">
                <Row className="society-list-header">
                    <Col lg={6} md={8} sm={24}>
                        {this.renderHeader()}
                    </Col>
                </Row>
                <Row>
                    <Col xxl={24} xl={24} lg={24} md={24} sm={0} xs={0} className="society-list-body">
                        {this.renderCardList()}
                    </Col>
                    <Col xxl={0} xl={0} lg={0} md={0} sm={24} xs={24} className="society-list-body">
                        {this.renderItemList()}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default SocietyList;