import React from 'react';
import {Form, Input} from 'antd';
import {observer} from 'mobx-react';

import SocietyStore from '../stores/SocietyStore'

const Search = Input.Search;

import '../styles/SocietySearch.scss'

@observer
class SocietySearch extends React.Component {

    handleQueryChange = (e) => {
        e.preventDefault();
        SocietyStore.changeQuery(e.target.value)
    };

    handleSearch = () => {
        SocietyStore.changeLoading();
        console.log(SocietyStore.query);
        SocietyStore.changeLoading();
    };

    render() {
        return (
            <div className="society-search">
                <Form>
                    <Form.Item className="society-search-form-item">
                        <Search
                            value={SocietyStore.query}
                            onChange={this.handleQueryChange}
                            onSearch={this.handleSearch}
                            allowClear
                        />
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default SocietySearch;