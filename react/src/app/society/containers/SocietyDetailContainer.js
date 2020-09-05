import React from 'react';
import {
  Row, Col, Descriptions, PageHeader, Tag, Card, Empty
} from 'antd';

import '../styles/SocietyDetail.scss';
import SocietyStore from '../stores/SocietyStore';
import { observer } from 'mobx-react';
import { society_type } from '../../../shared/constants';
import SocietyCard from '../components/SocietyCard';

@observer
class SocietyDetailContainer extends React.Component {
  componentDidMount() {
    SocietyStore.fetchDetail(this.props.match.params.id);
  }

  renderTags = () => {
    if (SocietyStore.society.tags) {
      return SocietyStore.society.tags.map((tag, index) => <Tag color={tag.color} key={index}>{tag.content}</Tag>);
    }
    return null;
  };

  render() {
    return (
      <div>
        <Row>
          <Col className="society-detail-container">
            <PageHeader
              ghost={false}
              title={SocietyStore.society.name}
              tags={<div>{this.renderTags()}</div>}
            >
              <Descriptions column={3}>
                <Descriptions.Item
                  label="社团 ID">{SocietyStore.society.society_id}</Descriptions.Item>
                <Descriptions.Item
                  label="社团类型">{society_type[SocietyStore.society.type]}</Descriptions.Item>
                <Descriptions.Item label="邮箱">{SocietyStore.society.email}</Descriptions.Item>
                <Descriptions.Item
                  label="社团介绍">{SocietyStore.society.introduction}</Descriptions.Item>
              </Descriptions>
            </PageHeader>
          </Col>
          <Col>
            <Card title="社长信息" bordered={false} className="society-detail-card">
              <Descriptions>
                <Descriptions.Item
                  label="姓名">{SocietyStore.society.president_name}</Descriptions.Item>
                <Descriptions.Item
                  label="年级">{SocietyStore.society.president_grade}</Descriptions.Item>
                <Descriptions.Item
                  label="班级">{SocietyStore.society.president_class}</Descriptions.Item>
                <Descriptions.Item
                  label="手机">{SocietyStore.society.president_phone}</Descriptions.Item>
                <Descriptions.Item
                  label="QQ/微信">{SocietyStore.society.president_qq}</Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          <Col>
            <Card title="招新信息" bordered={false} className="society-detail-card">
              <Descriptions column={2}>
                <Descriptions.Item
                  label="招新QQ群">{SocietyStore.society.recruit_qq_group}</Descriptions.Item>
                <Descriptions.Item
                  label="是否招新">{SocietyStore.society.recruit ? '是' : '否'}</Descriptions.Item>
                <Descriptions.Item
                  label="成就">{SocietyStore.society.achievements}</Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          <Col>
            <Card title="活动信息" bordered={false} className="society-detail-card">
              <Descriptions>
                <Descriptions.Item
                  label="活动时间">{SocietyStore.society.activity_time}</Descriptions.Item>
                <Descriptions.Item
                  label="活动场地">{SocietyStore.society.activity_place}</Descriptions.Item>
                <Descriptions.Item
                  label="特殊教室或需求">{SocietyStore.society.special_room}</Descriptions.Item>
                <Descriptions.Item label="特殊教室或需求">{SocietyStore.society.mentor}</Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SocietyDetailContainer;
