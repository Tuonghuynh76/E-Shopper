import { useState } from 'react'
import Errors from './Errors';
import axios from "axios";
import { useNavigate } from "react-router-dom"
function Login() {
    const navigate = useNavigate();
    const [getResult, setResult] = useState("");
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        level: 0
    })
    const [errors, setErrors] = useState({});
    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({ ...state, [nameInput]: value }))
    }
    function xulyLogin(e) {
        e.preventDefault()
        let flag = true;
        let errorsSubmit = {};
        if (inputs.email === "") {
            errorsSubmit.email = "Vui lòng nhập email!"
            flag = false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inputs.email)) {
            errorsSubmit.email = "Email nhập chưa đúng!";
            flag = false;
        }
        if (inputs.password === "") {
            errorsSubmit.password = "Vui lòng nhập password!"
            flag = false;
        }
        if (flag === true) {
            axios.post('http://localhost/laravel8/public/api/login', inputs)
            .then(res => {
                if(res.data.errors) {
                    setErrors(res.data.errors)
                } else {
                    console.log(res.data);
                    const userLogin = true;
                    localStorage.setItem("dataLogin", JSON.stringify(res.data));
                    localStorage.setItem("checkLogin", JSON.stringify(userLogin));
                    setErrors("")
                    setResult("✔ Đăng nhập thành công");
                    navigate('/');
                }
            })
            .catch(error => console.log(error))
        } else {
            setErrors(errorsSubmit)
        }
    }
    return (
        <div className="col-sm-4 col-sm-offset-1">
            <div className="login-form">{/*login form*/}
                <h2>Login to your account</h2>
                <h2>{getResult}</h2>
                <ul className='error-form'><Errors errors={errors} /></ul>
                <form action="#" onSubmit={xulyLogin}>
                    <input type="email" placeholder="Email Address" name='email' value={inputs.email} onChange={handleInput} />
                    <input type="password" placeholder="Password" name='password' value={inputs.password} onChange={handleInput} />
                    <span>
                        <input type="checkbox" className="checkbox" />
                        Keep me signed in
                    </span>
                    <button type="submit" className="btn btn-default">Login</button>
                </form>
            </div>{/*/login form*/}
        </div>
    );
}
export default Login;