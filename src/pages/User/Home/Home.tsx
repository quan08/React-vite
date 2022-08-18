import React, { useEffect } from 'react'
import { ProductTye } from '../../../types/product';
import { Link } from 'react-router-dom'
import { formatCash } from '../../../utils/formatCash';
import styled from "styled-components";
import { Row, Col, Carousel, Divider, Typography, Button } from "antd";
import Card from "antd/lib/card/Card";
import HomeMenu from '../../../components/Home/Menu';
import Banner1 from "../../../assets/images/banner1.png";
import Banner2 from "../../../assets/images/banner2.png";
import Banner3 from "../../../assets/images/banner3.png";
import Banner4 from "../../../assets/images/banner4.png";
const { Text, Title } = Typography;
import { StarOutlined } from "@ant-design/icons";
import LogoImage1 from "../../../assets/image/Rectangle2.png";
import PhukienApple from "../../../assets/image/phukienApp.png";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../redux/action';
import { getAll } from '../../../api/product';


type HomePapeProps = {
}

const style: React.CSSProperties = {
  background: "#ffffff",
  padding: "25px 0",
};
const styles: React.CSSProperties = {
  //   background: "#FFA3A3",
  //   padding: "10px 0",
  //   color: "#ffffff",
};

function home(props: HomePapeProps) {
  const dataProduct = useSelector((data: any) => data.products.value);
  const dispatch = useDispatch()
  useEffect(() => {
    const getPro = async () => {
      const { data } = await getAll();
      dispatch(getProducts(data))
    }
    getPro()
  }, [])
  return (
    <div>
      <Container>
        <Row>
          <Col span={6}>
            <HomeMenu />
          </Col>
          <Col span={18}>
            <Carousel autoplay>
              <Slider src={Banner1} />
              <Slider src={Banner2} />
              <Slider src={Banner3} />
              <Slider src={Banner4} />
            </Carousel>
          </Col>
        </Row>
      </Container>
      <div>
        <h2 style={{ textAlign: "center", marginTop: "20px" }}>Sản phẩm</h2>
        <Row style={{ width: "100%" }} gutter={[16, 24]}>
          {dataProduct &&
            dataProduct.map((product: ProductTye, index: number) => {
              return (

                <Col className="gutter-row" span={4} style={style} key={index}>
                  <Link to={"/products/" + product.id}>
                    <Card
                      hoverable
                      cover={<Image alt="example" src={product.image} />}
                    >
                      <Title level={5}><Link to={`detail/${product.id}`}>{product.name}</Link></Title>
                      <Row>
                        <Col span={12}>
                          <Text type="danger">{formatCash(product.originalPrice)}vnd</Text>
                        </Col>
                        <Col span={12}>
                          <Text type="secondary">{formatCash(product.saleOffPrice)}vnd</Text>
                        </Col>
                      </Row>
                      <Borders>
                        <Text>
                          [HOT] Thu cũ lên đời giá cao - Thủ tục nhanh - Trợ
                          giá lên tới 1.000.000đ
                        </Text>{" "}
                      </Borders>
                      <br />
                      <Row>
                        <Col span={12}>
                          <Link to="">{<StarOutlined />}</Link>
                          <Link to="">{<StarOutlined />}</Link>
                          <Link to="">{<StarOutlined />}</Link>
                          <Link to="">{<StarOutlined />}</Link>
                          <Link to="">{<StarOutlined />}</Link>
                        </Col>
                        <Col span={12}>
                          <Text type="secondary">72 đánh giá</Text>
                        </Col>
                      </Row>
                    </Card>
                  </Link>
                </Col>


              );
            })}
        </Row>
        <Section>
          <Divider orientation="left">Phụ kiện</Divider>
          <Dt>
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={3}>
                <Bo style={{ backgroundColor: "#FFADB6" }}>
                  <Text>Nổi bật</Text>
                  <br />
                  <img alt="example" src={LogoImage1} />
                </Bo>
              </Col>
              <Col className="gutter-row" span={3}>
                <Bo style={{ backgroundColor: "#FFB8B8" }}>
                  <Text style={styles}>Phụ kiện Apple</Text>
                  <br />
                  <img alt="example" src={PhukienApple} />
                </Bo>
              </Col>
              <Col className="gutter-row" span={3}>
                <Bo style={{ backgroundColor: "#FF94EB" }}>
                  <Text style={styles}>Dán màn hình</Text>
                  <br />
                  <img alt="example" src={LogoImage1} />
                </Bo>
              </Col>
              <Col className="gutter-row" span={3}>
                <Bo style={{ backgroundColor: "#E0B3FF" }}>
                  <Text style={styles}>Ốp lưng - Bao da</Text>
                  <br />
                  <img alt="example" src={LogoImage1} />
                </Bo>
              </Col>
              <Col className="gutter-row" span={3}>
                <Bo style={{ backgroundColor: "#C6D8FB" }}>
                  <Text style={styles}>Cáp, sạc</Text>
                  <br />
                  <img alt="example" src={LogoImage1} />
                </Bo>
              </Col>
              <Col className="gutter-row" span={3}>
                <Bo style={{ backgroundColor: "#4D91FF" }}>
                  <Text style={styles}>Pin dự phòng</Text>
                  <br />
                  <img alt="example" src={LogoImage1} />
                </Bo>
              </Col>
              <Col className="gutter-row" span={3}>
                <Bo style={{ backgroundColor: "#85FFB1" }}>
                  <Text style={styles}>Thiết bị mạng</Text>
                  <br />
                  <img alt="example" src={LogoImage1} />
                </Bo>
              </Col>
              <Col className="gutter-row" span={3}>
                <Bo style={{ backgroundColor: "#F5D63D" }}>
                  <Text style={styles}>Camera</Text>
                  <br />
                  <img alt="example" src={LogoImage1} />
                </Bo>
              </Col>
              <Col className="gutter-row" span={3}>
                <Bo style={{ backgroundColor: "#FDA363" }}>
                  <Text style={styles}>Chuột, bàn phím</Text>
                  <br />
                  <img alt="example" src={LogoImage1} />
                </Bo>
              </Col>
              <Col className="gutter-row" span={3}>
                <Bo style={{ backgroundColor: "#FF6666" }}>
                  <Text style={styles}>Thẻ nhớ, USB</Text>
                  <br />
                  <img alt="example" src={LogoImage1} />
                </Bo>
              </Col>
              <Col className="gutter-row" span={3}>
                <Bo style={{ backgroundColor: "#D6D6D6" }}>
                  <Text style={styles}>Apple Care</Text>
                  <br />
                  <img alt="example" src={LogoImage1} />
                </Bo>
              </Col>
              <Col className="gutter-row" span={3}>
                <Bo style={{ backgroundColor: "#FFADB6" }}>
                  <Text style={styles}>Dây đeo Airtag</Text>
                  <br />
                  <img alt="example" src={LogoImage1} />
                </Bo>
              </Col>
              <Col className="gutter-row" span={3}>
                <Bo style={{ backgroundColor: "#96FDB5" }}>
                  <Text style={styles}>Gaming Gear</Text>
                  <br />
                  <img alt="example" src={LogoImage1} />
                </Bo>
              </Col>
              <Col className="gutter-row" span={3}>
                <Bo style={{ backgroundColor: "#6BCEFF" }}>
                  <Text style={styles}>Phụ kiện chụp ảnh</Text>
                  <br />
                  <img alt="example" src={LogoImage1} />
                </Bo>
              </Col>
              <Col className="gutter-row" span={3}>
                <Bo style={{ backgroundColor: "#D8A8FF" }}>
                  <Text style={styles}>Phụ kiện Laptop</Text>
                  <br />
                  <img alt="example" src={LogoImage1} />
                </Bo>
              </Col>
            </Row>
          </Dt>
          <Divider orientation="left">Linh kiện máy tính</Divider>
          <Dt>
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={3}>
                <Bo style={{ backgroundColor: "#FCA5A5" }}>
                  <Text style={styles}>PC ráp sẵn</Text>
                  <br />
                  <img alt="example" src={LogoImage1} />
                </Bo>
              </Col>
              <Col className="gutter-row" span={3}>
                <Bo style={{ backgroundColor: "#FDA4AF" }}>
                  <Text style={styles}>CPU</Text>
                  <br />
                  <img alt="example" src={LogoImage1} />
                </Bo>
              </Col>
              <Col className="gutter-row" span={3}>
                <Bo style={{ backgroundColor: "#F9A8D4" }}>
                  <Text style={styles}>Mainboard</Text>
                  <br />
                  <img alt="example" src={LogoImage1} />
                </Bo>
              </Col>
              <Col className="gutter-row" span={3}>
                <Bo style={{ backgroundColor: "#C4B5FD" }}>
                  <Text style={styles}>RAM</Text>
                  <br />
                  <img alt="example" src={LogoImage1} />
                </Bo>
              </Col>
              <Col className="gutter-row" span={3}>
                <Bo style={{ backgroundColor: "#A5B4FC" }}>
                  <Text style={styles}>Ổ cứng</Text>
                  <br />
                  <img alt="example" src={LogoImage1} />
                </Bo>
              </Col>
              <Col className="gutter-row" span={3}>
                <Bo style={{ backgroundColor: "#93C5FD" }}>
                  <Text style={styles}>Card màn hình</Text>
                  <br />
                  <img alt="example" src={LogoImage1} />
                </Bo>
              </Col>
              <Col className="gutter-row" span={3}>
                <Bo style={{ backgroundColor: "#6EE7B7" }}>
                  <Text style={styles}>Nguồn máy tính</Text>
                  <br />
                  <img alt="example" src={LogoImage1} />
                </Bo>
              </Col>
              <Col className="gutter-row" span={3}>
                <Bo style={{ backgroundColor: "#FCD34B" }}>
                  <Text style={styles}>Tản nhiệt</Text>
                  <br />
                  <img alt="example" src={LogoImage1} />
                </Bo>
              </Col>
            </Row>
          </Dt>
        </Section>
      </div>
    </div>
  )
}

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
`;
const Slider = styled.img`
  /* height: 300px;
  color: '#fff',;
	text-align: center;
	background-color: #364d79; */
`;
const Image = styled.img`
  height: 160px;
  width: 160px;
  left: 92px;
  top: 585px;
  border-radius: 0px;
  margin: auto;
  margin-top: 20px;
`;
const Section = styled.div`
  /* background-color: #eddddd; */
  max-width: 1505px;
  margin: auto;
`;
const Borders = styled.div`
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
`;
const Dt = styled.div`
  width: 1150px;
  margin: auto;
`;
const Bo = styled.div`
  border-radius: 10px;
  text-align: center;
  line-height: 1.8;
  height: 125px;
`;
export default home