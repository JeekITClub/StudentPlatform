import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Home.scss'

class HomeContainer extends React.Component {
    render() {
        return (
            <div className="container-fluid home-container">
                <ul className="home-header">
                    <div className="left">
                        <li className="nav-item">
                            <Link to={'/'} className="nav-link brand">JPSP</Link>
                        </li>
                    </div>
                    <div className="center">
                        <li className="nav-item">
                            <Link to={'/'} className="nav-link">社团</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/'} className="nav-link">帮助</Link>
                        </li>
                    </div>
                    <div className="right">
                        <li className="nav-item">
                            <Link to={'/'} className="nav-link">登陆</Link>
                        </li>
                    </div>
                </ul>
            </div>
        )
    }
}

export default HomeContainer;