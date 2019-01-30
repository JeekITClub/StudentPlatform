import React from 'react';
import {Drawer, Affix, Button, Row, Col} from 'antd';

class DrawerMenu extends React.Component {
    state = {visible: false};

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Drawer
                    title="Basic Drawer"
                    placement="left"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
                <Row>
                    <Col lg={0} xl={0} xxl={0}>
                        <Affix offsetTop={70} className="drawer-handle">
                            <Button type="primary" onClick={this.showDrawer}>Affix top</Button>
                        </Affix>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DrawerMenu;