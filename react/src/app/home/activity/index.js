import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Col, Row} from "antd";

import ActivityList from './containers/ActivityList';
import ActivityDetail from './containers/ActivityDetail';

export default function Activity({match}) {
    return (
        <Row type="flex" justify="space-around">
            <Col xs={22} sm={22} md={20} lg={20} xl={20} xxl={18}>
                <Switch>
                    <Route path={`${match.url}/:id`} component={ActivityDetail}/>
                    <Route path={`${match.url}`} exact component={ActivityList}/>
                </Switch>
            </Col>
        </Row>
    );
}
