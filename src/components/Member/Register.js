import { useState } from 'react'
import Errors from './Errors';
import axios from "axios";
function Register() {
    const [getResult, setResult] = useState("");
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
    })
    const [errors, setErrors] = useState({});
    const [selectFile, setFile] = useState("");
    const [getAvatar, setAvatar] = useState("");

    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({ ...state, [nameInput]: value }))
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
        let flag = true;
        let errorsSubmit = {};
        if (inputs.name === "") {
            errorsSubmit.name = "Vui lòng nhập name"
            flag = false;
        }
        if (inputs.email === "") {
            errorsSubmit.email = "Vui lòng nhập email"
            flag = false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inputs.email)) {
            errorsSubmit.email = "Email nhập chưa đúng";
            flag = false;
        }
        if (inputs.password === "") {
            errorsSubmit.password = "Vui lòng nhập password"
            flag = false;
        }
        if (inputs.phone === "") {
            errorsSubmit.phone = "Vui lòng nhập phone"
            flag = false;
        }
        if (inputs.address === "") {
            errorsSubmit.address = "Vui lòng nhập address"
            flag = false;
        }
        if (selectFile === "") {
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
        if (flag === true) {
            const data = {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
                phone: inputs.phone,
                address: inputs.address,
                avatar: getAvatar,
                level: 0
            }
            console.log(data);
            axios.post('http://localhost/laravel8/public/api/register', data)
            .then(res => {
                if(res.data.errors) {
                    console.log(res);
                    setErrors(res.data.errors)
                } else {
                    setErrors("")
                    setResult("Đăng ký thành công");
                }
            })
            .catch(error => console.log(error))
        } else {
            setErrors(errorsSubmit)
        }
    }
    return (
        <div className="col-sm-4">
            <div className="signup-form">{/*sign up form*/}
                <h2>New User Signup!</h2>
                <h2>{getResult}</h2>
                <ul className='error-form'><Errors errors={errors} /></ul>
                <form action="#" encType="multipart/form-data" onSubmit={xulyForm}>
                    <input type="text" placeholder="Name" name='name' onChange={handleInput} />
                    <input type="email" placeholder="Email Address" name='email' value={inputs.email} onChange={handleInput} />
                    <input type="password" placeholder="Password" name='password' value={inputs.password} onChange={handleInput} />
                    <input type="text" placeholder="Phone" name='phone' onChange={handleInput} />
                    <input type="text" placeholder="Address" name='address' onChange={handleInput} />
                    <input type="file" name='file' onChange={hanldeFile} />
                    <button type="submit" className="btn btn-default">Signup</button>
                </form>
            </div>{/*/sign up form*/}
        </div>
    )
}
export default Register;