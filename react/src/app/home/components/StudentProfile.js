import React from 'react';
import {Button, Form, Input, Select} from 'antd';

import Provider from '../../../utils/provider'

const {Item} = Form;
const {Option} = Select;

const classNums = new Array(15)
    .fill('')
    .map((item, index) => index + 1);

class StudentProfile extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Provider.patch('/api/student/',
                    {
                        'name': values.name,
                        'class_num': values.class_num,
                        'grade': values.grade,
                        'qq': values.qq
                    }
                )
                    .then((res) => {
                        console.log(res.status)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Item label="姓名">
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true,
                            message: '请输入你的真实姓名',
                        }],
                    })(
                        <Input placeholder="请输入你的真实姓名"/>
                    )}
                </Item>
                <Item label="年纪">
                    {getFieldDecorator('grade', {
                        rules: [{
                            required: true,
                            message: '请选择年级',
                        }],
                    })(
                        <Select placeholder="请选择年级">
                            <Option value={1}>高一</Option>
                            <Option value={2}>高二</Option>
                            <Option value={3}>高三</Option>
                        </Select>
                    )}
                </Item>
                <Item label="班级">
                    {getFieldDecorator('class_num', {
                        rules: [{
                            required: true,
                            message: '请选择班级',
                        }],
                    })(
                        <Select placeholder="请选择班级">
                            {
                                classNums.map((classNum) => {
                                    return <Option value={classNum} key={classNum}>({classNum})班</Option>
                                })
                            }
                        </Select>
                    )}
                </Item>
                <Item label="QQ号">
                    {getFieldDecorator('qq')(
                        <Input placeholder="请输入你的QQ号"/>
                    )}
                </Item>
                <Button htmlType="submit" size="large" type="primary" style={{width: '100%'}}>提交更改</Button>
            </Form>
        )

    }
}

const WrappedStudentProfile = Form.create({name: 'student_profile'})(StudentProfile);

export default WrappedStudentProfile;