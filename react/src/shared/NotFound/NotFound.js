import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'antd';
import Game from '../TRexRunner/TRexRunner';

class NotFound extends React.Component {
    render() {
        return (
            <div>
                <Game/>
                <Row type="flex" align="middle" justify="center" className="mt-5">
                    <Col className="text-center">
                        <h1>404 Not Found</h1>
                        <h4>😲 你要查看的内容不见了 😲</h4>
                        <h4>这里只有一只小恐龙</h4>
                        <h4 className="mt-5"><Link to={'/'}>回首页</Link></h4>
                        <p>或者</p>
                        <h4><a href='https://github.com/JeekStudio'>加入我们</a></h4>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default NotFound;