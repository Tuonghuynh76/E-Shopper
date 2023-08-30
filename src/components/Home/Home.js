import { Link } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from 'react';
import { AddProduct } from '../../action/cart';
import { useDispatch } from 'react-redux';
function Home() {
    let dispatch = useDispatch();
    const [prodData, setProd] = useState([]);
    let id;
    const userData = JSON.parse(localStorage.getItem('dataLogin'));
    if(userData) {
        const idUser = userData.Auth.id
        id = idUser
    }
    useEffect(() => {
        fecthData()
    }, [])
    async function fecthData() {
        try {
            const res = await axios.get("http://localhost/laravel8/public/api/product")
            setProd(res.data.data)
        } catch (error) {
            console.error("Đã xảy ra lỗi! ", error);
        }
    }
    function AddProd(e) {
        let idProd = e.target.id
        let objProd = {}
        let xx = 1
        let checkLogin = JSON.parse(localStorage.getItem('checkLogin'))
        if(checkLogin) {
            let dataProd = JSON.parse(localStorage.getItem('dataCart'))
            if(dataProd) {
                objProd = dataProd
                if(objProd[idProd]) {
                    objProd[idProd] = objProd[idProd] + 1
                    xx = 2
                }
            }
            if(xx == 1) {
                objProd[idProd] = 1 
            }
            localStorage.setItem("dataCart", JSON.stringify(objProd));

            let tongQty = 0
                if(Object.keys(objProd).length > 0) {
                    Object.keys(objProd).map((key, index) => {
                        tongQty = tongQty + objProd[key]
                    })
                }
            const newQty = {
                qtyProduct: tongQty,
            }
            const action = AddProduct(newQty);
            dispatch(action);
        } else {
            alert('Vui lòng đăng nhập')
        }
    }

    function AddWishlist(e) {
        let idWish = e.target.id
        let datalist = [];
        let x = 1
        let checkLogin = JSON.parse(localStorage.getItem('checkLogin'))
        if(checkLogin) {
            let wishlist = localStorage.getItem("wishlist");
            if (wishlist) {
                datalist = JSON.parse(wishlist);
                if(datalist.length > 0) {
                    datalist.map((value, key) => {
                        // console.log(datalist);
                        if(value == idWish) {
                            alert("Sản phẩm này đã có trong list")
                             x = 2
                        }
                    })
                }
                if(x == 1) {
                    datalist.push(idWish);
                }
            }
            let newList = [...datalist];
            localStorage.setItem("wishlist", JSON.stringify(newList));
        } else {
            alert('Vui lòng đăng nhập')
        }
    }
    function renderData() {
        if (prodData.length > 0) {
            return prodData.map((value, key) => {
                var myObject = JSON.parse(value['image']);
                return (
                    <div key={key} className="col-sm-4">
                        <div className="product-image-wrapper">
                            <div className="single-products">
                                <div className="productinfo text-center">
                                    <img src={"http://localhost/laravel8/public/upload/product/" + id + "/" + myObject[0]} alt="Product"/>
                                    <h2>${value.price}</h2>
                                    <p>{value.name}</p>
                                    <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                </div>
                                <div className="product-overlay">
                                    <div className="overlay-content">
                                        <Link to={"/product/detail/" + value.id} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />More</Link>
                                        <h2>${value.price}</h2>
                                        <p>{value.name}</p>
                                        <Link to="" onClick={AddProd} id={value.id} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="choose">
                                <ul className="nav nav-pills nav-justified">
                                    <li onClick={AddWishlist} ><Link to="" id={value.id}><i className="fa fa-plus-square" />Add to wishlist</Link></li>
                                    <li><Link to=""><i className="fa fa-plus-square" />Add to compare</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }
    return (
        <div className="col-sm-9 padding-right">
            <div className="features_items">{/*features_items*/}
                <h2 className="title text-center">Features Items</h2>
                {renderData()}
            </div>{/*features_items*/}
            <div className="category-tab">{/*category-tab*/}
                <div className="col-sm-12">
                    <ul className="nav nav-tabs">
                        <li className="active"><a href="#tshirt" data-toggle="tab">T-Shirt</a></li>
                        <li><a href="#blazers" data-toggle="tab">Blazers</a></li>
                        <li><a href="#sunglass" data-toggle="tab">Sunglass</a></li>
                        <li><a href="#kids" data-toggle="tab">Kids</a></li>
                        <li><a href="#poloshirt" data-toggle="tab">Polo shirt</a></li>
                    </ul>
                </div>
                <div className="tab-content">
                    <div className="tab-pane fade active in" id="tshirt">
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="blazers">
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="sunglass">
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="kids">
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="poloshirt">
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>{/*/category-tab*/}
            <div className="recommended_items">{/*recommended_items*/}
                <h2 className="title text-center">recommended items</h2>
                <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="item active">
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="images/home/recommend1.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="images/home/recommend2.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="images/home/recommend3.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="images/home/recommend1.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="images/home/recommend2.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="images/home/recommend3.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to="#recommended-item-carousel" className="left recommended-item-control" data-slide="prev">
                        <i className="fa fa-angle-left" />
                    </Link>
                    <Link to="#recommended-item-carousel" className="right recommended-item-control" data-slide="next">
                        <i className="fa fa-angle-right" />
                    </Link>
                </div>
            </div>{/*/recommended_items*/}
        </div>
    );
}
export default Home;