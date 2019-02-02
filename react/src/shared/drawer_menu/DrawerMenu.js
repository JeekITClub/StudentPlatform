import React from 'react';
import {Drawer, Affix, Icon, Row, Col} from 'antd';

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
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.visible}>
                    {this.props.children}
                </Drawer>
                <Row>
                    <Col lg={0} xl={0} xxl={0}>
                        <Affix offsetTop={30} className="society-bureau-drawer-handle">
                            <div className="society-bureau-drawer-handle-container" onClick={this.showDrawer}><Icon
                                type="menu-unfold"/></div>
                        </Affix>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DrawerMenu;