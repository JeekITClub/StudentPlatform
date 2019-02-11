import React from 'react';
import {Transfer} from "antd";
import {observer} from 'mobx-react';

import CreditStore from '../CreditStore'

import '../SocietyManageCredit.scss'

@observer
class DistributeCredit extends React.Component {
    handleChange = (chosenIds) => {
        CreditStore.updateChosenIds(chosenIds);
    };

    render() {
        return (
            <div className="distribute-credit">
                <Transfer
                    height={800}
                    dataSource={CreditStore.members}
                    showSearch
                    rowKey={record => record.username}
                    operations={['授予学分', '取消授予学分']}
                    targetKeys={CreditStore.chosenIds}
                    onChange={this.handleChange}
                    render={member => `${member.grade}-${member.class_num}-${member.name}`}
                />
            </div>
        )
    }
}

export default DistributeCredit;