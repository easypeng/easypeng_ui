import React, { Component } from 'react';
import { Modal,  Button, Form, Input } from 'antd';
import UserModal from './UserModal';

const FormItem = Form.Item;

class UserSearch extends Component {

  constructor(props) {
    super(props);
  }

  queryHandler = (e) => {
    e.preventDefault();
    const { onSubmit, page } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onSubmit(page,values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { name, email, website } = this.props.record;
    const createHandler = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };

    return (
      <span>
          <Form layout="inline" onSubmit={this.queryHandler}>
            <FormItem
              {...formItemLayout}
              label="Name"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Email"
            >
              {
                getFieldDecorator('email', {
                  initialValue: email,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Website"
            >
              {
                getFieldDecorator('website', {
                  initialValue: website,
                })(<Input />)
              }
            </FormItem>
            <Form.Item span="22">
              <Button type="primary"  htmlType="submit">
                Query
              </Button>
            </Form.Item>
            <Form.Item span="22">
              <UserModal record={{}} onOk={createHandler}>
                <Button type="primary">Create</Button>
              </UserModal>
            </Form.Item>
          </Form>
      </span>
    );
  }
}

export default Form.create()(UserSearch);
