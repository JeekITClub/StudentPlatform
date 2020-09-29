import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Card} from 'antd';

const {Meta} = Card;

import TagContainer from '../components/TagContainer';
import '../styles/SocietyCard.scss'

class SocietyCard extends React.Component {
    state = {
        loading: false,
    };

    renderCover = (avatar) => {
        return (
            <img alt="暂无封面" src={avatar && avatar.replace('3000', '8000')} height="400px" width="400px" />
        )
    };

    render() {
        // Mini Serializer
        const society = this.props.society;
        return (
            <div className="society-card">
                <Link to={`/society/${society.id}/`}>
                    <Card
                        loading={this.state.loading}
                        cover={this.renderCover(society.avatar)}
                        hoverable>
                        <Meta title={society.name}/>
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
