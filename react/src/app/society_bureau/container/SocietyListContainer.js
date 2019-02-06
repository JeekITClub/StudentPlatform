import React from 'react';

import SocietyTable from '../components/SocietyTable'

class SocietyListContainer extends React.Component {
    state = {
        modalVisible: false
    };

    render () {
        return (
            <SocietyTable/>
        )
    }
}

export default SocietyListContainer;