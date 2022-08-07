import { Button, Checkbox, Form, Input, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from '../../api/auth';
import { User } from '../../types/User';
import { setLocalStorage } from '../../utils/cart';
type propsSignIn = {
  onSignIn: (data: User) => void
}
const SingnPape = (props: propsSignIn) => {
  const navigate = useNavigate()
  const onFinish = async (values: any) => {
    console.log('Success:', values);
    const {data} = await signin(values)
    if(data.length == 0) {
      message.error("Tài khoản không tồn tại ")
    }else{
      if(data[0].password != values.password) {
        message.error("Sai mật khẩu")
      }else{
        message.success("Đăng nhập thành công");
        navigate("/")
        // setLocalStorage("user", data[0])
        props.onSignIn(data[0])
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{textAlign: 'center'}}>
      <h3>SIGNIN</h3>
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
          label="Email"
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

export default SingnPape;