import React from 'react';
import {Table, Button} from 'antd';

class CreditDistributionList extends React.Component {
    state = {
        data: [
            {
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
                dataIndex: 'credit'
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
            <Table columns={columns} dataSource={this.state.data}/>
        )
    }
}

export default CreditDistributionList;