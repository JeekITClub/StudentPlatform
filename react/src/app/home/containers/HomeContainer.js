import React from 'react';
import {Link} from 'react-router-dom';
import {Menu} from "antd";

import '../styles/Home.scss'


class HomeContainer extends React.Component {
    render() {
        return (
            <div>
                <div className="landing-container">
                    <Menu mode="horizontal">
                        <Menu.Item>
                            <Link to={'/'}>JPSP</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={'/'}>首页</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={'/society'}>社团</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={'/activity'}>活动</Link>
                        </Menu.Item>
                    </Menu>
                </div>
            </div>
        )
    }
}

export default HomeContainer;