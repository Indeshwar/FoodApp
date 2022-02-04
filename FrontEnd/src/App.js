import {useState} from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
function App() {
  const[isShown, setIsShown] = useState(false)
  
  const ShowCartHandler = ()=>{
    setIsShown(true)
  }

  const HideCartHandler = ()=>{
    setIsShown(false)
  }

  return (
    <CartProvider>
      {isShown && <Cart onHideCart = {HideCartHandler}/>}
      <Header onShowCart = {ShowCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
