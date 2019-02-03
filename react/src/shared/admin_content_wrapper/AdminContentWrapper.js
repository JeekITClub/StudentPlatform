import React from 'react';

// Used for society_admin and sb_admin
class AdminContentWrapper extends React.Component {

    render() {
        return (
            <div className="mb-3 p-3 society-bureau-content-wrapper shadow-sm">
                {this.props.children}
            </div>
        )
    }
}

export default AdminContentWrapper;