import {Component} from "react";
import {Modal, Form, InputNumber} from "antd";
import React from "react";
import * as PropTypes from "prop-types";

class CreditSetAllModal extends Component {
    render() {
        return (
            <Modal
                visible
                onCancel={this.props.onCancel}
                onOk={this.props.onOk}
                okText="一键设置！"
                cancelText="算了，下次吧"
            >
                <Form>
                    <Form.Item label="可获得学分的成员人数最大值">
                        <InputNumber
                            value={this.props.credit}
                            onChange={(value) => this.props.onChange(value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

CreditSetAllModal.propTypes = {
    visible: PropTypes.func,
    onCancel: PropTypes.func
};

export default CreditSetAllModal;