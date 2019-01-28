import React from 'react';
import {Empty, Form, Input} from "antd";
import SocietyCard from "../components/SocietyCard";
import SocietySearch from "../components/SocietySearch";

class SocietyList extends React.Component {
    state = {
        societies: []
    };

    renderList = () => {
        if (this.state.societies.length !== 0) {
            return (
                this.state.societies.map((society) => {
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
                {this.renderHeader()}
                {this.renderList()}
            </div>
        )
    }
}

export default SocietyList;