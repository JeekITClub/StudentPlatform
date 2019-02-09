import React from 'react';

import './loading.scss'

class Loading extends React.Component {
    render() {
        return (
            <div className="global-loading-container">
                <div className="global-loading-text">真的在飞速加载...</div>
            </div>
        )
    }
}

export default Loading;