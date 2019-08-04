import React from 'react';
import {Modal, Form, Select, InputNumber, Divider, Button} from 'antd';
import * as PropTypes from 'prop-types';
import CreditStore from "../stores/CreditStore";

class CreditDistributionCreateModal extends React.Component {
    state = {
        societies: [],
        selectedSocietiesIds: []
    };

    componentDidMount() {
        CreditStore.fetchActiveSocieties()
            .then((res) => {
                this.setState({ societies: res.data })
            })
            .catch((err) => {
                throw err
            })
    }

    handleSelectAll = () => {
        console.log(this.state.selectedSocietiesIds);
        this.setState({
            selectedSocietiesIds: this.state.societies.map((society) => {
                return society.id
            })
        });
    };

    handleClear = () => {
        this.setState({ selectedSocietiesIds: [] })
    };

    render() {
        return (
            <Modal
                title="创建学分分配"
                visible={this.props.visible}
                onCancel={this.props.onCancel}
            >
                <Form>
                    <Form.Item label="学年">
                        <InputNumber precision={0} min={2019} style={{ 'width': '100%' }}/>
                    </Form.Item>
                    <Form.Item label="学期">
                        <Select>
                            <Select.Option value="1">
                                第一学期
                            </Select.Option>
                            <Select.Option value="2">
                                第二学期
                            </Select.Option>
                        </Select>
                    </Form.Item>
                    {
                        !this.props.bulk &&
                        <Form.Item label="选择社团">
                            <Select
                                mode="multiple"
                                value={this.state.selectedSocietiesIds}
                                onChange={(value) => {
                                    this.setState({ selectedSocietiesIds: value })
                                }}
                            >
                                {
                                    this.state.societies.map((society) => (
                                        <Select.Option value={society.id}
                                                       key={society.id}>{society.id} - {society.name}</Select.Option>
                                    ))
                                }
                            </Select>

                        </Form.Item>
                    }
                </Form>
            </Modal>
        )
    }
}

CreditDistributionCreateModal.propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    bulk: PropTypes.bool,
};

export default CreditDistributionCreateModal;