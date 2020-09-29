import * as React from "react";
import AccountStore from "../stores/AccountStore";
import {Link} from 'react-router-dom';
import {Row, Col, Card} from "antd";
import "./logout.scss"

class Logout extends React.Component {
    componentDidMount(): void {
        AccountStore.logout()
    }

    //todo
    render() {
        return (
            <Row className="logout-container" type="flex" justify="space-around" align="middle">
                <Col>
                    <Card title="已注销" bordered={false} style={{width: 300}}>
                        <Link to={''}>返回主页</Link>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default Logout;