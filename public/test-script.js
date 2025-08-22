// 🧪 Automated Testing Script pentru VasileStie.ro
// Rulează în browser console pentru testare rapidă

console.log('🧪 Starting VasileStie.ro Automated Tests...');

// Test 1: Check if homepage loads
async function testHomepage() {
  console.log('✅ Testing Homepage...');
  try {
    const response = await fetch('/');
    if (response.ok) {
      console.log('✅ Homepage loads successfully');
      return true;
    }
    throw new Error('Homepage failed to load');
  } catch (error) {
    console.error('❌ Homepage test failed:', error);
    return false;
  }
}

// Test 2: Check API endpoints
async function testAPIEndpoints() {
  console.log('✅ Testing API Endpoints...');
  const endpoints = [
    '/api/auth/signin',
    '/api/craftsmen',
    '/api/services'
  ];
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint);
      console.log(`✅ ${endpoint}: ${response.status}`);
    } catch (error) {
      console.error(`❌ ${endpoint} failed:`, error);
    }
  }
}

// Test 3: Check responsive design
function testResponsive() {
  console.log('✅ Testing Responsive Design...');
  const viewports = [
    { width: 320, height: 568, name: 'Mobile' },
    { width: 768, height: 1024, name: 'Tablet' },
    { width: 1024, height: 768, name: 'Desktop' }
  ];
  
  viewports.forEach(viewport => {
    // Simulate viewport change
    const meta = document.querySelector('meta[name="viewport"]');
    if (meta) {
      console.log(`✅ Viewport meta tag exists for ${viewport.name}`);
    } else {
      console.warn(`⚠️ Missing viewport meta for ${viewport.name}`);
    }
  });
}

// Test 4: Check form functionality
function testForms() {
  console.log('✅ Testing Forms...');
  const forms = document.querySelectorAll('form');
  forms.forEach((form, index) => {
    const submitBtn = form.querySelector('button[type="submit"]');
    const inputs = form.querySelectorAll('input, textarea, select');
    
    console.log(`Form ${index + 1}: ${inputs.length} inputs, submit button: ${submitBtn ? '✅' : '❌'}`);
  });
}

// Test 5: Check navigation
function testNavigation() {
  console.log('✅ Testing Navigation...');
  const navLinks = document.querySelectorAll('nav a, header a');
  navLinks.forEach((link, index) => {
    const href = link.getAttribute('href');
    if (href && href !== '#') {
      console.log(`Nav Link ${index + 1}: ${href} ✅`);
    } else {
      console.warn(`Nav Link ${index + 1}: Missing or empty href ⚠️`);
    }
  });
}

// Test 6: Check images and assets
function testAssets() {
  console.log('✅ Testing Assets...');
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    img.onload = () => console.log(`Image ${index + 1}: ${img.src} ✅`);
    img.onerror = () => console.error(`Image ${index + 1}: ${img.src} ❌`);
  });
}

// Test 7: Check JavaScript functionality
function testJavaScript() {
  console.log('✅ Testing JavaScript...');
  
  // Check if React is loaded
  if (typeof React !== 'undefined' || document.querySelector('[data-reactroot]')) {
    console.log('✅ React is loaded and working');
  } else {
    console.warn('⚠️ React may not be loaded properly');
  }
  
  // Check if NextAuth is configured
  if (window.__NEXT_AUTH) {
    console.log('✅ NextAuth is configured');
  } else {
    console.log('ℹ️ NextAuth state not available (normal if not logged in)');
  }
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Running all tests...\n');
  
  await testHomepage();
  await testAPIEndpoints();
  testResponsive();
  testForms();
  testNavigation();
  testAssets();
  testJavaScript();
  
  console.log('\n🎉 All tests completed! Check results above.');
  console.log('📊 Open Network tab and repeat tests to check for errors.');
}

// Auto-run tests
runAllTests();

// Export for manual use
window.VasileStieTests = {
  testHomepage,
  testAPIEndpoints,
  testResponsive,
  testForms,
  testNavigation,
  testAssets,
  testJavaScript,
  runAllTests
};

console.log('💡 Use window.VasileStieTests.runAllTests() to run tests again');
