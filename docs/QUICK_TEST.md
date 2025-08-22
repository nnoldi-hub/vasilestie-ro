# 🎯 QUICK TEST GUIDE - VasileStie.ro

## ⚡ **TESTARE RAPIDĂ (15 minute)**

### 🏠 **Step 1: Homepage** 
✅ Deschide http://localhost:3000
- Logo afișat corect? ✅
- Navigation menu funcționează? ✅  
- Search form prezent? ✅
- Secțiuni încarcă: Hero, Categories, Testimonials? ✅

### 🔐 **Step 2: Authentication**
✅ Mergi la http://localhost:3000/auth/signin

**Test Admin:**
- Email: `admin@vasilestie.ro` 
- Password: `admin123`
- Redirect la `/admin`? ✅

**Test Logout:**
- Click pe logout
- Redirect la homepage? ✅

### 👨‍🔧 **Step 3: Craftsman Dashboard**
✅ Login ca meseriaș:
- Email: `mester@vasilestie.ro`
- Password: `mester123`  
- Acces la `/mesterias/dashboard`? ✅

### 🛠️ **Step 4: Services System**
✅ http://localhost:3000/servicii
- Lista servicii se afișează? ✅
- Filtre funcționează? ✅
- Click pe categorie → redirect corect? ✅

### 💳 **Step 5: Subscription System** 
✅ http://localhost:3000/mesterias/preturi
- 3 pachete afișate (BASIC, PREMIUM, PROFESSIONAL)? ✅
- Prețuri corecte (29.99, 49.99, 99.99 RON)? ✅

### 📱 **Step 6: Mobile Test**
✅ F12 → Device toolbar → iPhone/iPad
- Layout responsive? ✅
- Touch navigation works? ✅
- Forms utilizabile pe mobile? ✅

---

## 🚨 **RED FLAGS (Oprește lansarea dacă găsești)**

❌ **CRITICAL ISSUES:**
- [ ] Homepage nu se încarcă
- [ ] Login nu funcționează  
- [ ] Database erori în console
- [ ] 500 server errors
- [ ] Crash pe mobile

⚠️ **MAJOR ISSUES:**
- [ ] Servicii nu se afișează
- [ ] Admin panel inaccesibil
- [ ] Forms nu submitează
- [ ] Images nu se încarcă

---

## ✅ **QUICK APPROVAL**

Dacă toate testele de mai sus trec:
- [ ] **Homepage works** ✅
- [ ] **Auth system works** ✅  
- [ ] **Role access correct** ✅
- [ ] **Services display** ✅
- [ ] **Mobile responsive** ✅
- [ ] **No console errors** ✅

**🚀 READY TO LAUNCH!**

---

## 📞 **TEST USERS**

```javascript
// Admin
Email: admin@vasilestie.ro
Password: admin123
Access: /admin

// Craftsman  
Email: mester@vasilestie.ro
Password: mester123
Access: /mesterias/dashboard

// Regular User (după înregistrare)
Email: user@test.ro  
Password: user123
Access: /profil
```

---

## 🔧 **DACĂ GĂSEȘTI PROBLEME**

1. **Check Console Errors**: F12 → Console tab
2. **Check Network Tab**: F12 → Network tab  
3. **Check Database**: Verifică că seed.js a rulat
4. **Restart Server**: Ctrl+C → npm run dev
5. **Clear Cache**: Ctrl+Shift+R

**Probleme comune:**
- Database connection → verifică .env
- Auth issues → verifică NEXTAUTH_SECRET
- 404 errors → verifică routing în app/

---

**🎯 Target: Zero critical issues, <3 major issues pentru launch**
