import { Button, Checkbox, Form, Input, message } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { checkEmail, signin, signup } from '../../../api/auth';
import { updateAuth } from '../../../redux/action';
import { User } from '../../../types/User';
import { setLocalStorage } from '../../../utils/cart';
import { ValidateEmail } from '../../../utils/validate';
type PropsSignUp = {
}
const SingnUpPape = (props: PropsSignUp) => {
  const navigate = useNavigate()
  const dispath = useDispatch();
  const onFinish = async (values: any) => {
    console.log('Success:', values);
    if (await ValidateEmail(values.email)) {
      {
        if (values.password.length <= 5) {
          message.error('Mật khẩu tối thiếu 6 kí tự')
        } else {
          try {
            signup(values)
            navigate("/");
            message.success("Đăng ký thành công")
            setLocalStorage("user", values)
            dispath(updateAuth(values))
          } catch (error) {
            message.success("Đăng ký thất bại, hãy thử lại")
          }
        }
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ textAlign: 'center' }}>
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
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Username"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
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