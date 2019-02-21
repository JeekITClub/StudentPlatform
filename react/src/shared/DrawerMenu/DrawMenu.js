import React from 'react';
import {Drawer, Affix, Icon, Row, Col} from 'antd';
import PropTypes from 'prop-types';

import '../styles/DrawerMenu.scss';

class DrawerMenu extends React.Component {
    render() {
        const drawerHandle = (
            <Row>
                <Col lg={0} xl={0} xxl={0}>
                    <Affix offsetTop={30} className="drawer-handle">
                        <div className="drawer-handle-container" onClick={() => this.props.toggle()}>
                            <Icon type="menu-unfold" />
                        </div>
                    </Affix>
                </Col>
            </Row>
        );
        return (
            <div>
                <Drawer
                    title={this.props.title}
                    placement="left"
                    closable={true}
                    onClose={() => this.props.toggle()}
                    visible={this.props.drawerMenuVisible}
                    className={this.props.className}
                >
                    {this.props.children}
                </Drawer>
                {this.props.handleVisible ? drawerHandle : null}
            </div>
        )
    }
}

DrawerMenu.propTypes = {
    title: PropTypes.string.isRequired,
    toggle: PropTypes.func.isRequired,
    drawerMenuVisible: PropTypes.bool.isRequired,
    handleVisible: PropTypes.bool.isRequired
};

export default DrawerMenu;