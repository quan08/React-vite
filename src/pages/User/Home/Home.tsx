import React from 'react'
import { ProductTye } from '../../../types/product';
import {Link} from 'react-router-dom'
import { formatCash } from '../../../utils/formatCash';
type HomePapeProps = {
    products: ProductTye[];
}

function home(props: HomePapeProps) {
    console.log(props.products)
    return (
        <div>
            <div className="container-fluid pt-5 pb-3">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Featured Products</span></h2>
                <div className="row px-xl-5">
                   {props.products.map((item) =>  <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                        <div className="product-item bg-light mb-4">
                            <div style={{height: "350px"}} className="product-img position-relative overflow-hidden">
                                <img  className="img-fluid w-100" src={item.image} alt="" />
                                <div className="product-action">
                                    <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-shopping-cart"></i></a>
                    
                                    <Link to={"/products/"+item.id} className="btn btn-outline-dark btn-square" ><i className="fa fa-search"></i></Link>
                                </div>
                            </div>
                            <div style={{overflow: "hidden"}} className="text-center py-4">
                                <a  className="h6 text-decoration-none text-truncate" href="">{item.name}</a>
                                <div className="d-flex align-items-center justify-content-center mt-2">
                                    <h5 style={{color: "red"}}>{formatCash(item.originalPrice)}</h5><h6 className="text-muted ml-2"><del>{formatCash(item.saleOffPrice)}</del></h6>
                                </div>
                               
                            </div>
                        </div>
                    </div> )}
                </div>
            </div>
        </div>
    )
}

export default home