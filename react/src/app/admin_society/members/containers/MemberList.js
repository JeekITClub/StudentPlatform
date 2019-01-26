import React from 'react';

import { Link } from 'react-router-dom';
import { Empty, Table } from 'antd'

const { Column } = Table;

class MemberList extends React.Component {
    state = {
        members: [{name: '123', grade: '1', class_num: '1', student_id: 1}]
    };

    renderMemberList = () => {
        return (
            <Table dataSource={this.state.members}>
                <Column title="姓名" dataIndex="name" key="name" />
                <Column title="年级" dataIndex="grade" key="grade" />
                <Column title="班级" dataIndex="class_num" key="class_num" />
                <Column title="详情" dataIndex="student_id" key="detail" render={
                    student_id => (
                       <Link to={`/admin_society/member/${student_id}/`}>{student_id}</Link>
                    )
                } />
            </Table>
        )
    };

    render () {
      return (
          this.state.members.length === 0 ? <Empty /> : this.renderMemberList()
      )
    }
}

export default MemberList;