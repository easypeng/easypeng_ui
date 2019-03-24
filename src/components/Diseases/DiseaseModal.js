import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class DiseaseEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { diseasename, diseasenamech, modeofinheritance } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="Edit Disease"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form  onSubmit={this.okHandler}>
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
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(DiseaseEditModal);
