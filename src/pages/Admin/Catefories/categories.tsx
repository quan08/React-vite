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
import { Categories } from "../../../types/categories";
import { getCateById } from "../../../api/categories";

interface DataType {
    name: string;
    saleOffPrice: number;
    feature: string;
    description: string;
}

type ProductsListProps = {
    cate: any[];
    onRemovePro: (id: any) => void
}


const CategoriesPage = (props: ProductsListProps) => {
    const navigate = useNavigate()
    const [modalText, setModalText] = React.useState<string>();
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [dataTable, setDataTable] = useState<ProductTye[]>([])
    const [cateDelete, setCatedelete] = useState<ProductTye>();

    const handleOk = async () => {
        setModalText('Xóa thành công ');
        // const res = await listMenu();
        setConfirmLoading(true);
        props.onRemovePro(cateDelete?.id);
        message.success("Xóa thành công " + cateDelete?.name)
        setVisible(false);
        // setConfirmLoading(false);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        
        {
            title: 'Thao tác',
            key: 'id',
            dataIndex: 'id',
            render: (record: any) => (
                <Space size="middle">

                    <Button onClick={() => navigate(`edit/${record}`)} type="primary"><span>Edit</span></Button>
                    <Button set-data={record} onClick={showModal} danger><span set-data={record}>Dell</span></Button>
                </Space>
            ),
        },

    ];

    
        const showModal = async (e: any) => {
            const id = e.target.getAttribute('set-data');
            console.log(id)
            const { data } = await getCateById(id)
            console.log(data)
            setCatedelete(data[0])
            setModalText(`*Danh mục sẽ bị xóa vĩnh viễn`);
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
                <Table columns={columns} dataSource={props.cate} />
                <Modal

                    title={cateDelete?.name}
                    visible={visible}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <img width="80px" height="80px" src={cateDelete?.image} alt="image danh mục" /> <br /> <br />
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