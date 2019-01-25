import React from 'react';
import PropTypes from 'prop-types';
import {
    Skeleton, Card
} from 'antd';

const {Meta} = Card;

class SocietyCard extends React.Component {
    state = {
        loading: false
    };

    render() {
        return (
            <Card loading={this.state.loading} hoverable>
                <Skeleton loading={this.state.loading}>
                    <Meta
                        title="123"
                        description="www.instagram.com"
                    />
                </Skeleton>
            </Card>
        )
    }
}

SocietyCard.propTypes = {
    name: PropTypes.string,
    society_id: PropTypes.number
};

export default SocietyCard;