import React from 'react';
import AdminContentWrapper from '../../../../shared/admin_content_wrapper/AdminContentWrapper';
import DashboardStatistic from "../../components/DashboardStatistic";

class Dashboard extends React.Component {

    render() {
        return (
            <div>
                <AdminContentWrapper>
                    <DashboardStatistic/>
                </AdminContentWrapper>
            </div>
        )
    }
}

export default Dashboard;