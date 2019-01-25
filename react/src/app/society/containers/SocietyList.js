import React from 'react';
import SocietyCard from "../components/SocietyCard";

class SocietyList extends React.Component {
    state = {
        societies: []
    };

    renderSocietyList = () => {
        return (
            this.state.societies.map((society) => {
                return (
                    <SocietyCard/>
                )
            })
        )
    };

    renderNull = () => {
        return (
            <div>No Society</div>
        )
    };

    render() {
        return this.state.societies.length === 0 ? this.renderNull() : this.renderSocietyList()
    }
}

export default SocietyList;