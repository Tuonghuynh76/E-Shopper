import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ListCmt from './ListCmt.';
import Comment from './Comment';
import axios from "axios";
import Rate from './Rate';
function Detail(props) {
    const [detailData, setDetail] = useState([]);
    const [dataCmt, setDataCmt] = useState({})
    const [getIDuser, setID] = useState("")
    let params = useParams()
    useEffect(() => {
        axios.get(`http://localhost/laravel8/public/api/blog/detail/` + params.id)
            .then(res => {
                // console.log(res.data);
                setDataCmt(res.data.data.comment)
                setDetail(res.data.data)
            })
            .catch(error => console.log(error))
    }, [])

    function getCmt(data) {
        let Cmt = dataCmt.concat(data.data)
        setDataCmt(Cmt)
    }
    function getID(data) {
        setID(data)
    }
    function renderData() {
        return (
            <div className="single-blog-post" >
                <h3>{detailData.title}</h3>
                <div className="post-meta">
                    <ul>
                        <li><i className="fa fa-user" /> Mac Doe</li>
                        <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                        <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                </div>
                <Link to="">
                    <img src={"http://localhost/laravel8/public/upload/Blog/image/" + detailData['image']} alt="" />
                </Link>
                <p>{detailData.content}</p>
            </div>
        )
    }
    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                <div className="single-blog-post">
                    {/* <h3>Girls Pink T Shirt arrived in store</h3> */}
                    {/* <div className="post-meta">
                        <ul>
                            <li><i className="fa fa-user" /> Mac Doe</li>
                            <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                            <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                        </ul>
                    </div> */}
                    {/* <Link to="">
                        <img src="../../images/blog/blog-one.jpg" alt="" />
                    </Link> */}
                    {renderData()}
                    {/* <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p> <br />
                    <p>
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p> <br />
                    <p>
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p> <br />
                    <p>
                        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                    </p> */}
                    <div className="pager-area">
                        <ul className="pager pull-right">
                            <li><Link to="">Pre</Link></li>
                            <li><Link to="">Next</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <Rate />
            <div className="socials-share">
                <Link to=""><img src="../../images/blog/socials.png" alt="" /></Link>
            </div>
            <ListCmt getID={getID} CommentUser={dataCmt} />
            <Comment IDuser={getIDuser} getCmt={getCmt}/>
        </div>
    )
}
export default Detail