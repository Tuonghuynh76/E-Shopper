import Login from "./Login";
import Register from "./Register";
function IndexLogin() {
    return (
        <section id="form">{/*form*/}
            <div className="container">
                <div className="row">
                    <Login />
                    <Register />
                </div>
            </div>
        </section>
    );
}
export default IndexLogin;