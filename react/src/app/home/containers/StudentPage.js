import React from 'react';
import {Row, Col, Tabs} from 'antd';

import StudentProfile from '../components/StudentProfile';
import StudentSociety from '../components/StudentSociety';
import NotAuthorized from "../../../shared/NotAuthorized/NotAuthorized";

import AccountStore from "../../../shared/stores/AccountStore";

const TabPane = Tabs.TabPane;

class StudentPage extends React.Component {
    render() {
        return (
            AccountStore.is_student ?
                <Row className="mt-5">
                    <Col span={20}>
                        <Tabs
                            defaultActiveKey="1"
                            tabPosition="left"
                             className="ml-4"
                        >
                            <TabPane tab="个人信息" key="1">
                                <StudentProfile/>
                            </TabPane>
                            <TabPane tab="我的社团" key="2">
                                <StudentSociety/>
                            </TabPane>
                            <TabPane tab="我的学分" key="3">我的学分</TabPane>
                        </Tabs>
                    </Col>
                </Row>
                : <NotAuthorized/>
        )
    }
}

export default StudentPage;