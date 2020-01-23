import {
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  Divider,
  Tooltip,
  InputNumber,
  Switch,
  Spin
} from 'antd';
import {observer} from "mobx-react";
import React, {Component, FormEvent} from "react";
import {FormComponentProps} from "antd/es/form";

import '../../styles/SocietyProfileForm.scss';

import AdminSocietyStore from "../../stores/AdminSocietyStore";
import {ISociety} from '../../../../types';


const {Option} = Select;
const {TextArea} = Input;

interface SocietyProfileProps extends ISociety, FormComponentProps {
}

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


@observer
class SocietyProfileForm extends Component<SocietyProfileProps, any> {
  handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    this.props.form.validateFields((err: object, values: any) => {
      if (!err) {
        console.log(values);
        AdminSocietyStore.updateProfile(values);
      }
    });
  };

  renderGradeOptions = () => {
    const arr = new Array(15).fill('');
    return arr.map((value, index: number) => {
      return <Option key={index} value={index + 1}>{index + 1}</Option>
    })
  };


  render() {
    const {getFieldDecorator, getFieldsError} = this.props.form;

    return (
      <Spin spinning={AdminSocietyStore.loading} tip="提交中...">
        <Form layout="vertical">
          <Divider>基本信息</Divider>

          <Row gutter={16}>
            <Col span={6}>
              <Tooltip title="社团ID仅可由社团部指定，无法自行修改" placement="topLeft">
                <Form.Item label="社团ID">
                  {getFieldDecorator('society_id', {
                    initialValue: AdminSocietyStore.society?.society_id,
                  })(
                    <Input disabled/>
                  )}
                </Form.Item>
              </Tooltip>
            </Col>
            <Col span={8}>
              <Tooltip title="社团类型仅可由社团部指定，无法自行修改" placement="topLeft">
                <Form.Item label="社团类型">
                  {getFieldDecorator('type', {
                    initialValue: AdminSocietyStore.societyTypeText
                  })(
                    <Input disabled/>
                  )}
                </Form.Item>
              </Tooltip>
            </Col>
            <Col span={10}>
              <Form.Item label="社团名称">
                {getFieldDecorator('name', {
                  initialValue: AdminSocietyStore.society?.name,
                  rules: [{required: true, message: '社团名称不可以为空'}]
                })(<Input/>)}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item label="社团邮箱">
                {getFieldDecorator('email', {
                  initialValue: AdminSocietyStore.society?.email,
                })(<Input/>)}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item label="社团介绍">
                {getFieldDecorator('introduction', {
                  initialValue: AdminSocietyStore.society?.introduction,
                })(<TextArea rows={4} placeholder="写点什么介绍社团吧!"/>)}
              </Form.Item>
            </Col>
          </Row>

          <Divider>社长信息</Divider>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="姓名">
                {getFieldDecorator('president_name', {
                  initialValue: AdminSocietyStore.society?.president_name,
                  rules: [{required: true, message: '社长姓名不可以为空'}]
                })(<Input/>)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="年级">
                {getFieldDecorator('president_grade', {
                  initialValue: AdminSocietyStore.society?.president_grade,
                  rules: [{required: true, message: '社长年级不可以为空'}]
                })(
                  <InputNumber
                    min={1944}
                    max={2100}
                    precision={0}
                    className="society-profile-form-grade"
                    placeholder="请填入学年份"/>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="班级">
                {getFieldDecorator('president_class', {
                  initialValue: AdminSocietyStore.society?.president_class,
                  rules: [{required: true, message: '社长班级不可以为空'}]
                })(
                  <Select>
                    {this.renderGradeOptions()}
                  </Select>
                )}
              </Form.Item>
            </Col>

          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="手机">
                {getFieldDecorator('president_phone', {
                  initialValue: AdminSocietyStore.society?.president_phone,
                  rules: [{required: true, message: '社长手机不可以为空'}]
                })(<Input/>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="微信/QQ">
                {getFieldDecorator('president_qq', {
                  initialValue: AdminSocietyStore.society?.president_qq,
                  rules: [{required: true, message: '社长微信/QQ不可以为空'}]
                })(<Input placeholder="或者其他联系方式"/>)}
              </Form.Item>
            </Col>
          </Row>

          <Divider>招新信息</Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="招新QQ群">
                {getFieldDecorator('recruit_qq_group', {
                  initialValue: AdminSocietyStore.society?.recruit_qq_group,
                })(<Input placeholder="或者微信群"/>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="是否招新">
                {getFieldDecorator('recruit', {
                  valuePropName: 'checked',
                  initialValue: AdminSocietyStore.society?.recruit
                })(<Switch checkedChildren="是" unCheckedChildren="否"/>)}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item label="社团成就">
                {getFieldDecorator('achievements', {
                  initialValue: AdminSocietyStore.society?.achievements,
                })(<TextArea rows={4} placeholder="相关的奖项、荣誉..."/>)}
              </Form.Item>
            </Col>
          </Row>

          <Divider>活动信息</Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="活动时间">
                {getFieldDecorator('activity_time', {
                  initialValue: AdminSocietyStore.society?.activity_time,
                })(<Input placeholder="如：4S课、中午、放学后..."/>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="活动场地">
                {getFieldDecorator('activity_place', {
                  initialValue: AdminSocietyStore.society?.activity_place,
                })(<Input placeholder="具体地点或房间号"/>)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="特殊教室或需求">
                {getFieldDecorator('special_room', {
                  initialValue: AdminSocietyStore.society?.special_room,
                })(<Input placeholder="如：电脑房、体操房、需要音箱..."/>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="指导老师">
                {getFieldDecorator('mentor', {
                  initialValue: AdminSocietyStore.society?.mentor,
                })(<Input/>)}
              </Form.Item>
            </Col>
          </Row>

        </Form>
        <div>
          <Button onClick={() => {
          }} style={{marginRight: 8}}>
            取消
          </Button>
          <Button onClick={this.handleSubmit} type="primary" disabled={hasErrors(getFieldsError())}>
            保存
          </Button>
        </div>
      </Spin>
    );
  }
}


export default Form.create({name: 'society_profile'})(SocietyProfileForm);

