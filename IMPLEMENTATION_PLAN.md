# Implementation Plan: Precious Metals Market Demo

> Generated on: 2026-01-30
> Estimated Tasks: 8
> Estimated Completion: 2-3 Hours

---

## 📋 Pre-Implementation Checklist

- [x] Signup redirect issue fixed
- [x] Firebase Authentication working
- [x] Firestore connected
- [x] PRD analyzed and understood
- [ ] This plan reviewed and approved by student

---

## 🎯 Project Overview

**Application:** Gold & Silver Purchasing Demo
**Type:** E-commerce / Simulation
**Description:** A demo platform for transparent precious metal purchasing with simulated live pricing.

> **Note on Authentication:** While the PRD mentions "No user accounts required" for the demo scope, this workshop enforces authentication implementation to demonstrate secure app architecture. We will require login for the "Place Order" step or admin features.

---

## 👥 User Roles & Permissions

### Role 1: User (Default)
- **Description:** Regular customer
- **Can Access:** Browse products, view prices, place orders (after login)
- **Cannot Access:** Admin dashboard, price configurations

### Role 2: Admin
- **Description:** Platform manager
- **Can Access:** Manage products, simulate price changes, view all orders
- **Cannot Access:** N/A

---

## 🗃️ Database Schema

### Collection: `users`
```javascript
{
  uid: string,
  email: string,
  name: string,
  role: 'user' | 'admin',
  createdAt: timestamp,
}
```

### Collection: `products`
```javascript
{
  id: string,
  name: string,
  category: 'gold' | 'silver',
  type: 'coin' | 'bar' | 'jewelry',
  purity: string, // e.g., "24K", "999"
  weightGrams: number,
  imageUrl: string,
  makingCharges: number, // Flat fee or percentage
}
```

### Collection: `orders`
```javascript
{
  id: string,
  userId: string,
  items: [{ productId, quantity, pricePerGramAtBooking, totalAmount }],
  totalAmount: number,
  status: 'pending' | 'confirmed',
  createdAt: timestamp,
}
```

### Collection: `prices` (Simulated Live Data)
```javascript
{
  metal: 'gold' | 'silver',
  pricePerGram: number,
  lastUpdated: timestamp,
}
```

---

## 🚀 Implementation Tasks

### Phase A: Foundation & Auth Enhancement

#### Task A1: Role & Profile Setup
- **Priority:** HIGH
- **Description:** Enhance AuthContext to handle roles and user profile data.
- **Files to Modify:**
  - `src/context/AuthContext.tsx`
  - `src/pages/SignUp.tsx`
- **Acceptance Criteria:**
  - [ ] Users created with 'user' role by default
  - [ ] AuthContext provides `userData` including role

#### Task A2: Navigation & Routing
- **Priority:** HIGH
- **Description:** Set up protected routes and navigation structure.
- **Files to Modify:**
  - `src/App.tsx`
  - `src/components/RoleBasedRoute.tsx` (New)
  - `src/components/Navbar.tsx` (New/Modify)
- **Acceptance Criteria:**
  - [ ] Navbar updates based on auth state
  - [ ] Protected routes for Dashboard/Orders
  - [ ] Public access for Home/Products

---

### Phase B: Core Features (Market Data)

#### Task B1: Price Simulation Service
- **Priority:** HIGH
- **Description:** Service to simulate fluctuating gold/silver prices.
- **Files to Create:**
  - `src/services/priceService.ts`
- **Acceptance Criteria:**
  - [ ] Fetch current price for gold/silver
  - [ ] Simulate price updates (random fluctuation within range)

#### Task B2: Product Listing & Details
- **Priority:** HIGH
- **Description:** Components to display products with calculated prices.
- **Files to Create:**
  - `src/pages/Products.tsx`
  - `src/services/productService.ts`
- **Acceptance Criteria:**
  - [ ] Filter by Metal (Gold/Silver)
  - [ ] Display estimated price (Price/gram * Weight)

---

### Phase C: Purchasing Flow

#### Task C1: Order Placement Logic
- **Priority:** HIGH
- **Description:** Handle "Buy Now" flow and order creation.
- **Files to Create:**
  - `src/services/orderService.ts`
  - `src/pages/Checkout.tsx`
- **Acceptance Criteria:**
  - [ ] Calculate final total at moment of purchase
  - [ ] Create order document linked to user

#### Task C2: Order Confirmation & History
- **Priority:** MEDIUM
- **Description:** Success screen and order history view.
- **Files to Create:**
  - `src/pages/OrderConfirmation.tsx`
  - `src/pages/OrderHistory.tsx`
- **Acceptance Criteria:**
  - [ ] Show clear success functionality
  - [ ] List past orders for logged-in user

---

## ⚠️ AI Features

*None identified in PRD.*

---

## 📊 Progress Tracker

| Task | Status | Committed |
|------|--------|-----------|
| A1 | ⏳ Pending | - |
| A2 | ⏳ Pending | - |
| B1 | ⏳ Pending | - |
| B2 | ⏳ Pending | - |
| C1 | ⏳ Pending | - |
| C2 | ⏳ Pending | - |

---

## ✅ Final Checklist

- [ ] Users can browse without login
- [ ] Users must login to buy
- [ ] Prices update/display correctly
- [ ] Orders are saved to Firestore
