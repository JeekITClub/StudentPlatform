import React from 'react';

import AdminContentWrapper from '../../../../shared/admin_content_wrapper/AdminContentWrapper';
import SocietyTable from '../components/SocietyTable'

class SocietyListContainer extends React.Component {
    render() {
        return (
            <AdminContentWrapper>
                <SocietyTable/>
            </AdminContentWrapper>
        )
    }
}

export default SocietyListContainer;