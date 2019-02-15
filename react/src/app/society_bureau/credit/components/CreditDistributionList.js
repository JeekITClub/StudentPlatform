import React from 'react';
import {Table, Button, Input} from 'antd';
import Provider from "../../../../utils/provider";

class CreditDistributionList extends React.Component {
    state = {
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

    updateCredit = (cb_id, credit, index) => {
        let data = this.state.data;
        data[index].credit = credit;
        this.setState({data: data});
        Provider.patch('/api/manage/credit')
            .then((res) => {
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
                        <Input value={credit} onChange={(e) => this.updateCredit(record.id, e.target.value, index)}/>
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
                render: () => this.renderCheckReceiversDetail()
            }
        ];

        return (
            <Table
                className="mt-2"
                columns={columns}
                dataSource={this.state.data}
                rowKey="id"
            />
        )
    }
}

export default CreditDistributionList;