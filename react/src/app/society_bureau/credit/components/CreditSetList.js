import React from 'react';
import {Table, Button} from 'antd';
import CreditSetAllModal from './CreditSetAllModal'

import Provider from '../../../../utils/provider'

class CreditSetList extends React.Component {
    state = {
        setAllCredit: 0,
        data: [
            {
                id: 1,
                society: {
                    society_id: 101,
                    name: '233'
                },
                credit: 2
            }
        ],
        setAllModalVisible: false
    };

    showSetAllModal = () => {
        this.setState({
            setAllModalVisible: true
        })
    };

    renderSetAllButton = () => {
        return (
            <Button htmlType="button" onClick={this.showSetAllModal}>一键全部设置</Button>
        )
    };

    submitSetAllCredit = () => {
        Provider.post('/')
            .then((res) => {
                this.setState({ setAllModalVisible: false})
                console.log(res)
            })
            .catch((err) => {})
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
            }
        ];
        return (
            <div>
                <Table title={this.renderSetAllButton}
                       columns={columns}
                       dataSource={this.state.data}
                       rowKey="id"
                />
                {
                    this.state.setAllModalVisible &&
                    <CreditSetAllModal
                        credit={this.state.setAllCredit}
                        onChange={(value) => this.setState({setAllCredit: value})}
                        onCancel={() => this.setState({setAllModalVisible: false})}
                        onOk={this.submitSetAllCredit()}
                    />
                }
            </div>
        )
    }
}

export default CreditSetList;