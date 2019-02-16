import React from 'react';
import {Table, Tooltip, Button, Modal} from 'antd';

import Provider from '../../../utils/provider'
import SocietyDetailModal from "./SocietyDetailModal";

class SocietyTable extends React.Component {
    state = {
        societies: [{'society_id': 303, 'name': 'jeek', 'president_name': 'ncj'}],
        editingSocietyId: 0,
        modalVisible: false
    };

    getSocieties = (pageNum, pageSize) => {
        Provider.get('/api/manage/society/', {
            params: {
                pageNum: pageNum,
                pageSize: pageSize
            }
        }).then((res) => {
            this.setState({societies: res.data})
        }).catch((err) => {
            console.log(err)
        })
    };


    handleInspectButtonClick = (row) => {
        this.setState({modalVisible: true, editingSocietyId: row.society_id});
    };

    handleCloseModal = () => {
        this.setState({modalVisible: false})
    };

    renderPresidentTooltip = (president_name, index) => {
        const row = this.state.societies[index];
        return (
            <Tooltip title={`${row.president_grade}${row.president_class}${row.president_name}`}>
                {president_name}
            </Tooltip>
        )
    };

    renderInspectButton = (index) => {
        return (
            <Button type="primary" onClick={() => this.handleInspectButtonClick(index)} htmlType="button">查看</Button>
        )
    };

    onPaginationChange = (pagination) => {
        this.getSocieties(pagination.current, pagination.pageSize);
    };

    componentDidMount() {
        this.getSocieties(1, 10)
    }

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
                render: (row) => this.renderInspectButton(row)
            }
        ];


        return (
            <div>
                <Table rowKey="society_id"
                       columns={columns}
                       dataSource={this.state.societies}
                       pagination={{showSizeChanger: true}}
                       onChange={this.onPaginationChange}/>
                {
                    this.state.modalVisible &&
                    <SocietyDetailModal society_id={this.state.editingSocietyId}
                                        closeModal={() => this.handleCloseModal()}/>
                }
            </div>
        )
    }
}

export default SocietyTable;