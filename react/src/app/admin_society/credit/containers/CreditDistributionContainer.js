import React from 'react';
import {Row, Col} from 'antd';

import AvailableCreditShow from '../components/AvailableCreditShow'
import DistributeCredit from '../components/DistributeCredit'
import CreditStore from "../CreditStore";

class CreditDistributionContainer extends React.Component {
    componentDidMount() {
        CreditStore.fetch()
    }

    render() {
        return (
            <div>
                <Row type="flex" justify="center">
                    <Col>
                        <AvailableCreditShow/>
                    </Col>
                </Row>
                <Row type="flex" justify="center" className="mt-5">
                    <Col>
                        <DistributeCredit/>
                    </Col>
                </Row>
            </div>
        )

    }
}

export default CreditDistributionContainer;