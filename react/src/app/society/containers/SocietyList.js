import React from 'react';
import {observer} from 'mobx-react';
import {Empty, Row, Col} from "antd";
import SocietyCard from "../components/SocietyCard";
import SocietySearch from "../components/SocietySearch";
import SocietyStore from "../stores/SocietyStore";

import '../styles/SocietyList.scss'

@observer
class SocietyList extends React.Component {
    renderList = () => {
        if (SocietyStore.societies.length !== 0) {
            return (
                <Row gutter={16}>
                    {
                        SocietyStore.societies.map((society) => {
                            return (
                                <Col lg={6} xs={12} key={society.society_id}>
                                    <SocietyCard
                                        name={society.name}
                                        society_id={society.society_id}
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
                <div className="society-list-body">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

export default SocietyList;