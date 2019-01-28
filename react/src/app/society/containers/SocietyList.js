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
                SocietyStore.societies.map((society) => {
                    return (
                        <SocietyCard name={society.name} society_id={society.society_id}/>
                    )
                })
            )
        }
        return <Empty/>
    };

    renderHeader = () => {
        return <SocietySearch/>
    };

    render() {
        return (
            <div>
                <Row className="society-list-header">
                    <Col lg={8} sm={24}>
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