import React from 'react';
import * as PropTypes from 'prop-types'
import {Modal, Form, InputNumber, Select} from 'antd';

const { Option } = Select;

class CreateCreditDistributionModal extends React.Component {
    render() {
        return (
            <Modal
                onOk={}
                okText="提交"
                onCancel="取消"
            >
                <Form>
                    <Form.Item>
                        <Select>
                            <Option/>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

CreateCreditDistributionModal.propTypes = {
    bulk: PropTypes.bool
};

export default CreateCreditDistributionModal;