import { useEffect, useState } from 'react';
import axios from "axios";
import Errors from './Errors';
import { useNavigate } from "react-router-dom"

function Account() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [selectFile, setFile] = useState("");
    const [getAvatar, setAvatar] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
    });
    useEffect(() => {
        let userData = localStorage.getItem("dataLogin");
        if(userData) {
            userData = JSON.parse(userData);
            userData = userData.Auth
            setUser({
                name: userData.name,
                email: userData.email,
                address: userData.address,
                phone: userData.phone,
            });
        } else {
            alert("Vui lòng đăng nhập")
            navigate("/login")
        }
    }, [])
    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setUser(state => ({ ...state, [nameInput]: value }))
    }
    function hanldeFile(e) {
        const file = e.target.files;
        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result);
            setFile(file);
        };
        reader.readAsDataURL(file[0]);
    }
    function xulyForm(e) {
        e.preventDefault()
        let userData = JSON.parse(localStorage.getItem('dataLogin'));
        let flag = true;
        let errorsSubmit = {};
        if (user.name == "") {
            errorsSubmit.name = "Vui lòng nhập name"
            flag = false;
        }
        if (user.phone == "") {
            errorsSubmit.phone = "Vui lòng nhập phone"
            flag = false;
        }
        if (user.address == "") {
            errorsSubmit.address = "Vui lòng nhập address"
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
        let url = "http://localhost/laravel8/public/api/user/update/" + userData.Auth.id
        let accessToken = userData.token;
        let config = { 
            headers: { 
            'Authorization': 'Bearer '+ accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
            } 
        };
        if (flag == true) {
            const formData = new FormData();
            formData.append('name', user.name);
            formData.append('email', user.email);
            formData.append('password', user.password ? user.password : "");
            formData.append('phone', user.phone);
            formData.append('address', user.address);
            formData.append('avatar', getAvatar);
            formData.append('level', 0);
            axios.post(url,formData, config)
            .then(res => {
                console.log(res);
                setErrors("")
                alert("Update thành công");
                localStorage.setItem("dataLogin", JSON.stringify(res));
            })
            .catch(error => console.log(error))
        } else {
            setErrors(errorsSubmit)
        }
    }
    return (
        <div className="col-sm-4">
            <div className="signup-form">{/*sign up form*/}
                <h2>Account Update</h2>
                <ul className='error-form'><Errors errors={errors} /></ul>
                <form action="#" encType="multipart/form-data" onSubmit={xulyForm}>
                    <input type="text" placeholder="Name" name='name' value={user.name} onChange={handleInput} />
                    <input type="email" placeholder="Email Address" name='email' readOnly={user.email} value={user.email} onChange={handleInput} />
                    <input type="password" placeholder="Password" name='password' value={user.password} onChange={handleInput} />
                    <input type="text" placeholder="Phone" name='phone' value={user.phone} onChange={handleInput} />
                    <input type="text" placeholder="Address" name='address' value={user.address} onChange={handleInput} />
                    <input type="file" name='file' onChange={hanldeFile} />
                    <button type="submit" className="btn btn-default">Update</button>
                </form>
            </div>{/*/sign up form*/}
        </div>
    )
}
export default Account;