import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, Button, Table, Select, Space, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { getAll, getByCate } from "../../../api/product";
import { useQuery } from 'react-query'
import Input from "antd/lib/input/Input";
import { Option } from "antd/lib/mentions";
const { Paragraph } = Typography
import {
    AutoComplete,
    Cascader,
    Col,
    DatePicker,
    InputNumber,
    Row,
    Tooltip,
} from 'antd';
import { ProductTye } from '../../../types/product'

interface DataType {
    name: string;
    saleOffPrice: number;
    feature: string;
    description: string;
}


const ProductAdminPage = () => {
    const navigate = useNavigate()
    const [modalText, setModalText] = React.useState<string>();
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [dataTable, setDataTable] = useState<ProductTye[]>([])


    const handleOk = async () => {
        setModalText('Xóa thành công ');
        // const res = await listMenu();
        setConfirmLoading(true);
        // props.onRemove(staff);
        // navigate("/admin/menu")
        setVisible(false);
        // setConfirmLoading(false);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Đặc điểm',
            dataIndex: 'feature',
            key: 'feature',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Giá khuyến mãi',
            dataIndex: 'saleOffPrice',
            key: 'saleOffPrice',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Ẩn/hiện',
            dataIndex: '',
            key: '',
            render: (record: any) => (
                <Space size="middle">
                    <Button type="primary"><span>Change</span></Button>
                </Space>
            ),
        },
        {
            title: 'Thao tác',
            key: 'id',
            dataIndex: 'id',
            render: (record: any) => (
                <Space size="middle">
                    <Button onClick={() => navigate(`edit/${record}`)} type="primary"><span>Edit</span></Button>
                </Space>
            ),
        },

    ];

    const showModal = async (e: any) => {
        const id = e.target.getAttribute('set-data');
        console.log(id)
        // const { data } = await getStaff(id)
        // setStaff(data)      
        setModalText(`*Nếu chắc chắn hãy nhấn ok`);
        setVisible(true);
        setConfirmLoading(false);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };


    const fetchData = async () => {
        const data = await getAll()
        setDataTable(data.data)
    }

    const handleChangeFilter = async (e: any) => {
        if (e === '') {
            fetchData()
            return
        }
        const data = await getByCate(e)
        setDataTable(data.data)
    }

    // fetchData()
    useEffect(() => {
        fetchData()
    }, [])

    // const { isLoading, data, error } = useQuery("Products", getAll)

    return (
        <>
            <Breadcrumb>
                <Typography.Title level={2} style={{ margin: 0 }}>
                    Điện thoại
                </Typography.Title>
                <Link to="add">
                    <Button type="dashed" shape="circle" icon={<PlusOutlined />} />
                </Link>
            </Breadcrumb>
            <div>
                Danh mục sản phẩm
                <Select defaultValue="All" onChange={handleChangeFilter} style={{ width: '100%' }} size="large">
                    <Option value="">All</Option>
                    <Option value="phone">Điện thoại</Option>
                    <Option value="laptop">Laptop</Option>
                    <Option value="tablet">Máy tính bảng</Option>
                </Select>
            </div>
            <Table columns={columns} dataSource={dataTable} />
            <Modal
                title="ácacacs"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                {/* <h4>{staff?.name}</h4> */}
                <strong className='text-danger'>{modalText}</strong>
            </Modal>
        </>
    )
}

const Breadcrumb = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`

export default ProductAdminPage