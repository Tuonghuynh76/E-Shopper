import axios from "axios";
import StarRatings from 'react-star-ratings';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
function Rate() {
    const checkUser = JSON.parse(localStorage.getItem('checkLogin'));
    const userData = JSON.parse(localStorage.getItem('dataLogin'));
    let Idblog = useParams();
    const [rating, setRating] = useState(0)
    useEffect(() => {
        axios.get(`http://localhost/laravel8/public/api/blog/rate/` + Idblog.id)
            .then(res => {
                let sum = 0;
                if (Object.keys(res.data.data).length > 0) {
                    Object.keys(res.data.data).map((key, index) => {
                        sum += res.data.data[key]["rate"]
                    })
                    sum = sum / Object.keys(res.data.data).length
                    setRating(sum)
                    console.log(rating);
                }
            })
            .catch(error => console.log(error))
    }, [])
    function changeRating(newRating, name) {
        if (!checkUser) {
            alert("Vui lòng đăng nhập")
        } else if (checkUser) {
            let url = "http://localhost/laravel8/public/api/blog/rate/" + Idblog.id
            let accessToken = userData.token;
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            const formData = new FormData();
            formData.append('blog_id', Idblog.id);
            formData.append('user_id', userData.Auth.id);
            formData.append('rate', newRating);
            axios.post(url, formData, config)
                .then(res => {
                    console.log(res);
                })
                .catch(error => console.log(error))
        }
    }
    return (
        <StarRatings
            rating={rating}
            starRatedColor="blue"
            changeRating={changeRating}
            numberOfStars={6}
            name='rating'
        />
    );
}
export default Rate;