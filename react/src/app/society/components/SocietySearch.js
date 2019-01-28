import React from 'react';
import {Form, Input} from 'antd';

const Search = Input.Search;

class SocietySearch extends React.Component {
    state = {
        query: null
    };

    handleQueryChange = (e) => {
        e.preventDefault();
        this.setState({query: e.target.value})
    };

    handleSearch = () => {
        console.log(this.state.query);
    };

    render() {
        return (
            <Form>
                <Form.Item>
                    <Search
                        value={this.state.query}
                        onChange={this.handleQueryChange}
                        onSearch={this.handleSearch}
                        allowClear
                    />
                </Form.Item>
            </Form>
        )
    }
}

export default SocietySearch;