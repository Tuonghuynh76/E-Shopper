import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
function ProdDetail() {
    let params = useParams()
    const [prodDetail, setProd] = useState({});
    const [imgDetail, setImg] = useState()
    useEffect(() => {
        fecthData()
    }, [])
    async function fecthData() {
        try {
            const res = await axios.get("http://localhost/laravel8/public/api/product/detail/" + params.id)
            // console.log(res);
            setProd(res.data.data)
            setImg(res.data.data.image)
        } catch (error) {
            console.error("Đã xảy ra lỗi! ", error);
        }
    }
    function renderSale() {
        if (prodDetail.status == 0) {
            return (
                <p><b>Condition:</b> Sale {prodDetail.sale}%</p>
            )
        } else {
            return (
                <p><b>Condition:</b> New</p>
            )
        }
    }
    function renderSmall() {
        if (imgDetail) {
            var myObj = JSON.parse(imgDetail)
                return myObj.map((value, key) => {
                    return (
                         <Link to="" key={key}><img style={{width: "84px", height: "84px"}} src={"http://localhost/laravel8/public/upload/product/" + prodDetail.id_user + "/" + value} alt="#" /></Link>
                    )
                })
        }
    }
    function renderImg() {
        if (imgDetail) {
            var myObj = JSON.parse(imgDetail)
                return (
                    <div className="view-product">
                        <img src={"http://localhost/laravel8/public/upload/product/" + prodDetail.id_user + "/" + myObj[0]} alt="" />
                        <Link to="" rel="prettyPhoto"><h3>ZOOM</h3></Link>
                    </div>
                )
        }
    }
    function renderData() {
        return (
            <div className="col-sm-7">
                <div className="product-information">{/*/product-information*/}
                    <img src="../../images/product-details/new.jpg" className="newarrival" alt="" />
                    <h2>{prodDetail.name}</h2>
                    <p>Web ID: {prodDetail.id}</p>
                    <img src="../../images/product-details/rating.png" alt="" />
                    <span>
                        <span>US ${prodDetail.price}</span>
                        <label>Quantity:</label>
                        <input type="text" defaultValue={3} />
                        <button type="button" className="btn btn-fefault cart">
                            <i className="fa fa-shopping-cart" />
                            Add to cart
                        </button>
                    </span>
                    <p><b>Availability:</b> In Stock</p>
                    {/* <p><b>Condition:</b> New</p> */}
                    {renderSale()}
                    <p><b>Brand:</b> E-SHOPPER</p>
                    <Link to=""><img src="../../images/product-details/share.png" className="share img-responsive" alt="" /></Link>
                </div>{/*/product-information*/}
            </div>
        )
    }
    return (
        <div className="col-sm-9 padding-right">
            <div className="product-details">
                <div className="col-sm-5">
                    {renderImg()}
                    <div id="similar-product" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="item active">
                                {renderSmall()}
                            </div>
                        </div>
                        <Link to="" className="left item-control" data-slide="prev">
                            <i className="fa fa-angle-left" />
                        </Link>
                        <Link to="" className="right item-control" data-slide="next">
                            <i className="fa fa-angle-right" />
                        </Link>
                    </div>
                </div>
                {renderData()}
            </div>{/*/product-details*/}
            <div className="category-tab shop-details-tab">{/*category-tab*/}
                <div className="col-sm-12">
                    <ul className="nav nav-tabs">
                        <li><Link to="" data-toggle="tab">Details</Link></li>
                        <li><Link to="" data-toggle="tab">Company Profile</Link></li>
                        <li><Link to="" data-toggle="tab">Tag</Link></li>
                        <li className="active"><Link to="" data-toggle="tab">Reviews (5)</Link></li>
                    </ul>
                </div>
                <div className="tab-content">
                    <div className="tab-pane fade" id="details">
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="companyprofile">
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="tag">
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade active in" id="reviews">
                        <div className="col-sm-12">
                            <ul>
                                <li><Link to=""><i className="fa fa-user" />EUGEN</Link></li>
                                <li><Link to=""><i className="fa fa-clock-o" />12:41 PM</Link></li>
                                <li><Link to=""><i className="fa fa-calendar-o" />31 DEC 2014</Link></li>
                            </ul>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            <p><b>Write Your Review</b></p>
                            <form action="#">
                                <span>
                                    <input type="text" placeholder="Your Name" />
                                    <input type="email" placeholder="Email Address" />
                                </span>
                                <textarea name defaultValue={""} />
                                <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                                <button type="button" className="btn btn-default pull-right">
                                    Submit
                                </button>
                            </form>
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
                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to="" className="left recommended-item-control" data-slide="prev">
                        <i className="fa fa-angle-left" />
                    </Link>
                    <Link to="" className="right recommended-item-control" data-slide="next">
                        <i className="fa fa-angle-right" />
                    </Link>
                </div>
            </div>{/*/recommended_items*/}
        </div>
    );
}
export default ProdDetail;