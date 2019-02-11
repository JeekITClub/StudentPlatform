import React from 'react';

import './NotAuthorized.scss'

class NotAuthorized extends React.Component {
    render () {
        return (
            <div className="not-authorized-container">
                <p className="not-authorized-text">你可没有权限呢</p>
            </div>
        )
    }
}

export default NotAuthorized;