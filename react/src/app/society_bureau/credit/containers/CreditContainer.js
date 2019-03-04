import React from 'react';
import {Button} from 'antd';
import {observer} from 'mobx-react'
import CreditDistributionList from "../components/CreditDistributionList";
import CreditSetAllModal from '../components/CreditSetAllModal'
import YearSemesterSelect from '../../../../shared/YearSemesterSelect/YearSemesterSelect'
import CreditStore from '../stores/CreditStore'

import Provider from '../../../../utils/provider'

@observer
class CreditContainer extends React.Component {
    state = {
        setAllModalVisible: false,
        setAllCredit: 1,
        year: null,
        semester: null
    };

    submitSetAllCredit = () => {
        Provider.post()
    };

    handleSearchButtonOnClick = () => {
        CreditStore.fetch({
            pageNum: CreditStore.pageNum,
            pageSize: CreditStore.pageSize,
            year: CreditStore.year,
            semester:CreditStore.semester
        })
    };

    render() {
        return (
            <>
                <YearSemesterSelect
                    year={CreditStore.year}
                    semester={CreditStore.semester}
                    yearOnChange={(value) => {CreditStore.year = value}}
                    semesterOnChange={(value) => {CreditStore.semester = value}}
                    searchButtonOnClick={this.handleSearchButtonOnClick}
                />
                <Button onClick={() => this.setState({setAllModalVisible: true})}>
                    一键全部设置获得学分人数
                </Button>
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
            </>
        )
    }
}

export default CreditContainer;
