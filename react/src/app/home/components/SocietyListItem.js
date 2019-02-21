import React from 'react';
import {List, Badge, Button, Divider, Popover, Modal, notification} from "antd";
import {Link} from "react-router-dom";

import {SocietyStatus} from '../../../shared/constants';
import Provider from "../../../utils/provider";


class SocietyListItem extends React.Component {
    state = {
        modalVisible: false,
    };

    showModal = () => {
        this.setState({
            modalVisible: true,
        });
    };

    hideModal = () => {
        this.setState({
            modalVisible: false,
        });
    };

    renderStatusBadge = () => {
        if (this.props.society.status === SocietyStatus.ACTIVE) {
            return <Badge status="success"/>
        } else {
            return <Badge status="error"/>
        }
    };

    renderPresidentInfo = () => {
        const society = this.props.society;
        return (
            <div>
                <span>社长</span>
                <Divider type="vertical"/>
                <span>{society.president_name}</span>
                <Divider type="vertical"/>
                <span>{society.president_grade}级</span>
                <Divider type="vertical"/>
                <span>{society.president_class}班</span>
            </div>
        )
    };

    renderSocietyLink = () => {
        const society = this.props.society;
        return <Link to={`society/${society.id}/`}>{society.society_id} {society.name}</Link>;
    };

    quitSociety = () => {
        return Provider.post(`/api/society/${this.props.society.id}/quit/`)
            .then((res) => {
                notification.success({
                    message: '成功',
                    description: '成功退出该社团，社长将收到你的退社消息！',
                });
                this.props.refresh();
                this.hideModal();
            }).catch((err) => {
                notification.error({
                    message: 'Oops...',
                    description: '退出社团失败了，请检查你的网络',
                });
                this.hideModal();
            })
    };

    render() {
        const society = this.props.society;
        const listItem = (
            <List.Item key={this.props.society.id}
                       actions={[<Button type="danger" onClick={this.showModal}>退出</Button>]}>
                <List.Item.Meta
                    avatar={this.renderStatusBadge()}
                    title={this.renderSocietyLink()}
                    description={this.renderPresidentInfo()}
                />
                <Modal
                    title="确认要退出该社团吗？"
                    visible={this.state.modalVisible}
                    onOk={this.quitSociety}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消">
                    <p>确定要退出<strong>{society.society_id}-{society.name}</strong>?</p>
                    <p>若退出，当前学期你将无法从该社获得学分，已获得的学分不会受到影响。</p>
                    <p>仅社长会收到你的退出消息。</p>
                </Modal>
            </List.Item>
        );
        return (
            society.status === SocietyStatus.ACTIVE ? listItem
                : <Popover content={<p>该社团已解散，当前退出不会造成任何影响。</p>} title="提示">
                    {listItem}
                </Popover>
        )
    }
}

export default SocietyListItem;