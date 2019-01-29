import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {
    Skeleton, Card
} from 'antd';

const {Meta} = Card;

import '../styles/SocietyCard.scss'

class SocietyCard extends React.Component {
    state = {
        loading: false,
        src: "https://picsum.photos/300/?random"
    };

    renderCover = () => {
        return (
            <img alt="cover" src={this.state.src} className="society-card-cover"/>
        )
    };

    render() {
        return (
            <div className="society-card">
                <Link to={`/society/${this.props.society_id}/`}>
                    <Card
                        loading={this.state.loading}
                        cover={this.renderCover(this.state.src)}
                        hoverable
                    >
                        <Skeleton loading={this.state.loading}>
                            <Meta
                                title={this.props.name}
                            />
                        </Skeleton>
                    </Card>
                </Link>
            </div>
        )
    }
}

SocietyCard.propTypes = {
    name: PropTypes.string,
    society_id: PropTypes.number
};

export default SocietyCard;