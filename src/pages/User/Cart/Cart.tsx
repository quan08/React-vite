import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { ProductTye } from '../../../types/product'
import { getLocalStorage, setLocalStorage } from '../../../utils/cart'
import { formatCash } from '../../../utils/formatCash'

type Props = {
    removeCartItem: () => void
}

function Cart(props: Props) {
    const [productCart, setProductsCart] = useState<ProductTye[]>([])
    const getPro = () => {
        const data = getLocalStorage("cart");
        setProductsCart(data)
    }
    useEffect(() => {
        getPro()
    }, [])

    const handleRemoveItemCart = (e: any) => {
        const idPro = e.target.getAttribute("set-data");
        const Cart = productCart;
        const CartNew = Cart.splice(idPro, 1)
        console.log(Cart)
        localStorage.removeItem('cart')
        setLocalStorage("cart", Cart);
        message.success('Xóa thành công')
        getPro()
        props.removeCartItem();
    }

    const totalCart =() => {
        let count = 0;
        productCart.map((item) => {
            count += item.originalPrice * item.quantity
        }) 
        return count
    }
    const handleIncreanQuantity = (e: any) => {
        const index = e.target.getAttribute('set-data')
        if (productCart[index].quantity <= 49) {
            let Cart = productCart;
            Cart[index].quantity += 1
            console.log(Cart)
            localStorage.removeItem('cart')
            setLocalStorage("cart", Cart);
            getPro()
        } else {
            message.warning("Đạt số lượng tối đa")
        }

    }

    const handleDecreanQuantity = (e: any) => {
        const index = e.target.getAttribute('set-data')
        if (productCart[index].quantity > 1) {
            let Cart = productCart;
            Cart[index].quantity -= 1
            console.log(Cart)
            localStorage.removeItem('cart')
            setLocalStorage("cart", Cart);
            getPro()
        } else {
            message.warning("Đạt số lượng tối thiếu")
        }
    }
    return (
        <div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-8 table-responsive mb-5">
                        <table className="table table-light table-borderless table-hover text-center mb-0">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {
                                    productCart.map((item, index) => {
                                        return (
                                            <tr>
                                                <td className="align-middle"><img src="img/product-5.jpg" alt="" style={{ width: " 50px" }} />{item.name}</td>
                                                <td className="align-middle">{formatCash(item.originalPrice)}</td>
                                                <td className="align-middle">
                                                    <div className="input-group quantity mx-auto" style={{ width: " 100px" }}>
                                                        <div className="input-group-btn">
                                                            <button set-data={index} onClick={handleDecreanQuantity} className="btn btn-sm btn-primary btn-minus">
                                                                <i set-data={index} className="fa fa-minus"></i>
                                                            </button>
                                                        </div>
                                                        <input type="text" className="form-control form-control-sm bg-secondary border-0 text-center" value={item.quantity} />
                                                        <div className="input-group-btn">
                                                            <button set-data={index} onClick={handleIncreanQuantity} className="btn btn-sm btn-primary btn-plus">
                                                                <i set-data={index} className="fa fa-plus"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="align-middle">{formatCash(item.quantity * item.originalPrice)}</td>
                                                <td set-data={index} onClick={handleRemoveItemCart} className="align-middle"><button set-data={index} className="btn btn-sm btn-danger"><i set-data={index} className="fa fa-times"></i></button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>-
                    </div>
                    <div className="col-lg-4">
                        <form className="mb-30" action="">
                            <div className="input-group">
                                <input type="text" className="form-control border-0 p-4" placeholder="Coupon Code" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary">Apply Coupon</button>
                                </div>
                            </div>
                        </form>
                        <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Cart Summary</span></h5>
                        <div className="bg-light p-30 mb-5">
                            <div className="pt-2">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5>Total</h5>
                                    <h5 style={{color:"red"}}>{formatCash(totalCart())}</h5>
                                </div>
                                <button className="btn btn-block btn-primary font-weight-bold my-3 py-3">Proceed To Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart