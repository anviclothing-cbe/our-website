import fs from 'fs';

const BASE_URL = 'http://localhost:8080/api';
let sessionId = 'test-session-123';

async function runTest() {
  console.log('--- STARTING COUPON TESTS ---');
  
  // 1. Get Products
  const productsRes = await fetch(`${BASE_URL}/products`);
  const productsData = await productsRes.json();
  const products = productsData.products;
  
  const saree = products.find(p => p.category === 'sarees');
  const coord = products.find(p => p.category === 'coord-sets');

  // Clear Cart
  await fetch(`${BASE_URL}/cart/clear`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId })
  }).catch(() => {}); // ignore error if not exists

  console.log(`\n--- Test 1: Add Coord Set (₹${coord.price}) ---`);
  await fetch(`${BASE_URL}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      productId: coord._id,
      quantity: 1,
      size: 'M',
      color: 'Blue'
    })
  });
  
  // Test invalid coupon
  const invalidRes = await fetch(`${BASE_URL}/coupons/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: 'INVALIDCODE', sessionId })
  });
  console.log('INVALIDCODE result:', await invalidRes.json());

  // Test expired coupon
  const expiredRes = await fetch(`${BASE_URL}/coupons/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: 'EXPIRED', sessionId })
  });
  console.log('EXPIRED result:', await expiredRes.json());

  // Test minimum order (MIN2000 for ₹500 off, coord set is >2000 usually)
  const minRes = await fetch(`${BASE_URL}/coupons/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: 'MIN2000', sessionId })
  });
  console.log('MIN2000 (above min) result:', await minRes.json());

  // Test category restriction (SAREES50 - should fail because we only have a coord set)
  const sareesRes1 = await fetch(`${BASE_URL}/coupons/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: 'SAREES50', sessionId })
  });
  console.log('SAREES50 (with coord set only) result:', await sareesRes1.json());

  // Add a saree
  console.log(`\n--- Test 2: Add Saree (₹${saree.price}) ---`);
  await fetch(`${BASE_URL}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      productId: saree._id,
      quantity: 1,
      size: 'Free Size',
      color: 'Red'
    })
  });

  // Test category restriction (SAREES50 - should pass and apply 50% only to the saree)
  const sareesRes2 = await fetch(`${BASE_URL}/coupons/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: 'SAREES50', sessionId })
  });
  const sarees2Json = await sareesRes2.json();
  console.log('SAREES50 (with saree in cart) result:', sarees2Json);
  console.log(`Expected discount: ${saree.price * 0.5}. Actual discount: ${sarees2Json.discount}`);

}

runTest();
