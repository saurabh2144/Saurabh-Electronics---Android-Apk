# Mobi2 - Android App

Mobi2 ek **Android app development project** hai jisme **React Native** aur **Node.js** ki help se APK run karwaya ja raha hai.  

---

## Technology Used

### Frontend
1. React Native  
2. React Navigation  

### Backend
- Node.js  
- Express.js  
- Zod (form validation)  
- MongoDB (Mongoose) - Atlas Database  
- MVC architecture  

---

## Features

### User Authentication & Authorization
- Secure login aur registration using **Argon2 hashing** for passwords.

### Homepage
- Sare available items show karta hai `/items` endpoint se fetch karke.  
- **Search bar** hai jisse aap kisi bhi product ko search kar sakte ho (regex ke saath pattern-based searching aur case-insensitive matching).  
- Kisi item pe click karne se redirect hota hai **detailed item page** par jahan yeh details milti hai:
  - Title  
  - Description  
  - Price  
  - Discount  
  - Rating & Review  
  - Suggested products  
- **Add to Cart** button se item cart me add hota hai.

### Cart Page
- Shows all items added to the cart (API se fetch karke).  
- Har user ka **apna cart** hota hai, jo tab tak store hota hai jab tak user usse remove na kare.  
- Shows **total price** of items in cart.  
- **Payment button** available for future payment integration.

---

## Summary

Mobi2 ek combination hai **React Native frontend** aur **Node.js backend** ka, jisme MongoDB database use hua hai. Features include **secure authentication, dynamic item listing, cart management, aur advanced search functionality using regex**.  

---
