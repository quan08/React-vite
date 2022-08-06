import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getByCate, getById } from '../../../api/product';
import { ProductTye } from '../../../types/product';
import { addToCart, getLocalStorage } from '../../../utils/cart';

type Props = {}

function ProductsDetail({ }: Props) {
  const { id } = useParams();
  const [products, setProducts] = useState<ProductTye>();
  const [productsByCate, setProductsByCate] = useState<ProductTye[]>([]);
  const [quantity, setQuantity] = useState<number>(1)
  const getPro = async () => {
    const { data } = await getById(id);
    console.log(data)
    setProducts(data[0])
    const res = await getByCate(data[0].categories);
    console.log(res.data)
    setProductsByCate(res.data)
  }
  const handleIncremean = () => {
    if (quantity <= 49) {
      setQuantity(quantity + 1)
    } else {
      message.warning("Đạt số lượng tối đa")
    }
  }
  const handleDecremean = () => {
    if (quantity >= 2) {
      setQuantity(quantity - 1)
    } else {
      message.warning("Đạt số lượng tối thiếu")
    }
  }

  const handleAddtoCart = () => {
    addToCart({ ...products, quantity: quantity }, () => {
      console.log("được gọi sau khi add to cart nè");
    })

    setQuantity(1)
  }
  useEffect(() => {
    getPro()
  }, [id])
  return (
    <div>
      <div className="container-fluid pb-5">
        <div className="row px-xl-5">
          <div className="col-lg-5 mb-30">
            <div id="product-carousel" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner bg-light">
                <div className="carousel-item active">
                  <img className="w-100 h-100" src={products?.image} alt="Image" />
                </div>
                <div className="carousel-item">
                  <img className="w-100 h-100" src={products?.image} alt="Image" />
                </div>
                <div className="carousel-item">
                  <img className="w-100 h-100" src={products?.image} alt="Image" />
                </div>
                <div className="carousel-item">
                  <img className="w-100 h-100" src={products?.image} alt="Image" />
                </div>
              </div>
              <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
                <i className="fa fa-2x fa-angle-left text-dark"></i>
              </a>
              <a className="carousel-control-next" href="#product-carousel" data-slide="next">
                <i className="fa fa-2x fa-angle-right text-dark"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-7 h-auto mb-30">
            <div className="h-100 bg-light p-30">
              <h3>{products?.name}</h3>
              <div className="d-flex mb-3">

              </div>
              <h3 className="font-weight-semi-bold mb-4">{products?.originalPrice}</h3>

              <div className="d-flex align-items-center mb-4 pt-2">
                <div className="input-group quantity mr-3" style={{ width: "130px" }}>
                  <div className="input-group-btn">
                    <button onClick={handleDecremean} className="btn btn-primary btn-minus">
                      <i className="fa fa-minus"></i>
                    </button>
                  </div>
                  <input id='quantity' type="text" className="form-control bg-secondary border-0 text-center" value={quantity} />
                  <div className="input-group-btn">
                    <button onClick={handleIncremean} className="btn btn-primary btn-plus">
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
                <button onClick={handleAddtoCart} className="btn btn-primary px-3" ><i className="fa fa-shopping-cart mr-1"></i> Add To
                  Cart</button>
              </div>
              <div className="d-flex pt-2">
                <strong className="text-dark mr-2">Share on:</strong>
                <div className="d-inline-flex">
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-pinterest"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row px-xl-5">
          <div className="col">
            <div className="bg-light p-30">
              <div className="nav nav-tabs mb-4">
                <a className="nav-item nav-link text-dark active" data-toggle="tab" href="#tab-pane-1">Description</a>
              </div>
              <div className="tab-content">
                <div className="tab-pane fade show active" id="tab-pane-1">
                  <h4 className="mb-3">Product Description</h4>
                  <p>{products?.description}</p>
                </div>

                {/*  */}
                <div className="row px-xl-5">
                  <div className="col">
                    <div className="owl-carousel related-carousel owl-loaded owl-drag">

                      <div className="owl-stage-outer">
                        {productsByCate.map((item) => {
                          if (item.id != products?.id)
                            return (
                              <div className="owl-item cloned" style={{ width: "227.35px", marginRight: " 29px" }}><div className="product-item bg-light">
                                <div className="product-img position-relative overflow-hidden">
                                  <img className="img-fluid w-100" src={item.image} alt="" />
                                  <div className="product-action">
                                    <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-shopping-cart"></i></a>

                                    <Link to={"/products/" + item.id} className="btn btn-outline-dark btn-square" ><i className="fa fa-search"></i></Link>
                                  </div>
                                </div>
                                <div className="text-center py-4">
                                  <a className="h6 text-decoration-none text-truncate" href="">Product Name Goes Here</a>
                                  <div className="d-flex align-items-center justify-content-center mt-2">
                                    <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-center mb-1">
                                    <small className="fa fa-star text-primary mr-1"></small>
                                    <small className="fa fa-star text-primary mr-1"></small>
                                    <small className="fa fa-star text-primary mr-1"></small>
                                    <small className="fa fa-star text-primary mr-1"></small>
                                    <small className="fa fa-star text-primary mr-1"></small>
                                    <small>(99)</small>
                                  </div>
                                </div>
                              </div></div>)
                        })}
                      </div></div><div className="owl-dots"><div className="owl-dot active"><span></span></div><div className="owl-dot"><span></span></div></div></div>
                </div>
                {/*  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsDetail