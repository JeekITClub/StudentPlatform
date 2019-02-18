import React from 'react';
import {List, Badge, Button, Modal, notification, Divider, Popover} from "antd";
import {Link} from "react-router-dom";

import Provider from "../../../utils/provider";
import {SocietyStatus} from '../../../shared/constants';

const confirm = Modal.confirm;

class SocietyListItem extends React.Component {
    state = {
        society: this.props.society
    };

    renderStatusBadge = () => {
        if (this.state.society.status === SocietyStatus.ACTIVE) {
            return <Badge status="success"/>
        } else {
            return <Badge status="error"/>
        }
    };

    renderPresidentInfo = () => {
        const society = this.state.society;
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

    quitSociety = () => {
        // TODO
        return Provider.post('/api/student/society/quit/')
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                notification.error({
                    message: 'Oops...',
                    description: '退出社团失败了，请检查你的网络',
                });
            })
    };

    showConfirm = (quitSociety) => {
        confirm({
            title: '确认要退出该社团吗？',
            content: '若退出，当前学期你将无法从该社获得学分，已获得的学分不会受到影响。仅社长会收到你的退出消息。',
            okText: '确认',
            cancelText: '算了',
            onOk() {
                return quitSociety()
            },
            onCancel() {
            },
        });
    };

    render() {
        const society = this.state.society;
        const listItem = (
            <List.Item actions={[<Button type="danger" onClick={() => this.showConfirm(this.quitSociety)}>退出</Button>]}>
                <List.Item.Meta
                    avatar={this.renderStatusBadge()}
                    title={<Link to={`society/${society.id}/`}>{society.society_id} {society.name}</Link>}
                    description={this.renderPresidentInfo()}
                />
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