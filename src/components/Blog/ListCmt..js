import { Link } from 'react-router-dom';
function ListCmt(props) {
    let { CommentUser } = props;
    function Replay(e) {
        let idUser = e.target.id;
        props.getID(idUser)
    }
    function renderData() {
        if (CommentUser.length > 0) {
            return CommentUser.map((value, key) => {
                if (value.id_comment == 0) {
                    return (
                        <>
                            <li key={key} className="media" >
                                <Link to="" className="pull-left">
                                    <img style={{ width: "121px", height: "86px" }} src={"http://localhost/laravel8/public/upload/user/avatar/" + value.image_user} alt='Avatar' />
                                </Link>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user" />{value.name_user}</li>
                                        <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                        <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                    </ul>
                                    <p>{value.comment}</p>
                                    <Link to="" onClick={Replay} id={value.id} className="btn btn-primary"><i className="fa fa-reply" />Replay</Link>
                                </div>
                            </li>
                            {CommentUser.map((value2, key2) => {
                                if (value.id == value2.id_comment) {
                                    return (
                                        <li key={key2} index={key2} className="media second-media">
                                            <Link to="" className="pull-left" >
                                                <img style={{ width: "121px", height: "86px" }} src={"http://localhost/laravel8/public/upload/user/avatar/" + value.image_user} alt='Avatar' />
                                            </Link>
                                            <div className="media-body">
                                                <ul className="sinlge-post-meta">
                                                    <li><i className="fa fa-user" />{value2.name_user}</li>
                                                    <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                                    <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                                </ul>
                                                <p>{value2.comment}</p>
                                                <Link to="" onClick={Replay} id={value2.id} className="btn btn-primary" ><i className="fa fa-reply" />Replay</Link>
                                            </div>
                                        </li>
                                    )
                                }
                            })}
                        </>
                    )
                }
            })
        }
    }
    return (
        <div className="response-area">
            <h2>3 RESPONSES</h2>
            <ul className="media-list">
                {renderData()}
            </ul>
        </div>
    );
}
export default ListCmt;