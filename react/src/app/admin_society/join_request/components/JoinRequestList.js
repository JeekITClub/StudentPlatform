import React from 'react';

import {Table} from 'antd';

import Provider from '../../../../utils/provider'

class JoinRequestList extends React.Component {
    componentDidMount() {
        Provider.get('/api/society_manage/join_request/')
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render () {
        const columns = [
            {

            }
        ];

        return (
            <Table columns={columns} rowKey="id" />
        )
    }
}

export default JoinRequestList;