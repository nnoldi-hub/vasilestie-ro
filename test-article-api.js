const fetch = require('node-fetch');

async function testCreateArticle() {
  try {
    // First, get a session token (simulate being logged in)
    const response = await fetch('http://localhost:3001/api/colaborator/content/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'next-auth.session-token=test' // You'll need a real session token
      },
      body: JSON.stringify({
        title: 'Test Article',
        slug: 'test-article',
        excerpt: 'Acesta este un articol de test',
        content: 'Conținutul articolului de test este aici.',
        published: false,
        categoryId: 'test-category', // Using the slug we created
        tags: 'test, articol, blog'
      })
    });

    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', data);
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testCreateArticle();
