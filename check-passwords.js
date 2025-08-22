const bcrypt = require('bcryptjs');

async function checkPasswords() {
  // Hash-ul din seed pentru "password"
  const seedHash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';
  
  // Testez parole diferite
  const passwords = ['password', 'admin123', 'admin', 'Password123'];
  
  console.log('🔍 Testez parole cu hash-ul din seed...');
  
  for (const pass of passwords) {
    const isMatch = await bcrypt.compare(pass, seedHash);
    console.log(`"${pass}" ${isMatch ? '✅' : '❌'}`);
  }
  
  // Generez hash nou pentru "admin123"
  const newHash = await bcrypt.hash('admin123', 10);
  console.log('\n🔑 Hash nou pentru "admin123":');
  console.log(newHash);
}

checkPasswords().catch(console.error);
