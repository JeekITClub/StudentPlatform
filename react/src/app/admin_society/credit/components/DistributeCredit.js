import React from 'react';
import {Transfer, message, Button} from "antd";
import {observer} from 'mobx-react';

import CreditStore from '../CreditStore'

@observer
class DistributeCredit extends React.Component {

    handleChange = (targetKeys, direction, moveKeys) => {
        if (direction === 'right' && CreditStore.availableCredit - moveKeys < 0) {
            message.error('已达到学分分配人数上限', 5);
        } else {
            CreditStore.updateChosenIds(targetKeys);
        }
    };


    render() {
        return (
            <div className="distribute-credit">
                <Transfer
                    height={800}
                    dataSource={CreditStore.available_receivers}
                    disabled={CreditStore.closed}
                    showSearch
                    rowKey={record => record.id}
                    operations={['授予学分', '取消授予学分']}
                    targetKeys={CreditStore.chosenIds}
                    locale={{ itemUnit: '人', itemsUnit: '人', notFoundContent: '列表为空', searchPlaceholder: '请输入搜索内容' }}
                    onChange={this.handleChange}
                    render={member => `${member.grade}级(${member.class_num})班-${member.name}`}
                />
                <Button htmlType="button"
                        onClick={() => CreditStore.submit()}
                        type="primary"
                        size="large"
                        className="mt-5"
                        style={{ width: '100%' }}
                        disabled={CreditStore.closed}
                >
                    提交
                </Button>
            </div>
        )
    }
}

export default DistributeCredit;