import React from 'react';
import {Select, Button, Form} from "antd";
import * as PropTypes from 'prop-types';

import Provider from '../../utils/provider';

import './style.scss'

const { Option } = Select;

class YearSemesterSelect extends React.Component {
    state = {
        yearOptions: []
    };

    componentDidMount() {
        Provider.get('/api/manage/settings/')
            .then((res) => {
                let years = new Array(res.data.year - 2018)
                    .fill('')
                    .map((_, index) => {
                        return res.data.year - index
                    });
                this.setState({ yearOptions: years });
            })
            .catch((err) => {
                throw err;
            })
    }

    render() {
        return (
            <Form className="year-semester-select" layout="inline">
                <Form.Item label="学年">
                    <Select
                        value={this.props.year}
                        className="year-select"
                        onChange={this.props.yearOnChange}
                        allowClear
                    >
                        {
                            this.state.yearOptions.map((option) => (
                                <Option value={option} key={option}>{option}学年</Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="学期">
                    <Select
                        className="semester-select"
                        value={this.props.semester}
                        onChange={this.props.semesterOnChange}
                        allowClear
                    >
                        <Option value="1" key="1">第一学期</Option>
                        <Option value="2" key="2">第二学期</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button
                        onClick={this.props.searchButtonOnClick}
                        htmlType="button"
                        className="search-button"
                        type="primary"
                    >
                        查询
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

YearSemesterSelect.propTypes = {
    yearOnChange: PropTypes.func,
    semesterOnChange: PropTypes.func,
    searchButtonOnClick: PropTypes.func.isRequired
};

export default YearSemesterSelect;