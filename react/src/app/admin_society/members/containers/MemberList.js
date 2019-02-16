import React from 'react';

import {Table, Button, Popconfirm, notification} from 'antd'

import Provider from '../../../../utils/provider'

class MemberList extends React.Component {
    state = {
        members: Array(200).fill(null).map((item, index) => {
            return {name: index + 1, grade: 1, class_num: 1, student_id: index + 1}
        }),
        pageNum: 1,
        pageSize: 10
    };

    componentDidMount() {
        Provider.get('/api/society_manage/member/', {
            params: {
                pageNum: this.state.pageNum,
                pageSize: this.state.pageSize
            }
        }).then((res) => {
            this.setState({members: res.data})
        }).catch((err) => {
            console.log(err)
        })
    }

    handleKickMember = (member_id) => {
        Provider.post('/api/society_manage/member/kick', {
            member_id: member_id
        })
            .then((res) => {
                console.log(res.status)
            })
            .catch((err) => {
                console.log(err)
            })
    };

    onPaginationChange = (pagination) => {
        console.log('current', pagination.current);
        console.log('pageSize', pagination.pageSize);
    };

    renderMemberList = () => {
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '年级',
                dataIndex: 'grade',
                key: 'grade'
            },
            {
                title: '班级',
                dataIndex: 'class_num',
                key: 'class_num'
            },
            {
                title: '详情',
                key: 'detail'
            },
            {
                title: '操作',
                key: 'operation',
                dataIndex: 'id',
                render: (text, record) => {
                    return (
                        <Popconfirm placement="topRight"
                                    title={'确认移除该成员？'}
                                    onConfirm={() => this.handleKickMember(record.student_id)}
                                    okText="Yes"
                                    cancelText="No">
                            <Button type="danger">踢出成员</Button>
                        </Popconfirm>
                    )
                }
            }
        ];

        return (
            <Table dataSource={this.state.members}
                   columns={columns}
                   pagination={{showSizeChanger: true}}
                   onChange={this.onPaginationChange} rowKey="student_id"/>
        )
    };

    render() {
        return (
            this.renderMemberList()
        )
    }
}

export default MemberList;