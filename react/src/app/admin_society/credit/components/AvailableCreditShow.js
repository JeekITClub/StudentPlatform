import React from 'react';
import {observer} from 'mobx-react';
import { Statistic } from 'antd';

import CreditStore from '../CreditStore'


@observer
class AvailableCreditShow extends React.Component {
    componentDidMount() {
        CreditStore.fetchCredit()
    }

    render () {
        return (
            <Statistic title="剩余可获得学分人数" value={CreditStore.availableCredit} />
        )
    }
}

export default AvailableCreditShow;