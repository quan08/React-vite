import { Button, Checkbox, Form, Input, message, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addCate, getCateById, updateCate } from '../../../api/categories';
import { Categories } from '../../../types/categories';
type EditCatePape = {
    onAdd : () => void
}
const CategoriesAddPage = (props: EditCatePape) => {
    const navigate = useNavigate()
    const onFinish = async (values: any) => {
        console.log('Success:', values);
        const {data} = await addCate(values)
        navigate("/admin/categories")
        message.success("Thêm thành công")
        props.onAdd()
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        
    }, [])
    return (
        <>
            <Typography.Title level={2} style={{ margin: 0 }}>
                Thêm danh mục
            </Typography.Title>
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
                    label="Tên danh mục"
                    name="name"
                    rules={[{ required: true, message: 'Nhập tên danh mục!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Thêm
                    </Button>
                </Form.Item>
            </Form></>
    );
};

export default CategoriesAddPage;