import { Link } from 'react-router-dom';
import { useState } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';
function Comment(props) {
    let idReply = props.IDuser
    let idBlog = useParams()
    const [getComment, setComment] = useState("");
    const [errors, setErrors] = useState("");
    let checkUser = JSON.parse(localStorage.getItem('checkLogin'));
    function handleInput(e) {
        setComment(e.target.value)
    }
    function checkLogin(e) {
        let userData = JSON.parse(localStorage.getItem('dataLogin'));
        console.log(userData);
        if (checkUser) {
            let accessToken = userData.token;
            let url = "http://localhost/laravel8/public/api/blog/comment/" + idBlog.id
            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
            };
            if(getComment == "") {
                setErrors("vui lòng comment")
            } else {
                const formData = new FormData();
                formData.append('id_blog', idBlog.id);
                formData.append('id_user', userData.Auth.id);
                formData.append('id_comment', idReply ? idReply : 0);
                formData.append('comment', getComment);
                formData.append('image_user', userData.Auth.avatar);
                formData.append('name_user', userData.Auth.name);
                axios.post(url,formData, config)
                .then(res => {
                    console.log(res);
                    props.getCmt(res.data)
                    setErrors("")
                })
                .catch(error => console.log(error))
            }
        } else {
            alert("Vui long dang nhap")
        }
    }
    return (
        <div className="replay-box">
            <div className="row">
                <div className="col-sm-12">
                    <h2>Leave a replay</h2>
                    <div className="text-area">
                        <div className="blank-arrow">
                            <label>Your Name</label>
                        </div>
                        <span>*{errors}</span>
                        <textarea name="message" rows={11} value={getComment} onChange={handleInput} />
                        <Link to="" onClick={checkLogin} className="btn btn-primary" >post comment</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Comment;