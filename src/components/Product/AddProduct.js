import Errors from '../Member/Errors';
import axios from "axios";
import { useEffect, useState } from 'react';
function AddProduct() {
    const [errors, setErrors] = useState({});
    const [brandData, setBrand] = useState([]);
    const [selectFile, setFile] = useState("");
    const [categoryData, setCategory] = useState([]);
    const [inputs, setInputs] = useState({
        name: "",
        price: "",
        category: "",
        brand: "",
        status: 1,
        image: "",
        sale: 0,
        company: "",
        detail: ""
    })
    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({ ...state, [nameInput]: value }))
    }
    function hanldeFile(e) {
        const file = e.target.files;
        console.log(file);
        setFile(file);
    }
    useEffect(() => {
        axios.get("http://localhost/laravel8/public/api/category-brand")
          .then(res => {
            // console.log(res.data);
            setBrand(res.data.brand)
            setCategory(res.data.category)
          })
          .catch(error => console.log(error))
        }, [])
        function Brand() {
            if (brandData.length > 0) {
                return brandData.map((key, index) => {
                    return (
                        <option key={index} value={key.id}>{key.brand}</option>
                    )
                })
            }
        }
        function Category() {
            if (categoryData.length > 0) {
                return categoryData.map((key, index) => {
                    return (
                        <option key={index} value={key.id}>{key.category}</option>
                    )
                })
            }
        }
        function xulyForm(e) {
            e.preventDefault()
            let flag = true;
            let errorsSubmit = {};
            if (inputs.name == "") {
                errorsSubmit.name = "Vui lòng nhập tên sản phẩm"
                flag = false;
            }
            if (inputs.price == "") {
                errorsSubmit.price = "Vui lòng nhập giá sản phẩm"
                flag = false;
            }
            if (inputs.category == "") {
                errorsSubmit.category = "Vui lòng chọn loại sản phẩm"
                flag = false;
            }
            if (inputs.brand == "") {
                errorsSubmit.brand = "Vui lòng chọn hãng của sản phẩm"
                flag = false;
            }
            if (inputs.status == "0" && inputs.sale == "") {
                errorsSubmit.sale = "Vui lòng chọn mức sale của sản phẩm"
                flag = false;
            }
            if (inputs.company == "") {
                errorsSubmit.company = "Vui lòng nhập nguồn gốc sản phẩm"
                flag = false;
            }
            if (inputs.detail == "") {
                errorsSubmit.detail = "Vui lòng nhập mô tả sản phẩm"
                flag = false;
            }
            if (selectFile == "") {
                errorsSubmit.file = "Vui lòng upload file"
                flag = false;
            } else {
                const sizeMax = 1024 * 1024;
                const typeName = ['png', 'jpeg', 'jpg']
                const splitName = selectFile[0].type.split('/')
                if (selectFile[0].size > sizeMax) {
                    errorsSubmit.file = "Ảnh có kích thước lớn"
                    flag = false;
                } else if (!typeName.includes(splitName[1])) {
                    errorsSubmit.file = "Ảnh không đúng định dạng"
                    flag = false;
                }
            }
            const userData = JSON.parse(localStorage.getItem('dataLogin'));
            let accessToken = userData.token;
            let url = "http://localhost/laravel8/public/api/user/product/add"
            let config = { 
              headers: { 
              'Authorization': 'Bearer '+ accessToken,
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
              } 
            };
            if (flag == true) {
                let formData = new FormData();
                formData.append('name', inputs.name);
                formData.append('price', inputs.price);
                formData.append('category', inputs.category);
                formData.append('brand', inputs.brand);
                formData.append('company', inputs.company);
                formData.append('detail', inputs.detail);
                formData.append('status', inputs.status);
                formData.append('sale', inputs.sale ? inputs.sale : 0);
                Object.keys(selectFile).map((key, index) => {
                    formData.append('file[]', selectFile[key]);
                })
                axios.post(url,formData, config)
                .then(res => {
                    alert("Đăng ký sản phẩm thành công");
                    setErrors("")
                })
                .catch(error => console.log(error))
            } else {
                setErrors(errorsSubmit)
            }
        }
        function renderSale() {
            if(inputs.status == 0) {
                return (
                    <div style={{ width: "200px"}}>
                        <input style={{ width: "100px", float: "left" }} type="text" name='sale' onChange={handleInput} value={inputs.sale} />
                        <span style={{ width: "100px",  height: "40px",float: "left", padding: "9px 2px 0px 5px" }} > %</span>
                    </div>
                )
            }
        }
    return (
        <div className="col-sm-4">
            <div className="signup-form">{/*sign up form*/}
                <h2>Create Product!</h2>
                <ul className='error-form'><Errors errors={errors} /></ul>
                <form style={{width: "800px"}} action="#" encType="multipart/form-data" onSubmit={xulyForm}>
                    <input type="text" placeholder="Name" name='name' onChange={handleInput} value={inputs.name} />
                    <input type="text" placeholder="Price" name='price' onChange={handleInput} value={inputs.price} />
                    <select name="category" onChange={handleInput}>
                        <option value="">Please chose category</option>
                        {Category()}
                    </select>
                    <select name="brand" onChange={handleInput}>
                        <option value="">Please chose brand</option>
                        {Brand()}
                    </select>
                    <select name="status" value={inputs.status} onChange={handleInput}>
                        <option value="0">Sale</option>
                        <option value="1">New</option>
                    </select>
                    {renderSale()}
                    <input type="text" placeholder="Company profile" name='company' onChange={handleInput} value={inputs.company}/>
                    <input type="file" name='file' onChange={hanldeFile} multiple/>
                    <textarea placeholder="Detail" name="detail" onChange={handleInput} value={inputs.detail} rows={4} cols={40} />
                    <button type="submit" className="btn btn-default">Create</button>
                </form>
            </div>
        </div>
    );
}
export default AddProduct;