import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
function Product() {
  const userData = JSON.parse(localStorage.getItem('dataLogin'));
  const [dataProduct, setProduct] = useState({});
  let accessToken = userData.token;
  let config = {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    }
  };
  useEffect(() => {
    axios.get("http://localhost/laravel8/public/api/user/my-product", config)
      .then(res => {
        // console.log(res.data.data);
        setProduct(res.data.data)
      })
      .catch(error => console.log(error))
  }, [])
  function deleteID(e) {
    let idDelete = e.target.id;
    axios.get("http://localhost/laravel8/public/api/user/product/delete/" + idDelete , config)
      .then(res => {
        console.log(res.data.data);
        setProduct(res.data.data)
      })
      .catch(error => console.log(error))
    console.log(idDelete);
  }
  function renderProduct() {
    if (Object.keys(dataProduct).length > 0) {
      return Object.keys(dataProduct).map((key, index) => {
        console.log(dataProduct[key]['image']);
        var myObject = JSON.parse(dataProduct[key]['image']);
        console.log(myObject);
        return (
          <tbody key={key}>
            <tr>
              <td className="cart_id">
                {dataProduct[key]['id']}
              </td>
              <td className="cart_description">
                {dataProduct[key]['name']}
              </td>
              <td style={{borderTop: "none"}} className="cart_product">
                <Link to="">
                  <img style={{width: "120px", height: "70px"}} src={"http://localhost/laravel8/public/upload/product/" + dataProduct[key]['id_user'] + "/" + myObject[0]} alt=""/>
                </Link>
              </td>
              <td className="cart_price">
                ${dataProduct[key]['price']}
              </td>
              <td className='cart_update'>
                <Link to={"/account/my-product/update/" + dataProduct[key]['id']} id={dataProduct[key]['id']} className="btn btn-primary" style={{float: "left"}} >Update Product</Link>
              </td>
              <td style={{borderTop: "none"}} className="cart_delete">
                <Link to="" onClick={deleteID} id={dataProduct[key]['id']} className="cart_quantity_delete" style={{background: "#FE980F"}} ><i id={dataProduct[key]['id']} className="fa fa-times" /></Link>
              </td>
            </tr>
          </tbody>
        )
      })
    }
  }
  return (
    <section id="cart_items">
      <div className="container">
        <div className="table-responsive cart_info">
          <table style={{ width: "75%" }} className="table table-condensed">
            <thead>
              <tr className="cart_menu">
                <td className="ID">ID</td>
                <td className="Name">Name</td>
                <td className="image">Image</td>
                <td className="price">Price</td>
                <td className="quantity">Update</td>
                <td className="Action">Delete</td>
                <td />
              </tr>
            </thead>
            {renderProduct()}
          </table>
          <Link to="/account/create-product" className="btn btn-primary" style={{float: "right"}} >Add News Product</Link>
        </div>
      </div>
    </section>
  );
}
export default Product;