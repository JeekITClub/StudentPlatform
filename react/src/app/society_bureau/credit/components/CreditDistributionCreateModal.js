import React from 'react';
import {Modal, Form, Select, InputNumber} from 'antd';
import * as PropTypes from 'prop-types';

class CreditDistributionCreateModal extends React.Component {
    render () {
        return (
            <Modal
                title="创建学分分配"
                visible={this.props.visible}
                onCancel={this.props.onCancel}
            >
                <Form>
                    <Form.Item label="学年">
                        <InputNumber precision={0} min={2019} />
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
                        this.props.bulk && (
                            <Form.Item>
                                <Select>
                                </Select>
                            </Form.Item>
                        )
                    }
                </Form>
            </Modal>
        )
    }
}

CreditDistributionCreateModal.propTypes = {
    bulk: PropTypes.bool,
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
};

export default CreditDistributionCreateModal;