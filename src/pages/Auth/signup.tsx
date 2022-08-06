import { Button, Checkbox, Form, Input, message } from 'antd';
import React from 'react';
import { signup } from '../../api/auth';

const SingnUpPape: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
    try {
      signup(values)
      message.success("Đăng ký thành công")
    } catch (error) {
      message.success("Đăng ký thất bại, hãy thử lại")
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{textAlign: 'center'}}>
      <h3>SIGNUP</h3>
      <Form

        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>



        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SingnUpPape;