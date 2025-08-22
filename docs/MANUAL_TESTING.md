# 🧪 MANUAL TESTING CHECKLIST - VasileStie.ro

## 🏗️ **PREGĂTIRE TESTARE**

### 1. Verifică că server-ul rulează:
✅ http://localhost:3000 - Homepage
✅ No console errors în browser
✅ Network tab - no failed requests

### 2. Testare Users & Authentication:

**Test Admin Login:**
- Mergi la http://localhost:3000/auth/signin
- Email: admin@vasilestie.ro 
- Password: admin123
- Verifică redirect la /admin

**Test Craftsman Login:**  
- Email: mester@vasilestie.ro
- Password: mester123  
- Verifică redirect la /mesterias/dashboard

---

## 📋 **TESTARE FUNCȚIONALĂ**

### 🏠 **Homepage Tests**
- [ ] Logo și branding afișate corect
- [ ] Navigation menu funcționează
- [ ] Search form pentru servicii
- [ ] Secțiuni: Hero, Categories, Featured Craftsmen, How It Works, Testimonials
- [ ] Footer links funcționează
- [ ] Mobile responsive (test cu F12 → device toolbar)

### 🔐 **Authentication System**
- [ ] Login page loads (/auth/signin)
- [ ] Login cu email/password funcționează  
- [ ] Logout funcționează
- [ ] Session persistă la page refresh
- [ ] Protected pages redirect la login
- [ ] Role-based access control

### 👥 **User Roles Testing**

**USER (Client normal):**
- [ ] /profil - Profile management
- [ ] /servicii - Browse services  
- [ ] /contact - Contact form
- [ ] /comenzi - Orders history

**CRAFTSMAN (Meseriaș):**
- [ ] /mesterias/dashboard - Main dashboard
- [ ] /mesterias/profil - Profile editing
- [ ] /mesterias/preturi - Subscription plans
- [ ] /mesterias/verificare - Verification status
- [ ] /mesterias/suport - Support system
- [ ] Add/edit services functionality

**ADMIN:**
- [ ] /admin - Admin dashboard
- [ ] Team management
- [ ] User management  
- [ ] Statistics și analytics
- [ ] Activity logs
- [ ] Chat dashboard

### 🛠️ **Services System**
- [ ] /servicii - Main services page
- [ ] Search functionality
- [ ] Filter by category
- [ ] Filter by location  
- [ ] Filter by price
- [ ] Category pages:
  - [ ] /servicii/electricieni
  - [ ] /servicii/instalatori
  - [ ] /servicii/constructori
  - [ ] /servicii/zugravi
  - [ ] /servicii/gradinari
  - [ ] /servicii/curatenie

### 💳 **Subscription System**
- [ ] /mesterias/preturi - Pricing tiers
- [ ] BASIC (29.99 RON) features
- [ ] PREMIUM (49.99 RON) features  
- [ ] PROFESSIONAL (99.99 RON) features
- [ ] Subscription status în dashboard
- [ ] Payment tracking

### 📞 **Contact System**
- [ ] Homepage contact form
- [ ] Direct contact cu meșteri
- [ ] Contact requests tracking
- [ ] Email functionality (mock în dev)
- [ ] Status updates pentru cereri

---

## 🔧 **TECHNICAL TESTS**

### Database Integration:
```bash
# Test database connection
npx prisma db push
npx prisma generate  
node prisma/seed.js
```

### Build Tests:
```bash
# Test production build
npm run build
npm run start
```

### Performance Tests:
- [ ] Page load < 3 seconds
- [ ] Smooth navigation
- [ ] No memory leaks în dev tools
- [ ] Image optimization working

---

## 📱 **RESPONSIVE TESTS**

### Mobile (320px - 768px):
- [ ] Touch-friendly navigation
- [ ] Readable text sizes
- [ ] Proper form layouts
- [ ] Working touch interactions

### Tablet (768px - 1024px):  
- [ ] Optimal layout use
- [ ] Navigation appropriate
- [ ] Content readable

### Desktop (1024px+):
- [ ] Full feature access
- [ ] Proper spacing
- [ ] Professional appearance

---

## 🔒 **SECURITY TESTS**

- [ ] SQL injection protection
- [ ] XSS protection
- [ ] CSRF tokens
- [ ] Session security
- [ ] Environment variables protected
- [ ] API endpoints secured

---

## 🚨 **ISSUES FOUND**

### Critical (Must fix before launch):
- [ ] 

### Major (Should fix):
- [ ] 

### Minor (Nice to have):
- [ ] 

---

## ✅ **FINAL APPROVAL**

- [ ] **All functionality works** ✅
- [ ] **No critical bugs** ✅
- [ ] **Performance acceptable** ✅
- [ ] **Mobile responsive** ✅  
- [ ] **Security measures in place** ✅
- [ ] **Ready for production** ✅

**🚀 APPROVED FOR LAUNCH!**

Tested by: _________________  
Date: _____________________ 
Signature: _________________
