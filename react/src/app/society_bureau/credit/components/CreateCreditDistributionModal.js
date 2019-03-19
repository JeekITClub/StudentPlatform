import React from 'react';
import * as PropTypes from 'prop-types'
import {Modal, Form, InputNumber, Select} from 'antd';
import YearSemesterSelect from "../../../../shared/YearSemesterSelect/YearSemesterSelect";

const { Option } = Select;

class CreateCreditDistributionModal extends React.Component {
    state = {
        year: null,
        semester: null,
    };
    
    render() {
        return (
            <Modal
                onOk={}
                okText="提交"
                onCancel="取消"
            >
                <Form>
                    <Form.Item label="学年与学期">
                        <YearSemesterSelect searchButtonVisible={false} />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

CreateCreditDistributionModal.propTypes = {
    bulk: PropTypes.bool,
};

export default CreateCreditDistributionModal;