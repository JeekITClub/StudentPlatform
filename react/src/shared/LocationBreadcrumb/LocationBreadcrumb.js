import React from 'react';
import {Breadcrumb} from 'antd';
import {withRouter, Link} from "react-router-dom";
import * as PropTypes from 'prop-types';

@withRouter
class LocationBreadcrumb extends React.Component {
    render() {
        const breadcrumbNameMap = this.props.breadcrumbNameMap;
        const {location} = this.props;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {breadcrumbNameMap[url]}
                    </Link>
                </Breadcrumb.Item>
            );
        });
        const breadcrumbItems = [].concat(extraBreadcrumbItems);

        return (
            <Breadcrumb>
                {breadcrumbItems}
            </Breadcrumb>
        )
    }
}

LocationBreadcrumb.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object,
    breadcrumbNameMap: PropTypes.object.isRequired
};

export default LocationBreadcrumb;