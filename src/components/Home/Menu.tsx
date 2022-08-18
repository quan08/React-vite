import { ClockCircleOutlined, HomeOutlined, PhoneOutlined, LaptopOutlined, TabletFilled, AudioOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { getAllCate } from '../../api/categories';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { useDispatch } from 'react-redux';
import { getAll, getByCate } from '../../api/product';
import {  getProducts } from '../../redux/action';

const { Option } = Select;

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

type propsHome = {
}

const HomeMenu = (props: propsHome) => {
  const [cate, setCate] = useState<any>();
  const dispatch= useDispatch() 
  const handlefillterCate = async (e: any) => {
    if(e == "All") {
      const {data} = await getAll();
      dispatch(getProducts(data))
      return
    }
    const {data} = await getByCate(e)
    dispatch(getProducts(data))
  
  }

  const getCate = async () => {
    const { data } = await getAllCate();
    setCate(data)
  }
  
  useEffect(() => {
    getCate()
  }, [])
  return (
    <Select defaultValue="Tất cả sản phẩm" style={{ width: 250 }} onChange={handlefillterCate}>
      <Option value="All">Tất cả sản phẩm</Option>
      {cate?.map((item: any) => {
        return(
          <Option value={item.name}>{item.name}</Option>
        )
      })}
    </Select>
  );
};

export default HomeMenu;