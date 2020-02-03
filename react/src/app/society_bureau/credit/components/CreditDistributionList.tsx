import React from 'react';
import {Form, Table, Button, InputNumber, Icon, Tooltip, Modal, notification, Switch} from 'antd';
import {observer} from 'mobx-react'
import {toJS} from 'mobx';
import { AxiosResponse, AxiosError } from 'axios';
import CreditReceiversTable from './CreditReceiversTable';
import CreditDistributionUpdateCreditModal from './CreditDistributionUpdateCreditModal';
import CreditStore from '../stores/CreditStore'
import Provider from "../../../../utils/provider";
import '../styles/credit.scss'
import {PaginationConfig} from 'antd/lib/pagination/Pagination'

import {ICreditDistribution} from "../../../../types";


class CreditDistributionList extends React.Component {
    componentDidMount() {
        CreditStore.fetch({})
    }

    checkDetail = (id: number) => {
        if (CreditStore.detail) {
            CreditStore.detail.fetch({ id: id });
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

    renderClosedSwitch = (open: boolean, id: number, index: number) => {
        return (
            <Switch checked={open} onChange={(checked) => this.handleUpdateClosed(checked, id, index)}/>
        )
    };

    showSetCreditModal = (id: number, index: number) => {
        CreditStore.updateCreditModalVisible = true;
        CreditStore.editing = {
            id,
            index
        };
    };

    handleUpdateClosed = (checked: boolean, id: number, index: number) => {
        CreditStore.data[index].open = checked;
        Provider.patch(
            `/api/manage/credit/${id}/`,
            { opened: checked }
        )
            .then((res: AxiosResponse) => {
                if (res.status === 200) {
                    notification.success({
                        message: '更新',
                        description: '更新成功'
                    })
                }
            })
            .catch((err: AxiosError) => {
                throw err
            })
    };

    onPaginationChange = (pagination: PaginationConfig) => {
        CreditStore.fetch({ pageNum: pagination.current, pageSize: pagination.pageSize });
    };

    render() {
        const columns = [
            {
                title: '学年',
                key: 'year',
                dataIndex: 'year'
            },
            {
                title: '学期',
                key: 'semester',
                dataIndex: 'semester'
            },
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
                render: (credit: number, record: ICreditDistribution, index: number) => {
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
                render: (record: ICreditDistribution) => this.renderCheckReceiversDetail(record.id)
            },
            {
                title: '社长是否可分配学分',
                key: 'open',
                dataIndex: 'open',
                render: (
                    open: boolean,
                    record: ICreditDistribution,
                    index: number
                ) => this.renderClosedSwitch(open, record.id, index)
            },
            {
                title: '操作',
                key: 'operation',
                render: (_: any, record: ICreditDistribution, index: number) => {
                    return (
                        <Button
                            type="danger"
                            onClick={() => CreditStore.delete(record.id)}
                        >
                            删除
                        </Button>
                    )
                }
            }
        ];

        return (
            <div>
                <Table
                    className="mt-2"
                    pagination={{
                        showSizeChanger: true,
                        total: CreditStore.count
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
                <CreditDistributionUpdateCreditModal />
            </div>
        )
    }
}

export default observer(CreditDistributionList);
