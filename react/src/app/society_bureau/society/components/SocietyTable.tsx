import React from 'react';
import {Table, Tooltip, Button, notification, Divider} from 'antd';
import { ColumnProps } from 'antd/es/table';
import { PaginationProps } from 'antd/es/pagination/Pagination';
import Provider from '../../../../utils/provider'
import SocietyDetailModal from "./SocietyDetailModal";
import { AxiosResponse, AxiosError } from 'axios';

interface Society {
    id: number,
    society_id: number,
    president_name: string,
    president_class: number
}


class SocietyTable extends React.Component {
    state = {
        societies: [],
        count: 0,
        editingSocietyId: 0,
        inspectModalVisible: false,
        modifyModalVisible: false
    };

    getSocieties = (pageNum: Number, pageSize: Number) => {
        Provider.get('/api/manage/society/', {
            params: {
                page: pageNum,
                page_size: pageSize
            }
        }).then((res: AxiosResponse) => {
            this.setState({societies: res.data['results'], count: res.data['count']});
        }).catch((err: AxiosError) => {
            notification.error({
                message: 'Oops...',
                description: '获取社团列表失败了，请检查你的网络',
            });
        })
    };

    handleInspectButtonClick = (row: Society) => {
        this.setState({inspectModalVisible: true, editingSocietyId: row.id});
    };

    handleModifyButtonClick = (row: Society) => {
        this.setState({modifyModalVisible: true, editingSocietyId: row.id});
    };

    handleCloseModal = () => {
        this.setState({inspectModalVisible: false, modifyModalVisible: false})
    };

    renderPresidentTooltip = (president_name: string, index: number) => {
        const row = this.state.societies[index];
        return (
            <Tooltip title={`${row.president_grade}级 ${row.president_class}班 ${row.president_name}`}>
                {president_name}
            </Tooltip>
        )
    };

    renderInspectButton = (index: Society) => {
        return (
            <span>
              <a href="javascript:;" onClick={() => this.handleInspectButtonClick(index)}>详细</a>
              <Divider type="vertical"/>
              <a href="javascript:;" onClick={() => this.handleModifyButtonClick(index)}>修改</a>
            </span>
        )
    };

    onPaginationChange = (pagination: PaginationProps) => {
        this.getSocieties(pagination.current, pagination.pageSize);
    };

    componentDidMount() {
        this.getSocieties(1, 10)
    }

    render() {
        const columns: ColumnProps<Society>[] = [
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
                render: (text: Society["president_name"], _: any, index: number) => this.renderPresidentTooltip(text, index)
            },
            {
                title: '操作',
                key: 'inspect',
                render: (row: any) => this.renderInspectButton(row)
            }
        ];

        return (
            <div>
                <Table columns={columns}
                       dataSource={this.state.societies}
                       pagination={{
                           showSizeChanger: true,
                           total: this.state.count
                       }}
                       onChange={this.onPaginationChange}
                       rowKey="id"/>
                {
                    this.state.inspectModalVisible &&
                    <SocietyDetailModal
                    societyId={this.state.editingSocietyId}
                    closeModal={() => this.handleCloseModal()}/>
                }
                {
                    this.state.modifyModalVisible &&
                    <SocietyDetailModal 
                    societyId={this.state.editingSocietyId}
                    closeModal={() => this.handleCloseModal()}
                    />
                }
            </div>
        )
    }
}

export default SocietyTable;