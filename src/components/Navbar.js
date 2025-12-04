// src/components/Navbar.jsx - تم إضافة حقل رقم الإنستاباي فقط (كل حاجة تانية زي ما هي)

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Menu, Plus, Minus, Trash2, User, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import Logo from '../image/kyn_logo_transparent.png';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [orderSent, setOrderSent] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [instapayNumber, setInstapayNumber] = useState(''); // الحقل الجديد بس
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

  const totalAmount = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    return sum + price * item.quantity;
  }, 0);

  const submitOrder = async () => {
    if (!name || !phone || !instapayNumber || !address) {
      alert('برجاء ملء جميع الحقول المطلوبة (بما فيها رقم الإنستاباي)');
      return;
    }

    const itemsList = cartItems.map(item => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
      return `• ${item.name}
  → Size: ${item.selectedSize || '—'}
  → Color: ${item.selectedColor || '—'}
  → Qty: ${item.quantity}
  → Price: ${price.toLocaleString()} EGP
  → Subtotal: ${(price * item.quantity).toLocaleString()} EGP`;
    }).join('\n\n');

    const message = `
NEW ORDER RECEIVED

Customer Info:
• Name: ${name}
• Phone: ${phone}
• Instapay Number: ${instapayNumber} (مهم جدًا)
• Address: ${address}
${notes ? `• Notes: ${notes}` : ''}

Order Details (${cartCount} items):
${itemsList}

TOTAL: ${totalAmount.toLocaleString()} EGP

Thanks for your order!
    `.trim();

    try {
      await fetch('https://formspree.io/f/xzzlelbo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, phone, instapay_number: instapayNumber, address, notes,
          total: totalAmount,
          items_count: cartCount,
          order_details: message,
        }),
      });

      setOrderSent(true);
      clearCart();
      setName(''); setPhone(''); setInstapayNumber(''); setAddress(''); setNotes('');
    } catch (err) {
      alert('Error sending order. Please try again or contact us on WhatsApp.');
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
        /* كل الستايل زي ما هو بالضبط - مفيش أي تغيير */
        .navbar { position: fixed; top: 0; left: 0; right: 0; height: 90px; background: rgba(0,0,0,0.96); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); z-index: 1000; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .container { max-width: 1600px; margin: 0 auto; padding: 0 2rem; height: 100%; display: flex; align-items: center; justify-content: space-between; }
        .logo { height: 82px; animation: spin 20s linear infinite; filter: drop-shadow(0 0 40px rgba(255,255,255,.7)); transition: all 0.4s ease; }
        .logo:hover { transform: scale(1.35); filter: drop-shadow(0 0 90px white); }
        @keyframes spin { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
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
        .cart-footer { padding:20px; background:#111; border-top:1px solid #333; }
        .total-row { display:flex; justify-content:space-between; font-size:1.7rem; margin-bottom:20px; }
        .btn-primary { width:100%; padding:16px; background:white; color:black; border:none; border-radius:12px; font-size:1.3rem; font-weight:bold; cursor:pointer; }
        .btn-secondary { background:rgba(255,255,255,.1); color:white; margin-bottom:12px; }
        .btn-instagram { background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888); color:white; padding:20px; font-size:1.5rem; font-weight:bold; border-radius:16px; text-align:center; margin-top:20px; animation:pulse 2s infinite; text-decoration:none; display:block; }
        .mobile-sidebar { position:fixed; top:0; left:0; width:80%; max-width:340px; height:100vh; background:#0a0a0a; z-index:2000; padding:100px 30px 40px; border-right:1px solid #333; }
        .sidebar-link { display:block; color:#eee; font-size:1.8rem; font-weight:600; padding:1rem 0; text-decoration:none; border-bottom:1px solid rgba(255,255,255,0.1); }
        .sidebar-link.active,.sidebar-link:hover { color:white; padding-left:15px; }
      `}</style>

      {/* باقي الكود زي ما هو 100% */}
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

      {/* Mobile Menu - زي ما هو */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div className="fixed inset-0 bg-black/80 z-40" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div className="mobile-sidebar" initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}>
              <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 left-8 icon-btn"><X size={36} /></button>
              {navLinks.map(link => (
                <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`sidebar-link ${location.pathname === link.path ? 'active' : ''}`}>
                  {link.name}
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Panel - التعديل الوحيد هنا */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div className="fixed inset-0 bg-black/80 z-40" onClick={closeCart} />
            <motion.div className="cart-panel" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}>
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
                    <p style={{ color: '#aaa', marginBottom: '40px', fontSize: '1.1rem' }}>We received your order and will contact you soon</p>
                    <a href="https://www.instagram.com/p/YOUR_LINK_HERE" target="_blank" rel="noopener noreferrer" className="btn-instagram">
                      Pay Now via Instagram Pay
                    </a>
                    <p style={{ marginTop: '30px', color: '#666', fontSize: '0.95rem' }}>Or wait for our message on WhatsApp to confirm payment</p>
                  </div>
                ) : step === 1 ? (
                  cartItems.length === 0 ? (
                    <div style={{ textAlign:'center', padding:'100px 20px', color:'#666' }}>
                      <ShoppingBag size={80} style={{ marginBottom:'20px', opacity:0.3 }} />
                      <p style={{ fontSize:'1.5rem' }}>Your cart is empty</p>
                    </div>
                  ) : (
                    cartItems.map((item, i) => {
                      const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
                      return (
                        <div key={i} className="cart-item">
                          <img src={item.mainImage || item.image} alt={item.name} className="item-image" />
                          <div className="item-info">
                            <h4>{item.name}</h4>
                            {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                            {item.isPreOrder && <p style={{ color:'#ff3366' }}>Pre-Order (50% Now)</p>}
                            <p>Qty: {item.quantity}</p>
                            <p className="item-price">{(price * item.quantity).toLocaleString()} EGP</p>
                            <div className="quantity-controls">
                              <button className="quantity-btn" onClick={() => updateQuantity(item, item.quantity - 1)} disabled={item.quantity === 1}><Minus size={18} /></button>
                              <span>{item.quantity}</span>
                              <button className="quantity-btn" onClick={() => updateQuantity(item, item.quantity + 1)}><Plus size={18} /></button>
                              <button onClick={() => removeFromCart(item)}><Trash2 size={20} color="#ff5555" /></button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )
                ) : (
                  <div className="checkout-form">
                    <div className="form-group">
                      <label><User size={20} /> Full Name *</label>
                      <input type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label><Phone size={20} /> Phone (WhatsApp) *</label>
                      <input type="tel" placeholder="+201234567890" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>

                    {/* الحقل الجديد بس - بدون أي تغيير في الديزاين */}
                    <div className="form-group">
                      <label style={{ color: '#e6683c', fontWeight: 'bold' }}>
                        Instapay Number (اللي هتدفع منه) *
                      </label>
                      <input 
                        type="tel" 
                        placeholder="010xxxxxxx أو 011xxxxxxx" 
                        value={instapayNumber} 
                        onChange={e => setInstapayNumber(e.target.value)}
                        style={{ border: '2px solid #e6683c', background: 'rgba(230,104,60,0.1)' }}
                      />
                      <p style={{ fontSize: '0.85rem', color: '#ff6b6b', marginTop: '6px' }}>
                        مهم جدًا عشان نأكد الدفع بسرعة
                      </p>
                    </div>

                    <div className="form-group">
                      <label><MapPin size={20} /> Delivery Address *</label>
                      <input type="text" placeholder="123 Street, Cairo" value={address} onChange={e => setAddress(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Notes (optional)</label>
                      <textarea rows="3" placeholder="Any special requests?" value={notes} onChange={e => setNotes(e.target.value)} />
                    </div>
                  </div>
                )}
              </div>

              {cartItems.length > 0 && !orderSent && (
                <div className="cart-footer">
                  <div className="total-row">
                    <span>Total</span>
                    <strong>{totalAmount.toLocaleString()} EGP</strong>
                  </div>
                  {step === 1 ? (
                    <button className="btn-primary" onClick={() => setStep(2)}>
                      Proceed to Checkout
                    </button>
                  ) : (
                    <>
                      <button className="btn-primary btn-secondary" onClick={() => setStep(1)}>
                        Back to Cart
                      </button>
                      <button className="btn-primary" onClick={submitOrder}>
                        Send Order
                      </button>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}