import React from 'react';

import AvailableCreditShow from '../components/AvailableCreditShow'
import DistributeCredit from '../components/DistributeCredit'

class CreditDistributionContainer extends React.Component {
    render() {
        return (
            <div>
                <AvailableCreditShow/>
                <DistributeCredit/>
            </div>
        )

    }
}

export default CreditDistributionContainer;