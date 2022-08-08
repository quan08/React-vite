import { ClockCircleOutlined, HomeOutlined, PhoneOutlined, LaptopOutlined, TabletFilled, AudioOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { getAllCate } from '../../api/categories';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Select } from 'antd';

const { Option } = Select;

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

type propsHome = {
  onFillter: (key: any) => void
}

const HomeMenu = (props: propsHome) => {
  const [cate, setCate] = useState<any>();
  const handlefillterCate = (e: any) => {
    console.log(e);
    props.onFillter(e)
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