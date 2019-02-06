import React from 'react';
import {Table, Tooltip, Button} from 'antd';

import Provider from '../../../utils/provider'

class SocietyTable extends React.Component {
    state = {
        societies: []
    };

    componentDidMount() {
        Provider.get('/api/manage/society/')
            .then((res) => {
                this.setState({societies: res.data})
            })
            .catch((err) => {
                console.log(err)
            })
    }

    renderPresidentTooltip = (president_name, index) => {
        const row = this.state.societies[index];
        return (
            <Tooltip title={`${row.president_grade}${row.president_class}${row.president_name}`}>
                {president_name}
            </Tooltip>
        )
    };

    renderInspectButton = () => {
        return (
            <Button type="primary">查看</Button>
        )
    };

    render() {
        const columns = [
            {
                title: '社团ID',
                dataIndex: 'society_id',
                key: 'society_id'
            },
            {
                title: '社团名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '社长姓名',
                dataIndex: 'president_name',
                key: 'president_name',
                render: (text, _, index) => this.renderPresidentTooltip(text, index)
            },
            {
                title: '查看',
                key: 'inspect',
                render: this.renderInspectButton
            }
        ];

        return (
            <Table rowKey="society_id" columns={columns} dataSource={this.state.societies}/>
        )
    }
}

export default SocietyTable;