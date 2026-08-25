const BASE_URL = 'http://localhost:8080/api';

async function runTest() {
  console.log('--- STARTING ACCOUNT DATA QA TESTS ---');
  
  // 1. Create a user to test with
  const email = `datatest${Date.now()}@example.com`;
  const regRes = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Data Test', email, password: 'password123', phone: '1234567890' })
  });
  
  const cookieHeader = regRes.headers.get('set-cookie');
  let cookie = '';
  if (cookieHeader) {
     cookie = cookieHeader.split(';')[0];
  }
  const regData = await regRes.json();
  const userId = regData.user.id;
  console.log('User created:', email);

  // 2. Test Profile Update
  const updateRes = await fetch(`${BASE_URL}/auth/profile`, {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Cookie': cookie
    },
    body: JSON.stringify({ name: 'Data Test Updated', phone: '9999999999' })
  });
  console.log('Profile Update Result (expect 200):', updateRes.status);
  const updatedData = await updateRes.json();
  console.log('Updated Name:', updatedData.user.name, 'Phone:', updatedData.user.phone);

  // 3. Test Add Address
  const newAddress = {
    id: 'addr123',
    fullName: 'Test User',
    street: '123 Main St',
    city: 'Mumbai',
    state: 'MH',
    zipCode: '400001',
    country: 'India',
    phone: '1234567890',
    isDefault: true
  };
  const addresses = [newAddress];
  const addressRes = await fetch(`${BASE_URL}/auth/profile`, {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Cookie': cookie
    },
    body: JSON.stringify({ addresses })
  });
  console.log('Add Address Result (expect 200):', addressRes.status);
  const addressData = await addressRes.json();
  console.log('User Addresses:', addressData.user.addresses);
  
  // 4. Test Orders Fetch
  const ordersRes = await fetch(`${BASE_URL}/orders?sessionId=${userId}`);
  console.log('Orders Fetch Result (expect 200):', ordersRes.status);
  const ordersData = await ordersRes.json();
  console.log('Orders Count:', ordersData.length);
  
  // 5. Test Wishlist Fetch
  const wlRes = await fetch(`${BASE_URL}/wishlist?sessionId=${userId}`);
  console.log('Wishlist Fetch Result (expect 200):', wlRes.status);
  const wlData = await wlRes.json();
  console.log('Wishlist Items Count:', wlData.length);
}

runTest();
