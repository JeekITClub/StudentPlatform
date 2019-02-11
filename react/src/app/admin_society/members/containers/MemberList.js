import React from 'react';

import {Table, Button} from 'antd'

import Provider from '../../../../utils/provider'

class MemberList extends React.Component {
    state = {
        members: [{name: '2', grade: 1, class_num: 1, student_id: 233}]
    };

    componentDidMount() {
        Provider.get('/api/society_manage/member/')
            .then((res) => {
                this.setState({members: res.data})
            })
            .catch((err) => {
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
                render: (text) => {
                    return (<Button onClick={() => this.handleKickMember(text)}>踢出成员</Button>)
                }
            }
        ];

        return (
            <Table dataSource={this.state.members} columns={columns} rowKey="student_id"/>
        )
    };

    render() {
        return (
            this.renderMemberList()
        )
    }
}

export default MemberList;