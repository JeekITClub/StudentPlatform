import React from 'react';
import {Row, Col} from 'antd';

const tmp = new Array(20).fill('').map((item, index) => index + 1);

class Dashboard extends React.Component {

    render() {
        return (
            tmp.map((value) => {
                return <h1 key={value}>{value} Dashboard</h1>
            })
        )
    }
}

export default Dashboard;