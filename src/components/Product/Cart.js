import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
function Cart() {
    const [getCart, setCart] = useState([]);
    let dataProd = JSON.parse(localStorage.getItem('dataCart'))
    useEffect(() => {
        fecthData()
    }, [])

    async function fecthData() {
        try {
            const res = await axios.post("http://localhost/laravel8/public/api/product/cart", dataProd)
            setCart(res.data.data)
        } catch (error) {
            console.error("Đã xảy ra lỗi! ", error);
        }
    }
    let amount = 0
    function UpQty(e) {
        let id = e.target.id
        let newData = [...getCart]
        if (newData.length > 0) {
            newData.map((value, key) => {
                if (id == value.id) {
                    newData[key].qty++
                    dataProd[value.id] = value.qty
                }
            })
        }
        localStorage.setItem("dataCart", JSON.stringify(dataProd));
        setCart(newData)
        if (dataProd) {
            if (Object.keys(dataProd).length > 0) {
                Object.keys(dataProd).map((key, index) => {
                    amount = amount + dataProd[key]
                })
            }
        }
        localStorage.setItem("dataQty", JSON.stringify(amount));

    }
    function DownQty(e) {
        let id = e.target.id
        let newData = [...getCart]
        if (newData.length > 0) {
            newData.map((value, key) => {
                if (id == value.id && value.qty > 1) {
                    newData[key].qty--
                    dataProd[value.id] = value.qty
                }
            })
        }
        localStorage.setItem("dataCart", JSON.stringify(dataProd));
        setCart(newData)

        if (dataProd) {
            if (Object.keys(dataProd).length > 0) {
                Object.keys(dataProd).map((key, index) => {
                    amount = amount + dataProd[key]
                })
            }
        }
        localStorage.setItem("dataQty", JSON.stringify(amount));
    }
    function DeleteProd(e) {
        let idDel = e.target.id
        let dataDelete = [...getCart]

        function check(item) {
            return item['id'] != idDel
        }

        if (dataDelete.length > 0) {
            dataDelete.map((value, key) => {
                if (idDel == value.id) {
                    let dataApi = dataDelete.filter(check)
                    setCart(dataApi)
                }
            })
        }

        let datalocal = [];
        let getlocal = localStorage.getItem("dataCart");
        if (getlocal) {
            datalocal = JSON.parse(getlocal)
            if (datalocal[idDel]) {
                delete datalocal[idDel]
            }
        }
        console.log(datalocal);
        if (datalocal)
            localStorage.setItem("dataCart", JSON.stringify(datalocal));

        if (datalocal) {
            if (Object.keys(datalocal).length > 0) {
                Object.keys(datalocal).map((key, index) => {
                    console.log(datalocal);
                    amount = amount + datalocal[key]
                })
            }
        }
        localStorage.setItem("dataQty", JSON.stringify(amount));
    }

    function renderProd() {
        if (getCart.length > 0) {
            return getCart.map((value, key) => {
                let Total = value.price * value.qty
                var myObject = JSON.parse(value.image);
                return (
                    <tr key={key}>
                        <td className="cart_product">
                            <Link to="">
                                <img style={{ width: "120px", height: "70px" }} src={"http://localhost/laravel8/public/upload/product/" + value.id_user + "/" + myObject[0]} alt="" />
                            </Link>
                        </td>
                        <td className="cart_description">
                            <h4><Link to="">{value.name}</Link></h4>
                            <p>Web ID: {value.id}</p>
                        </td>
                        <td className="cart_price">
                            <p>${value.price}</p>
                        </td>
                        <td className="cart_quantity">
                            <div className="cart_quantity_button">
                                <Link to="" onClick={UpQty} id={value.id} className="cart_quantity_up" > + </Link>
                                <input className="cart_quantity_input" type="text" name="quantity" value={value.qty} autoComplete="off" size={2} />
                                <Link to="" onClick={DownQty} id={value.id} className="cart_quantity_down" > - </Link>
                            </div>
                        </td>
                        <td className="cart_total">
                            <p className="cart_total_price">${Total}</p>
                        </td>
                        <td onClick={DeleteProd} className="cart_delete">
                            <Link to="" id={value.id} className="cart_quantity_delete" ><i id={value.id} className="fa fa-times" /></Link>
                        </td>
                    </tr>
                )
            })
        }
    }
    function cartTotal() {
        let tong = 0;
        let total = 0
        let EcoTax = 0;
        if (getCart.length > 0) {
            getCart.map((value, key) => {
                let amount = value.qty * value.price;
                tong = tong + amount
                EcoTax = tong * 2/1000;
                total = tong + EcoTax
            })
        }
        return (
            <div className="col-sm-6">
                <div className="total_area">
                    <ul>
                        <li>Cart Sub Total <span>${tong}</span></li>
                        <li>Eco Tax <span>${EcoTax}</span></li>
                        <li>Shipping Cost <span>Free</span></li>
                        <li>Total <span>${total}</span></li>
                    </ul>
                    <a className="btn btn-default update" href>Update</a>
                    <a className="btn btn-default check_out" href>Check Out</a>
                </div>
            </div>
        )
    }
    return (
        <>
            <section id="cart_items">
                <div className="container">
                    <div className="breadcrumbs">
                        <ol className="breadcrumb">
                            <li><Link to="/home">Home</Link></li>
                            <li className="active">Shopping Cart</li>
                        </ol>
                    </div>
                    <div className="table-responsive cart_info">
                        <table className="table table-condensed">
                            <thead>
                                <tr className="cart_menu">
                                    <td className="image">Item</td>
                                    <td className="description" />
                                    <td className="price">Price</td>
                                    <td className="quantity">Quantity</td>
                                    <td className="total">Total</td>
                                    <td />
                                </tr>
                            </thead>
                            <tbody>
                                {renderProd()}
                                {/* <tr>
                                <td className="cart_product">
                                    <Link to=""><img src="images/cart/one.png" alt="" /></Link>
                                </td>
                                <td className="cart_description">
                                    <h4><a href>Colorblock Scuba</a></h4>
                                    <p>Web ID: 1089772</p>
                                </td>
                                <td className="cart_price">
                                    <p>$59</p>
                                </td>
                                <td className="cart_quantity">
                                    <div className="cart_quantity_button">
                                        <a className="cart_quantity_up" href> + </a>
                                        <input className="cart_quantity_input" type="text" name="quantity" defaultValue={1} autoComplete="off" size={2} />
                                        <a className="cart_quantity_down" href> - </a>
                                    </div>
                                </td>
                                <td className="cart_total">
                                    <p className="cart_total_price">$59</p>
                                </td>
                                <td className="cart_delete">
                                    <a className="cart_quantity_delete" href><i className="fa fa-times" /></a>
                                </td>
                            </tr>
                            <tr>
                                <td className="cart_product">
                                    <a href><img src="images/cart/two.png" alt="" /></a>
                                </td>
                                <td className="cart_description">
                                    <h4><a href>Colorblock Scuba</a></h4>
                                    <p>Web ID: 1089772</p>
                                </td>
                                <td className="cart_price">
                                    <p>$59</p>
                                </td>
                                <td className="cart_quantity">
                                    <div className="cart_quantity_button">
                                        <a className="cart_quantity_up" href> + </a>
                                        <input className="cart_quantity_input" type="text" name="quantity" defaultValue={1} autoComplete="off" size={2} />
                                        <a className="cart_quantity_down" href> - </a>
                                    </div>
                                </td>
                                <td className="cart_total">
                                    <p className="cart_total_price">$59</p>
                                </td>
                                <td className="cart_delete">
                                    <a className="cart_quantity_delete" href><i className="fa fa-times" /></a>
                                </td>
                            </tr>
                            <tr>
                                <td className="cart_product">
                                    <a href><img src="images/cart/three.png" alt="" /></a>
                                </td>
                                <td className="cart_description">
                                    <h4><a href>Colorblock Scuba</a></h4>
                                    <p>Web ID: 1089772</p>
                                </td>
                                <td className="cart_price">
                                    <p>$59</p>
                                </td>
                                <td className="cart_quantity">
                                    <div className="cart_quantity_button">
                                        <a className="cart_quantity_up" href> + </a>
                                        <input className="cart_quantity_input" type="text" name="quantity" defaultValue={1} autoComplete="off" size={2} />
                                        <a className="cart_quantity_down" href> - </a>
                                    </div>
                                </td>
                                <td className="cart_total">
                                    <p className="cart_total_price">$59</p>
                                </td>
                                <td className="cart_delete">
                                    <a className="cart_quantity_delete" href><i className="fa fa-times" /></a>
                                </td>
                            </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section id="do_action">
                <div className="container">
                    <div className="heading">
                        <h3>What would you like to do next?</h3>
                        <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="chose_area">
                                <ul className="user_option">
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Coupon Code</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Gift Voucher</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Estimate Shipping &amp; Taxes</label>
                                    </li>
                                </ul>
                                <ul className="user_info">
                                    <li className="single_field">
                                        <label>Country:</label>
                                        <select>
                                            <option>United States</option>
                                            <option>Bangladesh</option>
                                            <option>UK</option>
                                            <option>India</option>
                                            <option>Pakistan</option>
                                            <option>Ucrane</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>
                                    </li>
                                    <li className="single_field">
                                        <label>Region / State:</label>
                                        <select>
                                            <option>Select</option>
                                            <option>Dhaka</option>
                                            <option>London</option>
                                            <option>Dillih</option>
                                            <option>Lahore</option>
                                            <option>Alaska</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>
                                    </li>
                                    <li className="single_field zip-field">
                                        <label>Zip Code:</label>
                                        <input type="text" />
                                    </li>
                                </ul>
                                <a className="btn btn-default update" href>Get Quotes</a>
                                <a className="btn btn-default check_out" href>Continue</a>
                            </div>
                        </div>
                        {cartTotal()}
                    </div>
                </div>
            </section>
        </>
    );
}
export default Cart