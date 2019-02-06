import React from 'react';
import AdminContentWrapper from '../../../../shared/admin_content_wrapper/AdminContentWrapper';

const tmp = new Array(5).fill('').map((item, index) => index + 1);

class Dashboard extends React.Component {

    render() {
        return (
            <div>
                <AdminContentWrapper>
                    {tmp.map((value) => {
                        return <h1 key={value}>{value} Dashboard</h1>
                    })}
                </AdminContentWrapper>
                <AdminContentWrapper>
                    {tmp.map((value) => {
                        return <h1 key={value}>{value} Dashboard</h1>
                    })}
                </AdminContentWrapper>
                <AdminContentWrapper>
                    {tmp.map((value) => {
                        return <h1 key={value}>{value} Dashboard</h1>
                    })}
                </AdminContentWrapper>
            </div>
        )
    }
}

export default Dashboard;