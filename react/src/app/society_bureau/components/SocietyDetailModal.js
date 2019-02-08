import React from 'react';
import {Modal, Spin, Form} from 'antd';
import PropTypes from 'prop-types';

import Provider from '../../../utils/provider'

const {Item} = Form;

class SocietyDetailModal extends React.Component {
    state = {
        loading: true,
        society: {}
    };

    componentDidMount() {
        this.setState({loading: true});
        Provider.get('')
            .then((res) => {
                this.setState({loading: false, society: res.data});
            })
            .catch((e) => {
                this.setState({loading: false});
                console.log(e)
            })
    }

    renderDetailModal = () => {
        return (
            <Modal
                title="社团详情"
                visible={true}
                onCancel={() => this.props.closeModal()}
            >
                <Form>
                    <Item>
                        233
                    </Item>
                </Form>
            </Modal>
        )
    };


    render() {
        return (
            <div>
                {
                    this.state.loading
                        ? <Spin/>
                        : this.renderDetailModal()
                }
            </div>
        )
    }
}

SocietyDetailModal.propTypes = {
    society_id: PropTypes.number
};

export default SocietyDetailModal;