import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
function BlogIndex() {
  const [blogdata, setBlog] = useState([]);
  useEffect(() => {
    axios.get("http://localhost/laravel8/public/api/blog")
      .then(res => {
        console.log(res);
        setBlog(res.data.blog.data)
      })
      .catch(error => console.log(error))
    }, [])
  function renderData() {
    if (blogdata.length > 0) {
      return blogdata.map((value, key) => {
        return (
            <div className="single-blog-post" key={key}>
              <h3>{value.title}</h3>
              <div className="post-meta">
                <ul>
                  <li><i className="fa fa-user" /> Mac Doe</li>
                  <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                  <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                </ul>
                <span>
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-half-o" />
                </span>
              </div>
              <Link to={"/blog/detail/" + value['id']}>
                <img src={"http://localhost/laravel8/public/upload/Blog/image/" + value['image']} alt=""/>
              </Link>
              <p>{value.description}</p>
              <Link to={"/blog/detail/" + value['id']} className="btn btn-primary" >Read More</Link>
            </div>
        )
      })
    }
  }
  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
          {renderData()}
        <div className="pagination-area">
          <ul className="pagination">
            <li><Link to="" className="active">1</Link></li>
            <li><Link to="">2</Link></li>
            <li><Link to="">3</Link></li>
            <li><Link to=""><i className="fa fa-angle-double-right" /></Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default BlogIndex;