import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Col, Row} from "antd";

import SocietyDetailContainer from './containers/SocietyDetailContainer';
import SocietyList from './containers/SocietyList';
import './styles/index.scss';

export default function Society({match}) {
    return (
        <Row className="society-main-container" type="flex" justify="space-around">
            <Col>
                <Switch>
                    <Route path={`${match.url}/:id`} component={SocietyDetailContainer}/>
                    <Route path={`${match.url}`} exact component={SocietyList}/>
                </Switch>
            </Col>
        </Row>
    );
}
