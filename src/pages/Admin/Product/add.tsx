import React, { useState } from "react";
import styled from "styled-components";
import { Typography, Col, Row, Button, Checkbox, Form, Input, InputNumber, Select, message } from 'antd'
import UploadImage from "../../../components/Product/UploadImage";
import { createProduct } from "../../../api/product";
import { useNavigate } from "react-router-dom";
import UploadTest from "../../../components/Product/UploadTest";

const { TextArea } = Input
const { Option } = Select;



const AddProductPage: React.FC = () => {
	const [SaleOffPrice, setSaleOffPrice] = useState<number>(0);
	const [OriginalPrice, setOriginalPrice] = useState<number>(0);
	const [mesValidatePrice, setMesValidatePrice] = useState<string>('');
	const [image, setImage] = useState<string>('');
	const navigate = useNavigate()
	const onFinish = async (values: any) => {
		values.image = image
		console.log(values.image)
		console.log('Success:', values);
		try {
			const data = await createProduct(values)
			message.success("Tạo mới thành công")
			navigate(-1)
		} catch (err) {
			message.error("Có lỗi xảy ra")
		}
	};

	const changeOriginalPrice = (e: any) => {
		setOriginalPrice(e)
		if (SaleOffPrice >= e) {
			setMesValidatePrice('Giá khuyến mãi phải thấp hơn giá gốc')
			setMesValidatePrice('')
		}
	}

	const changeSaleOffPrice = (e: any) => {
		setSaleOffPrice(e)
		if (e >= OriginalPrice) {
			setMesValidatePrice('Giá khuyến mãi phải thấp hơn giá gốc')
		} else {
			setMesValidatePrice('')
		}
	}
	const getUrl = (url: any) => {
		console.log(url)
		setImage(url)
		
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<>
			<Breadcrumb>
				<Typography.Title level={2} style={{ margin: 0 }}>
					Thêm mới
				</Typography.Title>
			</Breadcrumb>
			<Row gutter={16}>
				<Col span={10}>
					<UploadImage onupload={getUrl} />
					{/* <UploadTest/> */}
				</Col>
				<Col span={14}>
					<Typography.Title level={5}>Thông tin sản phẩm</Typography.Title>
					<Form
						// name="product"
						initialValues={{}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="on"
						labelCol={{ span: 24 }}
					>
						<Form.Item
							name="name"
							labelCol={{ span: 24 }}
							label="Tên sản phẩm"
							rules={[{ required: true, message: 'Tên sản phẩm không được trống' }]}
						>
							<Input size="large" />
						</Form.Item>

						<Row gutter={16}>
							<Col span={12}>
								<Form.Item
									name="originalPrice"
									label="Giá gốc"
									labelCol={{ span: 24 }}
									rules={[{ required: true, message: 'Gía sản phẩm' }]}
								>
									<InputNumber onChange={changeOriginalPrice} style={{ width: '100%' }} size="large" />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="saleOffPrice"
									label="Giá giảm"
									labelCol={{ span: 24 }}
									rules={[{ required: true, message: 'Gía sản phẩm' }]}
								>
									<InputNumber onChange={changeSaleOffPrice} style={{ width: '100%' }} size="large" />
								</Form.Item>
								<div role="alert" className="ant-form-item-explain-error" >{mesValidatePrice}</div>
							</Col>
							<Col span={12}>
								<Form.Item
									label="Trạng thái(Ẩn/hiện)"
									name="status"
									rules={[{ required: true }]}
								>
									<Select style={{ width: '100%' }} size="large">
										<Option value="hiện">Hiện</Option>
										<Option value="ẩn">Ẩn</Option>
									</Select>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label="Phân loại"
									name="categories"
									rules={[{ required: true }]}
								>
									<Select style={{ width: '100%' }} size="large">
										<Option value="phone">Điện thoại</Option>
										<Option value="laptop">Laptop</Option>
										<Option value="tablet">Máy tính bảng</Option>
									</Select>
								</Form.Item>
							</Col>
						</Row>

						<Form.Item
							name="feature"
							labelCol={{ span: 24 }}
							label="Đặc điểm nổi bật"
							rules={[{ required: true, message: 'Đặc điểm sản phẩm' }]}
						>
							<TextArea name="feature" />
						</Form.Item>

						<Form.Item id="image" style={{display: "none"}}
							name="image"
							labelCol={{ span: 24 }}
							label="Tên sản phẩm"
							rules={[{ message: 'Tên sản phẩm không được trống' }]}
						>
							<Input size="large" />
						</Form.Item>

						<Form.Item
							name="description"
							labelCol={{ span: 24 }}
							label="Mô tả sản phẩm"
							rules={[{ required: true, message: 'Mô tả sản phẩm' }]}
						>
							<TextArea name="description" />
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit">
								Tạo mới sản phẩm
							</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</>
	)
}

const Breadcrumb = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`

const Label = styled.div`
	font-size: 13px;
`

export default AddProductPage