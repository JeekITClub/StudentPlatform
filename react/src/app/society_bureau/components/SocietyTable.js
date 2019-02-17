import React from 'react';
import {Table, Tooltip, Button, notification} from 'antd';

import Provider from '../../../utils/provider'
import SocietyDetailModal from "./SocietyDetailModal";

class SocietyTable extends React.Component {
    state = {
        societies: [],
        editingSocietyId: 0,
        modalVisible: false
    };

    getSocieties = (pageNum, pageSize) => {
        Provider.get('/api/manage/society/', {
            params: {
                page: pageNum,
                page_size: pageSize
            }
        }).then((res) => {
            this.setState({societies: res.data['results']});
        }).catch((err) => {
            notification.error({
                message: 'Oops...',
                description: '获取社团列表失败了，请检查你的网络',
            });
        })
    };

    handleInspectButtonClick = (row) => {
        this.setState({modalVisible: true, editingSocietyId: row.id});
    };

    handleCloseModal = () => {
        this.setState({modalVisible: false})
    };

    renderPresidentTooltip = (president_name, index) => {
        const row = this.state.societies[index];
        return (
            <Tooltip title={`${row.president_grade}级 ${row.president_class}班 ${row.president_name}`}>
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
                <Table columns={columns}
                       dataSource={this.state.societies}
                       pagination={{showSizeChanger: true}}
                       onChange={this.onPaginationChange}
                       rowKey="id"/>
                {
                    this.state.modalVisible &&
                    <SocietyDetailModal societyId={this.state.editingSocietyId}
                                        closeModal={() => this.handleCloseModal()}/>
                }
            </div>
        )
    }
}

export default SocietyTable;