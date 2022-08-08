import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, Button, Table, Select, Space, Modal, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { getAll, getByCate, getById, updateProduct } from "../../../api/product";
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

interface DataType {
    name: string;
    saleOffPrice: number;
    feature: string;
    description: string;
}

type ProductsListProps = {
    product: ProductTye[];
    handleChangeFilter: (value: string) => void,
    changeStatus: (id: any) => void
    onRemovePro: (id: any) => void
}


const CategoriesPage = (props: ProductsListProps) => {
    const navigate = useNavigate()
    const [modalText, setModalText] = React.useState<string>();
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [dataTable, setDataTable] = useState<ProductTye[]>([])
    const [proDelete, setProdelete] = useState<ProductTye>();

    const handleOk = async () => {
        setModalText('Xóa thành công ');
        // const res = await listMenu();
        setConfirmLoading(true);
        props.onRemovePro(proDelete?.id);
        message.success("Xóa thành công " + proDelete?.name)
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
                        props.changeStatus(record)
                    }}  ><span>ChangeStatus</span></Button>
                    <Button onClick={() => navigate(`edit/${record}`)} type="primary"><span>Edit</span></Button>
                    <Button set-data={record} onClick={showModal} danger><span set-data={record}>Dell</span></Button>
                </Space>
            ),
        },

    ];

    
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
        return (
            <>
                <Breadcrumb>
                    <Typography.Title level={2} style={{ margin: 0 }}>
                        Danh mục sản phẩm
                    </Typography.Title>
                    <Link to="add">
                        <Button type="dashed" shape="circle" icon={<PlusOutlined />} />
                    </Link>
                </Breadcrumb>
                <Table columns={columns} dataSource={props.product} />
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
    export default CategoriesPage