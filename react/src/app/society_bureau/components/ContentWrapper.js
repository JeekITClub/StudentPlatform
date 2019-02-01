import React from 'react';

class ContentWrapper extends React.Component {

    render() {
        return (
            <div className="mb-3 p-3 society-bureau-content-wrapper shadow-sm">
                {this.props.children}
            </div>
        )
    }
}

export default ContentWrapper;