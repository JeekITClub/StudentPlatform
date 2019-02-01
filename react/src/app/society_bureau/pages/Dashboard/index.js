import React from 'react';
import ContentWrapper from '../../components/ContentWrapper';

const tmp = new Array(5).fill('').map((item, index) => index + 1);

class Dashboard extends React.Component {

    render() {
        return (
            <div>
                <ContentWrapper>
                    {tmp.map((value) => {
                        return <h1 key={value}>{value} Dashboard</h1>
                    })}
                </ContentWrapper>
                <ContentWrapper>
                    {tmp.map((value) => {
                        return <h1 key={value}>{value} Dashboard</h1>
                    })}
                </ContentWrapper>
                <ContentWrapper>
                    {tmp.map((value) => {
                        return <h1 key={value}>{value} Dashboard</h1>
                    })}
                </ContentWrapper>
            </div>
        )
    }
}

export default Dashboard;