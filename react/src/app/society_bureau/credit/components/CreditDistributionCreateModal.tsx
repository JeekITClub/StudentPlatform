import React from 'react';
import {Modal, Form, Select, InputNumber, Divider, Button} from 'antd';
import CreditStore from "../stores/CreditStore";
import {AxiosResponse} from 'axios';
import { observer } from 'mobx-react';

type CDCreateaModalState =  {
    year: number,
    semester: number
}

@observer
class CreditDistributionCreateModal extends React.Component<CDCreateaModalState> {
    state = {
        societies: [],
        selectedSocietiesIds: [],
        year: 2019,
        semester: 1
    }

    componentDidMount() {
        CreditStore.fetchActiveSocieties()
            .then((res: AxiosResponse) => {
                this.setState({ societies: res.data })
            })
            .catch((err: Error) => {
                throw err
            })
    }

    handleSelectAll = () => {
        // console.log(this.state.selectedSocietiesIds);
        this.setState({
            selectedSocietiesIds: this.state.societies.map((society) => {
                return society.id
            })
        });
    };

    handleClear = () => {
        this.setState({ selectedSocietiesIds: [] })
    };

    render() {
        return (
            <Modal
                title="创建学分分配"
                visible={CreditStore.createCDModalVisible}
                onOk={() => {
                    if (CreditStore.createCDBulk) {
                        CreditStore.bulkCreateCreditDistribution()
                    } else {
                        CreditStore.createCreditDistribution()
                    }
                }}
                onCancel={() => CreditStore.createCDModalVisible = false}
            >
                <Form>
                    <Form.Item label="学年">
                        <InputNumber
                            precision={0}
                            min={2019}
                            style={{ 'width': '100%' }}
                            value={this.state.year}
                            onChange={(value) => this.setState({year: value})}
                        />
                    </Form.Item>
                    <Form.Item label="学期">
                        <Select value={this.state.semester}
                        onChange={(value: number) => {
                            this.setState({semester: value})
                        }}>
                            <Select.Option value={1}>
                                第一学期
                            </Select.Option>
                            <Select.Option value={2}>
                                第二学期
                            </Select.Option>
                        </Select>
                    </Form.Item>
                    {
                        !CreditStore.createCDBulk &&
                        <Form.Item label="选择社团">
                            <Select
                                mode="multiple"
                                value={this.state.selectedSocietiesIds}
                                onChange={(value: number[]) => {
                                    this.setState({ selectedSocietiesIds: value })
                                }}
                            >
                                {
                                    this.state.societies.map((society) => (
                                        <Select.Option value={society.id}
                                                       key={society.id}>{society.id} - {society.name}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    }
                </Form>
            </Modal>
        )
    }
}

export default CreditDistributionCreateModal;