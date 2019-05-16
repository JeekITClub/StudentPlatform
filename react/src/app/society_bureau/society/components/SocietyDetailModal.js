import React from 'react';
import {
    Modal,
    Spin,
    Form,
    Input,
    Divider,
    Col,
    Switch,
    notification
} from 'antd';
import PropTypes from 'prop-types';

import Provider from '../../../../utils/provider'

const {Item} = Form;
const {TextArea} = Input;
const InputGroup = Input.Group;


class SocietyDetailModal extends React.Component {
    state = {
        loading: true,
        society: {}
    };

    componentDidMount() {
        this.setState({loading: true});
        Provider.get(`/api/manage/society/${this.props.societyId}/`)
            .then((res) => {
                this.setState({loading: false, society: res.data});
            })
            .catch((e) => {
                this.setState({loading: false});
                console.log(e);
                notification.error({
                    message: 'Oops...',
                    description: '获取社团信息失败了，请检查你的网络',
                });
            })
    }

    renderDetailModal = () => {
        const society = this.state.society;

        return (
            <Modal
                title="社团详情"
                visible={true}
                width={700}
                cancelText="取消"
                okText="确定"
                onCancel={() => this.props.closeModal()}
                onOk={() => this.props.closeModal()}
            >
                {
                    this.state.loading
                        ? <Spin/> :
                        <Form layout="vertical">
                            <InputGroup>
                                <Col span={24}>
                                    <Item label="负责干事">
                                        <Input defaultValue={society.assistant}/>
                                    </Item>
                                </Col>
                            </InputGroup>
                            <Divider>基本信息</Divider>
                            <InputGroup>
                                <Col span={6}>
                                    <Item label="ID">
                                        <Input defaultValue={society.society_id}/>
                                    </Item>
                                </Col>
                                <Col span={6}>
                                    <Item label="类型">
                                        <Input defaultValue={society.type}/>
                                    </Item>
                                </Col>
                                <Col span={12}>
                                    <Item label="名称">
                                        <Input defaultValue={society.name}/>
                                    </Item>
                                </Col>
                            </InputGroup>
                            <Item label="邮箱">
                                <Input defaultValue={society.email}/>
                            </Item>
                            <Item label="介绍">
                                <TextArea defaultValue={society.introduction}/>
                            </Item>
                            <Divider>社长信息</Divider>
                            <InputGroup>
                                <Col span={12}>
                                    <Item label="姓名">
                                        <Input defaultValue={society.president_name}/>
                                    </Item>
                                </Col>
                                <Col span={12}>
                                    <Item label="QQ">
                                        <Input defaultValue={society.president_qq}/>
                                    </Item>
                                </Col>
                                <Col span={8}>
                                    <Item label="年级">
                                        <Input defaultValue={society.president_grade}/>
                                    </Item>
                                </Col>
                                <Col span={8}>
                                    <Item label="班级">
                                        <Input defaultValue={society.president_class}/>
                                    </Item>
                                </Col>
                                <Col span={8}>
                                    <Item label="手机">
                                        <Input defaultValue={society.president_phone}/>
                                    </Item>
                                </Col>
                            </InputGroup>
                            <Divider>招新信息</Divider>
                            <InputGroup>
                                <Col span={12}>
                                    <Item label="招新QQ群">
                                        <Input defaultValue={society.recruit_qq_group}/>
                                    </Item>
                                </Col>
                                <Col span={2}/>
                                <Col span={10}>
                                    <Item label="是否招新">
                                        <Switch checked={society.recruit}/>
                                    </Item>
                                </Col>
                            </InputGroup>
                            <Item label="成就">
                                <TextArea defaultValue={society.achievements}/>
                            </Item>
                            <Divider>活动信息</Divider>
                            <InputGroup>
                                <Col span={12}>
                                    <Item label="指导老师">
                                        <Input defaultValue={society.mentor}/>
                                    </Item>
                                </Col>
                                <Col span={12}>
                                    <Item label="活动时间">
                                        <Input defaultValue={society.activity_time}/>
                                    </Item>
                                </Col>
                                <Col span={12}>
                                    <Item label="活动地点">
                                        <Input defaultValue={society.activity_place}/>
                                    </Item>
                                </Col>
                                <Col span={12}>
                                    <Item label="特殊教室">
                                        <Input defaultValue={society.special_room}/>
                                    </Item>
                                </Col>
                            </InputGroup>
                        </Form>
                }
            </Modal>
        )
    };


    render() {
        return (
            <div>
                {this.renderDetailModal()}
            </div>
        )
    }
}

SocietyDetailModal.propTypes = {
    societyId: PropTypes.number
};

export default SocietyDetailModal;