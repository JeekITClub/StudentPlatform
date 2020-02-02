import React from 'react';
import {Modal, Form, Select, InputNumber, Divider, Button} from 'antd';
import CreditStore from "../stores/CreditStore";
import {AxiosResponse} from 'axios';
import { observer } from 'mobx-react';
import { ISociety } from '../../../../types';

type CDCreateModalState = {
    selectedSocietySocietyIdSet: number[],
    year: number,
    semester: number
}

class CreditDistributionCreateModal extends React.Component<{}, CDCreateModalState> {
    state = {
        // @ts-ignore
        selectedSocietySocietyIdSet: [],
        year: 2019,
        semester: 1
    };

    componentDidMount() {
        CreditStore.fetchActiveSocieties()
    }

    handleSelectAll = () => {
        this.setState({
            selectedSocietySocietyIdSet: CreditStore.activeSocieties.map((society: ISociety) => {
                return society.society_id
            })
        });
    };

    handleClear = () => {
        this.setState({ selectedSocietySocietyIdSet: [] })
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
                        CreditStore.createCreditDistribution({
                            year: this.state.year,
                            semester: this.state.semester,
                            society_id_set: this.state.selectedSocietySocietyIdSet
                        })
                    }
                }}
                onCancel={() => {
                    CreditStore.createCDModalVisible = false
                }}
            >
                <Form>
                    <Form.Item label="学年">
                        <InputNumber
                            precision={0}
                            style={{ 'width': '100%' }}
                            value={this.state.year}
                            onChange={(value) => this.setState({year: value})}
                        />
                    </Form.Item>
                    <Form.Item label="学期">
                        <Select
                            value={this.state.semester}
                            onChange={(value: number) => {
                                this.setState({semester: value})
                            }}
                        >
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
                                value={this.state.selectedSocietySocietyIdSet}
                                // onChange={(value: number[]) => {
                                //     this.setState({selectedSocietySocietyIdSet: value})
                                // }}
                            >
                                {
                                    CreditStore.activeSocieties.map((society: ISociety) => {
                                        return (
                                            <Select.Option
                                                value={society.society_id}
                                                key={society.society_id}
                                            >
                                                {society.society_id} - {society.name}
                                            </Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                    }
                </Form>
            </Modal>
        )
    }
}

export default observer(CreditDistributionCreateModal);