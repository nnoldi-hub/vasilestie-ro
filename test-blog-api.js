async function testBlogPostAPI() {
  try {
    console.log('Testing blog post API...');
    
    const response = await fetch('http://localhost:3002/api/blog/posts/alegerea-culorii-potrivite-pentru-camera-copilului-ghidul-prinilor-creativi');
    
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    
    const data = await response.text();
    console.log('Response:', data);
    
    if (response.ok) {
      try {
        const jsonData = JSON.parse(data);
        console.log('JSON Data:', JSON.stringify(jsonData, null, 2));
      } catch (e) {
        console.log('Could not parse as JSON');
      }
    }
    
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testBlogPostAPI();
