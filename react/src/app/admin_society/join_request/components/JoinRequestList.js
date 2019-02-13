import React from 'react';

import {Table, Button} from 'antd';

import Provider from '../../../../utils/provider'

class JoinRequestList extends React.Component {
    state = {
        join_requests: [
            {
                id: 1,
                member: {
                    grade: 1,
                    class_num: 1,
                    name: 'ncj'
                }
            }
        ]
    };

    componentDidMount() {
        Provider.get('/api/society_manage/join_request/')
            .then((res) => {
                this.setState({join_request: res.data})
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render () {
        const columns = [
            {
                title: '申请加入者信息',
                dataIndex: 'member',
                key: 'member_information',
                render: (item) => {
                    return `${item.grade}-${item.class_num}`
                }
            },
            {
                title: '操作',
                render: () => {
                    return (
                        <Button htmlType="button">按钮</Button>
                    )
                }
            }
        ];

        return (
            <Table columns={columns} rowKey="id" dataSource={this.state.join_requests}/>
        )
    }
}

export default JoinRequestList;