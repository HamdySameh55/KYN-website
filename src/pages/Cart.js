// src/pages/Cart.jsx
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return <div style={{textAlign:"center", padding:"100px", color:"#fff", background:"#000"}}>
      <h2>Your cart is empty</h2>
      <Link to="/product">Continue Shopping</Link>
    </div>;
  }

  return (
    <div style={{minHeight:"100vh", background:"#000", color:"#fff", padding:"60px 20px"}}>
      <h1 style={{textAlign:"center", marginBottom:"40px"}}>Your Cart ({cart.length} items)</h1>
      {cart.map(item => (
        <motion.div key={item.id} style={{display:"flex", gap:"20px", padding:"20px", background:"#111", marginBottom:"20px", borderRadius:"15px"}}>
          <img src={item.image} alt="" style={{width:"100px", borderRadius:"10px"}} />
          <div style={{flex:1}}>
            <h3>{item.name}</h3>
            <p>{item.price}</p>
            <div style={{display:"flex", alignItems:"center", gap:"10px", marginTop:"10px"}}>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => removeFromCart(item.id)} style={{marginLeft:"20px", color:"red"}}>Remove</button>
            </div>
          </div>
        </motion.div>
      ))}
      <div style={{textAlign:"center", marginTop:"40px"}}>
        <h2>Total: {cartTotal.toFixed(2)} EGP</h2>
        <button style={{padding:"15px 40px", background:"#fff", color:"#000", border:"none", borderRadius:"30px", fontSize:"1.2rem", marginTop:"20px"}}>
          Checkout
        </button>
      </div>
    </div>
  );
}