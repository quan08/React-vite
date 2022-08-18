import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, Button, Table, Select, Space, Modal, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { getAll, getByCate, getById, remove, updateProduct } from "../../../api/product";
import { useQuery } from 'react-query'
import Input from "antd/lib/input/Input";
import { Option } from "antd/lib/mentions";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
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
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/action";

interface DataType {
    name: string;
    saleOffPrice: number;
    feature: string;
    description: string;
}

type ProductsListProps = {
    
}


const ProductAdminPage = (props: ProductsListProps) => {
    const navigate = useNavigate()
    const dispath = useDispatch();
    const [modalText, setModalText] = React.useState<string>();
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [dataTable, setDataTable] = useState<ProductTye[]>([])
    const [proDelete, setProdelete] = useState<ProductTye>();
    const dataProduct = useSelector((data: any) => data.products.value);
    const handleOk = async () => {
        setModalText('Xóa thành công ');
        // const res = await listMenu();
        setConfirmLoading(true);
        await remove(proDelete?.id)
        message.success("Xóa thành công " + proDelete?.name)
        setVisible(false);
        const { data } = await getAll();
        dispath(getProducts(data))
        // setConfirmLoading(false);
    };


    const changeStatus = async (id: any) => {
        const { data } = await getById(id)
        let statusNew = "";
        if (data[0].status == "hiện") {
            statusNew = 'ẩn'
        } else {
            statusNew = 'hiện'
        }
        const dataUpdate = { ...data[0], status: statusNew }

        await updateProduct(dataUpdate, id)
        const dataNew = await getAll();
        dispath(getProducts(dataNew.data))
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (record: any) => (
                <img width="150px" height="150px" src={record} alt="" />
            )
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
            dataIndex: 'status',
            key: 'status',
            render: (record: any) => {
                if (record === "hiện") {
                    return <div style={{ color: "green", fontSize: "20px" }}>
                        <CheckOutlined />
                    </div>
                }
                return <div style={{ color: "red", fontSize: "20px" }}>
                    <CloseOutlined />
                </div>
            }
        },
        {
            title: 'Thao tác',
            key: 'id',
            dataIndex: 'id',
            render: (record: any) => (
                <Space size="middle">

                    <Button danger onClick={async () => {
                       changeStatus(record)
                    }}  ><span>ChangeStatus</span></Button>
                    <Button onClick={() => navigate(`edit/${record}`)} type="primary"><span>Edit</span></Button>
                    <Button set-data={record} onClick={showModal} danger><span set-data={record}>Dell</span></Button>
                </Space>
            ),
        },

    ];

    const handleChangeFilter = async (e: any) => {
        if (e === '') {
            const { data } = await getAll();
            dispath(getProducts(data))
            return
        }
        const { data } = await getByCate(e)
        dispath(getProducts(data))
    }

    const showModal = async (e: any) => {
        const id = e.target.getAttribute('set-data');
        console.log(id)
        const { data } = await getById(id)
        console.log(data)
        setProdelete(data[0])
        setModalText(`*Sản phẩm sẽ bị xóa vĩnh viễn`);
        setVisible(true);
        setConfirmLoading(false);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    // fetchData()
    useEffect(() => {
        const getpro = async () => {
            const { data } = await getAll()
            dispath(getProducts(data))
        }
        getpro()
    }, [])

    // const { isLoading, data, error } = useQuery("Products", getAll)

    return (
        <>
            <Breadcrumb>
                <Typography.Title level={2} style={{ margin: 0 }}>
                    Sản phẩm
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
            <Table columns={columns} dataSource={dataProduct} />
            <Modal

                title={proDelete?.name}
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <img width="80px" height="80px" src={proDelete?.image} alt="" /> <br /> <br />
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