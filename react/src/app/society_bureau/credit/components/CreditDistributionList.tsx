import React from 'react';
import {Form, Table, Button, InputNumber, Icon, Tooltip, Modal, notification, Switch} from 'antd';
import {observer} from 'mobx-react'
import {toJS} from 'mobx';

import CreditReceiversTable from './CreditReceiversTable';
import CreditStore from '../stores/CreditStore'
import Provider from "../../../../utils/provider";
import '../styles/credit.scss'


@observer
class CreditDistributionList extends React.Component {
    componentDidMount() {
        CreditStore.fetch({})
    }

    state = {
        setCreditModalVisible: false,
        setCredit: 1,
        editing: { id: 0, index: 0 }
    };

    checkDetail = (id: number) => {
        if (CreditStore.detail) {
            CreditStore.detail.fetch({ id });
        } else {
            CreditStore.initDetail(id);
        }
        CreditStore.checkingDetail = true;
    };

    renderCheckReceiversDetail = (id: number) => {
        return (
            <Button htmlType="button" onClick={() => {
                this.checkDetail(id)
            }}>
                查看详情
            </Button>
        )
    };

    renderClosedSwitch = (open: boolean, id: Number, index: Number) => {
        return (
            <Switch checked={open} onChange={(checked) => this.handleUpdateClosed(checked, id, index)}/>
        )
    };

    showSetCreditModal = (id, index) => {
        this.setState({
            setCreditModalVisible: true,
            editing: { id: id, index: index }
        });
    };

    handleUpdateClosed = (checked, id, index) => {
        CreditStore.data[index].open = checked;
        Provider.patch(
            `/api/manage/credit/${id}/`,
            { opened: checked }
        )
            .then((res) => {
                if (res.status === 200) {
                    notification.success({
                        message: '更新',
                        description: '更新成功'
                    })
                }
            })
            .catch((err) => {
                throw err
            })
    };

    handleSetCreditChange = (value) => {
        this.setState({ setCredit: value })
    };

    updateCredit = () => {
        Provider.patch(
            `/api/manage/credit/${this.state.editing.id}/`,
            { credit: this.state.setCredit }
        )
            .then((res) => {
                let data = this.state.data;
                data[this.state.editing.index].credit = this.state.setCredit;
                this.setState({
                    setCreditModalVisible: false,
                    setCredit: 1,
                    data: data
                });
            })
            .catch((err) => {
                throw err
            })
    };

    onPaginationChange = (pagination) => {
        CreditStore.fetch({ pageNum: pagination.current, pageSize: pagination.pageSize });
    };

    render() {
        const columns = [
            {
                title: '社团ID',
                key: 'society_id',
                dataIndex: 'society.society_id'
            },
            {
                title: '社团名称',
                key: 'society_name',
                dataIndex: 'society.name'
            },
            {
                title: '可获得学分的成员人数最大值',
                key: 'credit',
                dataIndex: 'credit',
                render: (credit, record, index) => {
                    return (
                        <div>
                            {credit}
                            <Tooltip title="点击编辑按钮修改该社团分配学分人数上限">
                                <Icon type="edit" className="edit-icon"
                                      onClick={() => this.showSetCreditModal(record.id, index)}/>
                            </Tooltip>
                        </div>
                    )
                }
            },
            {
                title: '已分配数量',
                key: 'receivers_count',
                dataIndex: 'receivers_count'
            },
            {
                title: '获得学分者',
                key: 'receivers',
                render: (record) => this.renderCheckReceiversDetail(record.id)
            },
            {
                title: '社长可分配学分',
                key: 'open',
                dataIndex: 'open',
                render: (open, record, index) => this.renderClosedSwitch(open, record.id, index)
            }
        ];

        return (
            <div>
                <Table
                    className="mt-2"
                    pagination={{
                        showSizeChanger: true,
                        total: this.state.count
                    }}
                    onChange={this.onPaginationChange}
                    columns={columns}
                    dataSource={toJS(CreditStore.data)}
                    rowKey="id"
                />
                <Modal
                    visible={CreditStore.checkingDetail}
                    footer={null}
                    onCancel={() => {
                        CreditStore.checkingDetail = false
                    }}
                >
                    {CreditStore.detail && CreditStore.detail.data && (
                        <CreditReceiversTable data={CreditStore.detail.data.receivers}/>
                    )}
                </Modal>
                <Modal visible={this.state.setCreditModalVisible}
                       okText="更新！"
                       cancelText="算了吧"
                       onCancel={() => this.setState({ setCreditModalVisible: false })}
                       onOk={() => this.updateCredit()}>
                    <Form>
                        <Form.Item label="分配学分人数上限">
                            <InputNumber
                                min={1}
                                value={this.state.setCreditModalVisible ? toJS(CreditStore.data)[this.state.editing.index].credit : 1}
                                onChange={(value) => this.handleSetCreditChange(value)}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default CreditDistributionList;
