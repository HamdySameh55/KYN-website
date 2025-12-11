// src/components/Navbar.jsx - Full Cash on Delivery + Optional Second Phone (English Only)

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Menu, Plus, Minus, Trash2, User, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import Logo from '../image/kyn_logo_transparent.png';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [step, setStep] = useState(1); // 1=Cart, 2=Checkout Form, 3=Order Sent
  const [orderSent, setOrderSent] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [secondPhone, setSecondPhone] = useState(''); // Optional second number
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const location = useLocation();
  const { cartCount, cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/product' },
    { name: 'Contact', path: '/contact' },
    { name: 'About', path: '/about' },
  ];

  const FULL_PRICE = 999;
  const SHIPPING_COST = 100;

  const totalAmount = cartItems.reduce((sum, item) => {
    const displayPrice = item.isPreOrder ? FULL_PRICE : parseFloat(item.price.replace(/[^0-9.]/g, ''))  0;
    return sum + displayPrice * item.quantity;
  }, 0);

  const grandTotal = totalAmount + SHIPPING_COST;

  const submitOrder = async () => {
    if (!name  !phone  !address) {
      alert('Please fill in all required fields.');
      return;
    }

    const itemsList = cartItems.map(item => {
      const displayPrice = item.isPreOrder ? FULL_PRICE : parseFloat(item.price.replace(/[^0-9.]/g, ''))  0;
      return `• ${item.name}
  → Size: ${item.selectedSize  '—'}
  → Qty: ${item.quantity}
  → Price: ${displayPrice.toLocaleString()} EGP${item.isPreOrder ? ' (Pre-Order)' : ''}
  → Subtotal: ${(displayPrice * item.quantity).toLocaleString()} EGP`;
    }).join('\n\n');

    const message = `
NEW ORDER - FULL CASH ON DELIVERY

Customer Details:
• Name: ${name}
• WhatsApp: ${phone}
${secondPhone ? `• Second Number: ${secondPhone}` : ''}
• Address: ${address}
${notes ? `• Notes: ${notes}` : ''}

Order Summary (${cartCount} items):
${itemsList}

Subtotal: ${totalAmount.toLocaleString()} EGP
Shipping: ${SHIPPING_COST} EGP
TOTAL: ${grandTotal.toLocaleString()} EGP

Full Cash on Delivery

Thank you!
    `.trim();

    try {
      await fetch('https://formspree.io/f/xzzlelbo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, phone, second_phone: secondPhone, address, notes,
          subtotal: totalAmount, shipping: SHIPPING_COST, total: grandTotal,
          items_count: cartCount, order_details: message,
        }),
      });

      setOrderSent(true);
      clearCart();
      setName(''); setPhone(''); setSecondPhone(''); setAddress(''); setNotes('');
    } catch (err) {
      alert('Error sending order. Please contact us on WhatsApp.');
    }
  };

  const closeCart = () => {
    setIsCartOpen(false);
    setOrderSent(false);
    setStep(1);
  };

  return (
    <>
      <style jsx>{`
        .navbar { position: fixed; top: 0; left: 0; right: 0; height: 90px; background: rgba(0,0,0,0.96); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); z-index: 1000; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .container { max-width: 1600px; margin: 0 auto; padding: 0 2rem; height: 100%; display: flex; align-items: center; justify-content: space-between; }
        .logo { height: 82px; animation: spin 20s linear infinite; filter: drop-shadow(0 0 40px rgba(255,255,255,.7)); transition: all 0.4s ease; }
        .logo:hover { transform: scale(1.35); filter: drop-shadow(0 0 90px white); }
        @keyframes spin { from { transform: rotateY(
0deg); } to { transform: rotateY(360deg); } }
        .desktop-menu { display: flex; gap: 4.5rem; }
        .nav-link { color: #aaa; font-size: 1.1rem; font-weight:400; padding:0.7rem 1.8rem; border-radius:16px; text-decoration:none !important; transition:all .3s; }
        .nav-link:hover { color:#fff; background:rgba(255,255,255,.1); }
        .nav-link.active { color:#fff !important; font-weight:600; background:rgba(255,255,255,.15); }
        .icon-btn { width:56px; height:56px; border-radius:50%; background:rgba(255,255,255,.12); border:2px solid rgba(255,255,255,.25); backdrop-filter:blur(12px); display:flex; align-items:center; justify-content:center; color:white; transition:.3s; cursor:pointer; }
        .icon-btn:hover { background:rgba(255,255,255,.25); transform:translateY(-4px) scale(1.1); border-color:white; }
        .cart-badge { position:absolute; top:-8px; right:-8px; background:white; color:black; font-weight:900; font-size:.8rem; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:3px solid black; animation:pulse 2s infinite; }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }
        .mobile-logo { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); }
        @media (min-width:768px) { .mobile-only{display:none !important} }
        @media (max-width:767px) { .desktop-only,.desktop-menu{display:none !important} }
        .page-spacer { height:90px; }
        .cart-panel { position:fixed; top:0; right:0; width:100%; max-width:420px; height:100vh; background:#0a0a0a; z-index:2000; display:flex; flex-direction:column; color:white; }
        .cart-header { padding:20px; border-bottom:1px solid #333; display:flex; justify-content:space-between; align-items:center; }
        .cart-title { font-size:1.8rem; font-weight:bold; }
        .cart-content { flex:1; overflow-y:auto; padding:20px; }
        .cart-item { display:flex; gap:16px; padding:16px 0; border-bottom:1px solid #222; }
        .item-image { width:80px; height:80px; object-fit:cover; border-radius:12px; }
        .item-info h4 { margin:0; font-size:1.1rem; }
        .item-info p { margin:4px 0; font-size:.9rem; color:#aaa; }
        .item-price { font-weight:bold; color:#00ff88; font-size:1.3rem; }
        .quantity-controls { display:flex; align-items:center; gap:12px; margin-top:12px; }
        .quantity-btn { width:36px; height:36px; background:rgba(255,255,255,.1); border:none; border-radius:50%; color:white; cursor:pointer; }
        .checkout-form { display:flex; flex-direction:column; gap:18px; }
        .form-group label { display:flex; align-items:center; gap:8px; color:#ccc; font-size:.95rem; }
        .form-group input,.form-group textarea { padding:14px; border-radius:12px; border:none; background:rgba(255,255,255,.08); color:white; font-size:1rem; }
        .form-group input::placeholder,.form-group textarea::placeholder { color:#777; }
      `}</style>
<nav className="navbar">
        <div className="container">
          <div className="desktop-only">
            <Link to="/"><motion.img src={Logo} alt="KYN" className="logo" whileHover={{ scale: 1.35 }} /></Link>
          </div>
          <div className="desktop-menu desktop-only">
            {navLinks.map(link => (
              <Link key={link.name} to={link.path} className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}>
                {link.name}
              </Link>
            ))}
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="icon-btn mobile-only"><Menu size={32} /></button>
          <div className="mobile-only mobile-logo">
            <Link to="/"><motion.img src={Logo} alt="KYN" className="logo" style={{height:'72px'}} whileTap={{ scale: 0.92 }}/></Link>
          </div>
          <div onClick={() => { setIsCartOpen(true); setStep(1); setOrderSent(false); }} className="icon-btn relative cursor-pointer">
            <ShoppingBag size={32} strokeWidth={2.3} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
        </div>
      </nav>

      <div className="page-spacer" />

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div className="fixed inset-0 bg-black/80 z-40" onClick={closeCart} />
            <motion.div 
              className="cart-panel" 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }}
            >
              <div className="cart-header">
                <h2 className="cart-title">
                  {orderSent ? 'Order Sent!' : step === 1 ? `Cart (${cartCount})` : 'Checkout'}
                </h2>
                <button onClick={closeCart}><X size={32} /></button>
              </div>

              <div className="cart-content">
                {orderSent ? (
                  <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                      <CheckCircle2 size={100} color="#00ff88" style={{ marginBottom: '20px' }} />
                    </motion.div>
                    <h3 style={{ fontSize: '2rem', marginBottom: '16px', fontWeight: 'bold' }}>Order Sent Successfully!</h3>
                    <p style={{ color: '#aaa', fontSize: '1.1rem' }}>We received your order and will contact you soon</p>
                    <p style={{ marginTop: '30px', color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>
                      Full Cash on Delivery
                    </p>
<div style={{ marginTop: '40px', padding: '20px', background: 'rgba(0,255,136,0.1)', borderRadius: '16px', border: '2px solid #00ff88' }}>
                      <p style={{ fontSize: '1.1rem', color: '#ccc', margin: '0 0 10px' }}>
                        Need to track your order or have any questions?
                      </p>
                      <a 
                        href="https://wa.me/201096605584" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#00ff88', fontSize: '1.6rem', fontWeight: 'bold', textDecoration: 'none' }}
                      >
                        WhatsApp: 201096605584
                      </a>
                    </div>
                  </div>
                ) : step === 1 ? (
                  cartItems.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '100px 20px', color: '#666' }}>
                      <ShoppingBag size={80} style={{ marginBottom: '20px', opacity: 0.3 }} />
                      <p style={{ fontSize: '1.5rem' }}>Your cart is empty</p>
                      <p style={{ marginTop: '10px', color: '#aaa' }}>Add some items and come back!</p>
                    </div>
                  ) : (
                    <>
                      {cartItems.map((item, i) => {
                        const displayPrice = item.isPreOrder ? 999 : parseFloat(item.price.replace(/[^0-9.]/g, ''))  0;
                        return (
                          <div key={i} className="cart-item">
                            <img src={item.mainImage  item.image} alt={item.name} className="item-image" />
                            <div className="item-info">
                              <h4>{item.name}</h4>
                              {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                              {item.isPreOrder ? (
                                <p style={{ color: '#ff3366', fontWeight: 'bold' }}>Pre-Order</p>
                              ) : (
                                <p style={{ color: '#00ff88', fontWeight: 'bold' }}>In Stock</p>
                              )}
                              <p style={{ color: '#fff', fontWeight: 'bold', marginTop: '6px' }}>
                                Full Cash on Delivery
                              </p>
                              <p>Qty: {item.quantity}</p>
                              <p className="item-price">{(displayPrice * item.quantity).toLocaleString()} EGP</p>

                              <div className="quantity-controls">
                                <button className="quantity-btn" onClick={() => updateQuantity(item, item.quantity - 1)} disabled={item.quantity === 1}>
                                  <Minus size={18} />
                                </button>
                                <span>{item.quantity}</span>
                                <button className="quantity-btn" onClick={() => updateQuantity(item, item.quantity + 1)}>
                                  <Plus size={18} />
                                </button>
                                <button onClick={() => removeFromCart(item)}>
                                  <Trash2 size={20} color="#ff5555" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}

<div style={{ marginTop: '30px', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '1.3rem' }}>
                          <span>Subtotal</span>
                          <span>{totalAmount.toLocaleString()} EGP</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '1.3rem' }}>
                          <span>Shipping</span>
                          <span>100 EGP</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: 'bold', color: '#00ff88', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                          <span>Total</span>
                          <span>{grandTotal.toLocaleString()} EGP</span>
                        </div>
                        <p style={{ marginTop: '12px', color: '#00ff88', fontWeight: 'bold', textAlign: 'center' }}>
                          Full Cash on Delivery
                        </p>
                      </div>

                      <button onClick={() => setStep(2)} style={{
                        marginTop: '30px', width: '100%', padding: '18px', background: '#00ff88',
                        color: 'black', border: 'none', borderRadius: '12px', fontSize: '1.4rem',
                        fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 8px 20px rgba(0,255,136,0.3)'
                      }}>
                        Proceed to Checkout
                      </button>
                    </>
                  )
                ) : step === 2 ? (
                  <div className="checkout-form">
                    <div className="form-group">
                      <label><User size={20} /> Full Name *</label>
                      <input type="text" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} />
                    </div>
<div className="form-group">
                      <label><Phone size={20} /> WhatsApp Number *</label>
                      <input type="tel" placeholder="01xxxxxxxxx" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>

                    <div className="form-group">
                      <label><Phone size={20} /> Second Number (Optional)</label>
                      <input type="tel" placeholder="Another contact number (optional)" value={secondPhone} onChange={e => setSecondPhone(e.target.value)} />
                    </div>

                    <div className="form-group">
                      <label><MapPin size={20} /> Delivery Address *</label>
                      <input type="text" placeholder="Building, Street, Area, City" value={address} onChange={e => setAddress(e.target.value)} />
                      <p style={{ marginTop: '8px', color: '#00ff88', fontWeight: 'bold', fontSize: '1.1rem' }}>
                        Full Cash on Delivery
                      </p>
                    </div>

                    <div className="form-group">
                      <label>Notes (optional)</label>
                      <textarea rows="3" placeholder="Apartment number, landmark, special instructions..." value={notes} onChange={e => setNotes(e.target.value)} />
                    </div>

                    <div style={{ margin: '30px 0', padding: '20px', background: 'rgba(0,255,136,0.1)', borderRadius: '12px', textAlign: 'center', border: '2px solid #00ff88' }}>
                      <p style={{ margin: '0 0 10px', color: '#ccc', fontSize: '1rem' }}>
                        Questions or want to track your order?
                      </p>
                      <a href="https://wa.me/201096605584" target="_blank" rel="noopener noreferrer" style={{ color: '#00ff88', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' }}>
                        WhatsApp: 201096605584
                      </a>
                    </div>

                    <button
                      onClick={submitOrder}
                      disabled={!name  !phone || !address}
                      style={{
                        width: '100%', padding: '18px', background: (name && phone && address) ? '#00ff88' : '#003322',
                        color: 'black', border: 'none', borderRadius: '12px', fontSize: '1.4rem',
                        fontWeight: 'bold', cursor: (name && phone && address) ? 'pointer' : 'not-allowed',
                      }}
                    >
                      Send Order Now
                    </button>

                    <button onClick={() => setStep(1)} style={{
                      marginTop: '12px', width: '100%', padding: '14px', background: 'rgba(255,255,255,0.1)',
                      color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', fontSize: '1.1rem',
                    }}>
                      Back to Cart
                    </button>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
