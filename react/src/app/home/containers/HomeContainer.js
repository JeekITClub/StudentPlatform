import React from 'react';

import HomeHeader from '../components/HomeHeader'
import '../styles/Home.scss'

class HomeContainer extends React.Component {
    render() {
        return (
            <div>
                <div className="landing-container">
                    <HomeHeader/>
                </div>
            </div>
        )
    }
}

export default HomeContainer;