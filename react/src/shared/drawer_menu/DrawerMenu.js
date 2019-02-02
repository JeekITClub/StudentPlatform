import React from 'react';
import {Drawer, Affix, Icon, Row, Col} from 'antd';

import '../styles/DrawerMenu.scss';

class DrawerMenu extends React.Component {
    state = {drawerVisible: false, handleVisible: true};

    showDrawer = () => {
        this.setState({
            drawerVisible: true,
            handleVisible: false
        });
    };

    onClose = () => {
        this.setState({
            drawerVisible: false,
            handleVisible: true
        });
    };

    render() {
        const drawerHandle = (
            <Row>
                <Col lg={0} xl={0} xxl={0}>
                    <Affix offsetTop={30} className="drawer-handle">
                        <div className="drawer-handle-container" onClick={this.showDrawer}><Icon
                            type="menu-unfold"/></div>
                    </Affix>
                </Col>
            </Row>
        );
        return (
            <div>
                <Drawer
                    title="Basic Drawer"
                    placement="left"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.drawerVisible}>
                    {this.props.children}
                </Drawer>
                {this.state.handleVisible ? drawerHandle : null}
            </div>
        )
    }
}

export default DrawerMenu;