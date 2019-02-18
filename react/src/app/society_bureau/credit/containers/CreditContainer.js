import React from 'react';
import {Button} from 'antd';
import CreditDistributionList from "../components/CreditDistributionList";
import CreditSetAllModal from '../components/CreditSetAllModal'

class CreditContainer extends React.Component {
    state = {
        setAllModalVisible: false,
        setAllCredit: 1,
    };

    submitSetAllCredit = () => {

    };

    render() {
        return (
            <div>
                <Button onClick={() => this.setState({setAllModalVisible: true})}>
                    一键全部设置获得学分人数
                </Button>
                <CreditDistributionList/>
                {
                    this.state.setAllModalVisible &&
                    <CreditSetAllModal
                        credit={this.state.setAllCredit}
                        onChange={(value) => this.setState({setAllCredit: value})}
                        onCancel={() => this.setState({setAllModalVisible: false})}
                        onOk={this.submitSetAllCredit()}
                    />
                }
            </div>
        )
    }
}

export default CreditContainer;