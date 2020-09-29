import React from 'react';
import {observer} from 'mobx-react';
import {Empty, Row, Col, List, Avatar, Spin} from "antd";
import {Link} from 'react-router-dom';

import SocietyCard from "../components/SocietyCard";
import SocietySearch from "../components/SocietySearch";
import TagContainer from '../components/TagContainer';
import SocietyStore from "../stores/SocietyStore";
import '../styles/SocietyList.scss'


@observer
class SocietyList extends React.Component {
  componentDidMount() {
    SocietyStore.fetch()
  }

  renderCardList = () => {
    if (SocietyStore.societies.length !== 0) {
      return (
        <Row gutter={16} type="flex" justify="start">
          {
            SocietyStore.societies.map((society) => {
              return (
                <Col lg={6} xs={12} key={society.id}>
                  <SocietyCard
                    society={society}
                  />
                </Col>
              )
            })
          }
        </Row>
      )
    }
    return <Empty description="社团们不见了"/>
  };

  renderListItem = (item) => (
    <List.Item
      key={item.id}>
      <List.Item.Meta
        avatar={<img alt="暂无封面"/>}
        title={<Link to={`/society/${item.id}/`}>{item.name}</Link>}
        // description={<TagContainer tags={item.tags}/>}
      />
    </List.Item>
  );

  render() {
    return (
      <>
        <Row type="flex" justify="space-around">
          <Col xxl={8} xl={8} lg={16} md={16} sm={24} xs={24}>
            <SocietySearch/>
          </Col>
        </Row>
        <Row type="flex" className="society-list-container">
          <Col xxl={24} xl={24} lg={24} md={24} sm={0} xs={0} className="society-list-body">
            {SocietyStore.loading ? <Spin/> : this.renderCardList()}
          </Col>
          <Col xxl={0} xl={0} lg={0} md={0} sm={24} xs={24} className="society-list-body">
            <List
              bordered={true}
              itemLayout="vertical"
              dataSource={SocietyStore.societies}
              renderItem={this.renderListItem}
            />
          </Col>
        </Row>
      </>
    )
  }
}

export default SocietyList;
