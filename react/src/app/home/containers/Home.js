import React from 'react';
import {Carousel} from 'antd';

import '../styles/Home.scss'

class Home extends React.Component {
    render() {
        return (
            <div>
                <Carousel dotPosition='right'>
                    <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                </Carousel>
            </div>
        )
    }
}

export default Home;