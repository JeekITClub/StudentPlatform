import React from 'react';
import {Button, Tooltip, Popconfirm, Form, Divider} from 'antd';
import {observer} from 'mobx-react'
import CreditDistributionList from "../components/CreditDistributionList";
import CreditDistributionCreateModal from '../components/CreditDistributionCreateModal';
import CreditSetAllModal from '../components/CreditSetAllModal'
import YearSemesterSelect from '../../../../shared/YearSemesterSelect'
import CreditStore from '../stores/CreditStore'

import Provider from '../../../../utils/provider'

@observer
class CreditContainer extends React.Component {
    state = {
        setAllModalVisible: false,
        createCDModalVisible: false,
        setAllCredit: 1
    };

    submitSetAllCredit = () => {
        Provider.post()
    };

    handleSearchButtonOnClick = () => {
        CreditStore.fetch({
            pageNum: CreditStore.pageNum,
            pageSize: CreditStore.pageSize,
            year: CreditStore.year,
            semester: CreditStore.semester
        })
    };

    handleBulkCloseCreditDistribution = () => {
        CreditStore.bulkCloseCD()
    };

    showCreateModal = () => {
        this.setState({ createCDModalVisible: true })
    };

    render() {
        return (
            <>
                <Form layout="inline">
                    <Form.Item>
                        <Button onClick={() => this.showCreateModal()}>新建学分分配</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button>批量创建学分分配</Button>
                    </Form.Item>
                </Form>
                <Divider/>
                <YearSemesterSelect
                    year={CreditStore.year}
                    semester={CreditStore.semester}
                    yearOnChange={(value) => {
                        CreditStore.year = value
                    }}
                    semesterOnChange={(value) => {
                        CreditStore.semester = value
                    }}
                    searchButtonOnClick={this.handleSearchButtonOnClick}
                />
                <Tooltip
                    title={(CreditStore.year && CreditStore.semester) ? "" : "未选择学年和学期时不可用"}
                    placement="bottom"
                >
                    <Button onClick={() => this.setState({ setAllModalVisible: true })}
                            disabled={!(CreditStore.year && CreditStore.semester)}>
                        一键全部设置获得学分人数
                    </Button>
                </Tooltip>
                <Tooltip
                    title={(CreditStore.year && CreditStore.semester) ? "" : "未选择学年和学期时不可用"}
                    placement="bottom"
                >
                    <Popconfirm title="确定？" okText="是" cancelText="否"
                                onOK={() => this.handleBulkCloseCreditDistribution}
                    >
                        <Button
                            style={{ 'marginLeft': '10px' }}
                            disabled={!(CreditStore.year && CreditStore.semester)}
                        >
                            一键关闭社长分配学分通道
                        </Button>
                    </Popconfirm>
                </Tooltip>
                <CreditDistributionList/>
                {
                    this.state.setAllModalVisible &&
                    <CreditSetAllModal
                        credit={this.state.setAllCredit}
                        onChange={(value) => this.setState({ setAllCredit: value })}
                        onCancel={() => this.setState({ setAllModalVisible: false })}
                        onOk={() => this.submitSetAllCredit()}
                    />
                }
                <CreditDistributionCreateModal
                    visible={this.state.createCDModalVisible}
                    onCancel={()=> this.setState({createCDModalVisible: false})}
                />
            </>
        )
    }
}

export default CreditContainer;
