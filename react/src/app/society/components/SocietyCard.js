import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {
    Card, Tag
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
            <img alt="cover" src={this.state.src}/>
        )
    };

    render() {
        // Mini Serializer
        const society = this.props.society;
        return (
            <div className="society-card">
                <Link to={`/society/${society.society_id}/`}>
                    <Card
                        loading={this.state.loading}
                        cover={this.renderCover(this.state.src)}
                        hoverable
                    >
                        <Meta
                            title={society.name}

                        />
                        <div className="society-card-tag-container">
                            <Tag color="magenta">magenta</Tag>
                            <Tag color="red">red</Tag>
                        </div>
                    </Card>
                </Link>
            </div>
        )
    }
}

SocietyCard.propTypes = {
    society: PropTypes.object
};

export default SocietyCard;