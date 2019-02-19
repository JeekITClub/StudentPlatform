import React from 'react';
import {List, Divider} from "antd";

import Provider from "../../../utils/provider";


class ActivityListItem extends React.Component {

    renderStartTime = () => {
        let startTime = new Date(this.props.activity.start_time);
        return <span>{startTime.toLocaleString()}</span>
    };

    render() {
        const activity = this.props.activity;

        return <List.Item key={activity.id}>
            <List.Item.Meta
                title={<p>{activity.title}</p>}
                description={
                    <div>
                        <span>{activity.society}</span>
                        <Divider type="vertical"/>
                        <span>{this.renderStartTime()}</span>
                    </div>
                }
            />
        </List.Item>;
    }
}

export default ActivityListItem;