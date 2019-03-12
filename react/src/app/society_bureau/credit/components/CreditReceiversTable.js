import React from 'react';
import * as PropTypes from 'prop-types';
import {Table} from 'antd';

class CreditReceiversTable extends React.Component {
    render() {
        const columns = [{
            title: '届数',
            key: 'grade',
            dataIndex: 'grade'
        }, {
            title: '班级',
            key: 'class_num',
            dataIndex: 'class_num'
        }, {
            title: '姓名',
            key: 'name',
            dataIndex: 'name'
        }];

        return (
            <Table
                columns={columns}
                dataSource={this.props.data}
                rowKey='id'
                pagination={false}
            />
        )
    }
}

CreditReceiversTable.propTypes = {
    data: PropTypes.array
};

export default CreditReceiversTable;