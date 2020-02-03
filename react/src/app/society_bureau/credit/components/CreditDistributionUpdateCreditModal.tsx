import * as React from 'react';
import {Modal, Form, InputNumber} from 'antd';
import CreditStore from "../stores/CreditStore";
import {observer} from 'mobx-react';
import {toJS} from 'mobx';

interface CDUpdateCreditModalState {
    credit: number
}

class CreditDistributionUpdateCreditModal extends React.Component<any, CDUpdateCreditModalState> {
    state = {
        credit: 0
        // 上面这行的0并没有什么用，只是为了别的人看懂我在写什么而已
    };

    onChange = (credit: number) => {
        this.setState({credit: credit})
    };

    render() {
        return (
            <Modal
                visible={CreditStore.updateCreditModalVisible}
                okText="更新！"
                cancelText="算了吧"
                onCancel={() => {
                    CreditStore.updateCreditModalVisible = false;
                }}
                onOk={() => CreditStore.updateSingleCDCredit(
                    CreditStore.editing.id,
                    this.state.credit
                )}>
                <Form>
                    <Form.Item label="分配学分人数上限">
                        <InputNumber
                            min={1}
                            value={CreditStore.defaultCreditValue}
                            onChange={(credit: number) => this.onChange(credit)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default observer(CreditDistributionUpdateCreditModal);