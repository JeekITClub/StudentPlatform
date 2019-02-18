import React from 'react';
import {Form, Table, Button, InputNumber, Icon, Tooltip, Modal} from 'antd';

import Provider from "../../../../utils/provider";
import '../styles/credit.scss'


class CreditDistributionList extends React.Component {
    state = {
        setCreditModalVisible: false,
        setCredit: 0,
        editing: {
            id: 0,
            index: 0
        },
        data: [
            {
                id: 1,
                society: {
                    society_id: 101,
                    name: 'jeek'
                },
                credit: 0,
                receivers_count: 0,
                receivers: []
            }
        ]
    };

    renderCheckReceiversDetail = () => {
        return (
            <Button htmlType="button">
                查看详情
            </Button>
        )
    };

    showSetCreditModal = (id, index) => {
        this.setState({setCreditModalVisible: true, editing: {id: id, index: index}});
    };

    handleSetCreditChange = (value) => {
        this.setState({setCredit: value})
    };

    updateCredit = () => {
        Provider.patch(`/api/manage/credit/${this.state.editing.id}`,)
            .then((res) => {
                let data = this.state.data;
                data[this.state.editing.index].credit = credit;
                this.setState({data: data});
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
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
                                <Icon type="edit" className="edit-icon" onClick={() => this.showSetCreditModal(record.id, index)}/>
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
            }
        ];

        return (
            <div>
                <Table
                    className="mt-2"
                    columns={columns}
                    dataSource={this.state.data}
                    rowKey="id"
                />
                <Modal visible={this.state.setCreditModalVisible}
                       okText="更新！"
                       cancelText="算了吧"
                       onCancel={() => this.setState({setCreditModalVisible: false})}
                       onOk={() => this.updateCredit()}>
                    <Form>
                        <Form.Item label="分配学分人数上限">
                            <InputNumber
                                value={this.state.setCredit}
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