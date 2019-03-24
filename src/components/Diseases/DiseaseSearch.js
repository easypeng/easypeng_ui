import React, { Component } from 'react';
import { Modal,  Button, Form, Input } from 'antd';
import DiseaseModal from '@/components/Diseases/DiseaseModal';

const FormItem = Form.Item;

class DiseaseSearch extends Component {

  constructor(props) {
    super(props);
  }

  queryHandler = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        onSubmit(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { diseasename, diseasenamech, modeofinheritance } = this.props.record;
    
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
              label="Disease Name"
            >
              {
                getFieldDecorator('diseasename', {
                  initialValue: diseasename,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Disease Name CN"
            >
              {
                getFieldDecorator('diseasenamech', {
                  initialValue: diseasenamech,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Mode Of Inheritance"
            >
              {
                getFieldDecorator('modeofinheritance', {
                  initialValue: modeofinheritance,
                })(<Input />)
              }
            </FormItem>
            <Form.Item span="22">
              <Button type="primary"  htmlType="submit">
                Query
              </Button>
            </Form.Item>
            <Form.Item span="22">
              <DiseaseModal record={{}} onOk={createHandler}>
                <Button type="primary">Create</Button>
              </DiseaseModal>
            </Form.Item>
          </Form>
      </span>
    );
  }
}

export default Form.create()(DiseaseSearch);
