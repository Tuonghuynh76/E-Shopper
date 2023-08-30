import axios from "axios";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
function Wishlist() {
    const [wishlist, setWish] = useState([]);
    const listLocal = JSON.parse(localStorage.getItem('wishlist'));
    useEffect(() => {
        fecthData()
    }, [])
    async function fecthData() {
        try {
            const res = await axios.get("http://localhost/laravel8/public/api/product/list")
            // console.log(res.data.data.data);
            setWish(res.data.data.data)
        } catch (error) {
            console.error("Đã xảy ra lỗi! ", error)
        }
    }
    function checkAdult(wishlist) {
        let arr = []
        if(listLocal) {
          if (Object.keys(wishlist).length > 0) {
              Object.keys(wishlist).map((key, index) => {
                  if (listLocal.length > 0) {
                      listLocal.map((value2, key2) => {
                          if (wishlist['id'] == value2) {
                              arr = wishlist
                          }
                      })
                  }
              })
          }
        }
        return wishlist == arr
    }
    const result = wishlist.filter(checkAdult);
    function renderList() {
        if (result.length > 0) {
            return result.map((value, key) => {
                var myObject = JSON.parse(value['image']);
                return (
                    <div className="col-sm-4">
                        <div className="product-image-wrapper">
                            <div className="single-products">
                                <div className="productinfo text-center">
                                    <img src={"http://localhost/laravel8/public/upload/product/" + value.id_user + "/" + myObject[0]} alt="Product" />
                                    <h2>${value.price}</h2>
                                    <p>{value.name}</p>
                                    <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                </div>
                                <div className="product-overlay">
                                    <div className="overlay-content">
                                        <Link to={"/product/detail/" + value.id} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />More</Link>
                                        <h2>${value.price}</h2>
                                        <p>{value.name}</p>
                                        <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="choose">
                                <ul className="nav nav-pills nav-justified">
                                    <li><Link to=""><i className="fa fa-plus-square" />Add to wishlist</Link></li>
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
            <div className="features_items">
                <h2 className="title text-center">Wishlist Items</h2>
                {renderList()}
            </div>
        </div>
    );
}
export default Wishlist