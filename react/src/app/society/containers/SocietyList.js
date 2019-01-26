import React from 'react';
import { Empty } from "antd";
import SocietyCard from "../components/SocietyCard";

class SocietyList extends React.Component {
    state = {
        societies: []
    };

    renderSocietyList = () => {
        return (
            this.state.societies.map((society) => {
                return (
                    <SocietyCard name={society.name} society_id={society.society_id}/>
                )
            })
        )
    };

    renderNull = () => {
        return (
            <Empty />
        )
    };

    render() {
        return this.state.societies.length === 0 ? this.renderNull() : this.renderSocietyList()
    }
}

export default SocietyList;