import { useLocation } from "react-router-dom"
import Footer from "./components/Layout/Footer"
import Header from "./components/Layout/Header"
import MenuLeft from "./components/Layout/MenuLeft"
import MenuAcc from "./components/Layout/MenuAcc";
import Slide from "./components/Layout/Slide";
function App(props) {
  let params1 = useLocation();
  function renderMenu() {
    if (params1['pathname'].includes("cart")) {
      return null
    }
    if (params1['pathname'].includes("account")) {
      return (
        <MenuAcc />
      )
    } else {
      return (
        <MenuLeft />
      )
    }
    // return <MenuAcc />
  }
  function Slider() {
   if(params1['pathname'].includes("cart") || params1['pathname'].includes("account") || params1['pathname'].includes("wishlist") || params1['pathname'].includes("blog") || params1['pathname'].includes("login")) {
    return null
   } else {
    return (
      <Slide />
    )
   }
  }
  return (
      <div>
        <Header />
        <section id="slider">
          <div className="container">
            <div className="row">
              {Slider()}
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row">
              {renderMenu()}
              {props.children}
            </div>
          </div>
        </section>
        <Footer />
      </div>
  )
}
export default App