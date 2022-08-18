import { Button, Checkbox, Form, Input, message, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCateById, updateCate } from '../../../api/categories';
import { Categories } from '../../../types/categories';
type EditCatePape = {
    onudpate: (data: any, id: any, dataOld: any) => void
}
const Edit = (props: EditCatePape) => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [form] = Form.useForm();
    const [data, setData] = useState<any>();
    const onFinish = async (values: any) => {
        console.log('Success:', values);
        props.onudpate(values, id, data)
        navigate("/admin/categories")
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        const getCate = async () => {
            const {data} = await getCateById(id)
            setData(data[0])
            console.log(data);
            form.setFieldsValue({
                name: data[0].name,
            });
        }   
        getCate()
        
    }, [])
    return (
        <>
            <Typography.Title level={2} style={{ margin: 0 }}>
                Chỉnh sửa danh mục {data?.name}
            </Typography.Title>
            <Form
                form={form} 
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Tên danh mục"
                    name="name"
                    rules={[{ required: true, message: 'Nhập tên danh mục!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>
            </Form></>
    );
};

export default Edit;