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
        src: "https://picsum.photos/300/?random"
    };

    renderCover = (avatar) => {
        return (
            <img alt="暂无封面" src={avatar && avatar.replace('3000', '8000') || this.state.src}/>
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
                        {/*<div className="society-card-tag-container">*/}
                            {/*<TagContainer tags={society.tags}/>*/}
                        {/*</div>*/}
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
