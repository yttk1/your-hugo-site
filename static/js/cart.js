// cart.js - simple cart using localStorage
(function(){
  const CART_KEY = 'college_store_cart_v1';

  function getCart(){ return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
  function saveCart(c){ localStorage.setItem(CART_KEY, JSON.stringify(c)); }
  function updateCartCount(){
    const count = getCart().reduce((s,i)=>s+i.qty,0);
    document.getElementById('cart-count') && (document.getElementById('cart-count').textContent = count);
  }
  function addToCart(id,title,price){
    const cart = getCart();
    const existing = cart.find(i=>i.id===id);
    if(existing) existing.qty++;
    else cart.push({id, title, price: Number(price), qty: 1});
    saveCart(cart);
    updateCartCount();
    alert(title + " added to cart");
  }

  // attach to buttons
  document.addEventListener('click', function(e){
    const btn = e.target.closest('.add-to-cart');
    if(btn){
      const id = btn.dataset.id, title = btn.dataset.title, price = btn.dataset.price;
      addToCart(id,title,price);
    }
  }, false);

  // expose order placing
  window.placeOrder = function(ev){
    ev.preventDefault();
    const cart = getCart();
    if(!cart.length){ alert('Cart is empty'); return false; }
    const form = ev.target;
    const name = form.name.value;
    const email = form.email.value;
    const address = form.address.value;
    // Simulate processing delay
    const orderId = 'ORD-' + Math.random().toString(36).substr(2,8).toUpperCase();
    const total = cart.reduce((s,i)=>s + i.qty * i.price, 0).toFixed(2);

    // Fake "submit" — in a real site you'd send to serverless function
    // We'll show the confirmation and clear the cart
    form.style.display = 'none';
    const res = document.getElementById('order-result');
    document.getElementById('order-msg').innerHTML =
      `Thanks <strong>${name}</strong>! Your fake payment of $${total} succeeded. Order id: <strong>${orderId}</strong>. A confirmation was sent to ${email}.`;
    res.style.display = 'block';
    localStorage.removeItem(CART_KEY);
    updateCartCount();
    return false;
  };

  // populate checkout page
  document.addEventListener('DOMContentLoaded', function(){
    updateCartCount();
    const orderItemsDiv = document.getElementById('order-items');
    if(orderItemsDiv){
      const cart = getCart();
      if(cart.length===0) orderItemsDiv.innerHTML = '<p>Cart is empty.</p>';
      else {
        orderItemsDiv.innerHTML = cart.map(i=>`<div>${i.qty} × ${i.title} — $${(i.price*i.qty).toFixed(2)}</div>`).join('');
        document.getElementById('order-total').textContent = cart.reduce((s,i)=>s+i.qty*i.price,0).toFixed(2);
      }
    }
  });

})();
