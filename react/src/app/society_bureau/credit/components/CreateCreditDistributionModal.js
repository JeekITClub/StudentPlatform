import React from 'react';
import * as PropTypes from 'prop-types'
import {Modal, Form, InputNumber, Select} from 'antd';
import YearSemesterSelect from "../../../../shared/YearSemesterSelect/YearSemesterSelect";
import Provider from "../../../../utils/provider";

const { Option } = Select;

class CreateCreditDistributionModal extends React.Component {
    componentDidMount() {
        Provider.get('/api/society/')
            .then((res) => {
                this.setState({societies: res.data})
            })
            .catch((err) => {

            })
    }

    state = {
        year: null,
        semester: null,
        societies: []
    };

    render() {
        return (
            <Modal
                okText="提交"
                cancelText="取消"
                visible={this.props.visible}
                onCancel={this.props.onCancel}
            >
                <Form>
                    <Form.Item label="学年与学期">
                        <YearSemesterSelect searchButtonVisible={false}/>
                    </Form.Item>
                    {!this.props.bulk && '社团选择'}
                </Form>
            </Modal>
        )
    }
}

CreateCreditDistributionModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    bulk: PropTypes.bool,
    onCancel: PropTypes.func.isRequired
};

CreateCreditDistributionModal.defaultProps = {
    bulk: false,
};

export default CreateCreditDistributionModal;