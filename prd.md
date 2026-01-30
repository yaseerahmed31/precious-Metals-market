# PRD: Gold & Silver Purchasing Demo Website

## 1. App Overview & Objectives

### Overview

This project is an **academic demo e-commerce website** focused on purchasing **gold and silver products** (coins, bars, jewelry). The application demonstrates how a digital platform can simplify precious metal buying by emphasizing **price transparency, clarity, and user trust**.

The app is intentionally scoped as a **demo**, not a production-ready commerce system.

### Objectives

* Demonstrate a complete end-to-end purchase flow
* Build user confidence through transparent pricing and product details
* Clearly communicate fluctuating gold and silver prices
* Showcase good UX and product-thinking suitable for academic evaluation

**Primary Message:**

> “This platform makes precious metal purchasing simple, transparent, and trustworthy.”

---

## 2. Problem Statement

Buyers hesitate to purchase gold and silver online because:

* Prices fluctuate frequently
* Authenticity and purity are not always clear
* Price calculations can feel confusing or hidden

This uncertainty leads to hesitation and abandoned purchases.

---

## 3. Demo Success Criteria

The demo is considered successful if a user can:

1. Browse gold and silver products
2. View live or simulated metal prices
3. Select a product and quantity/weight
4. See an accurate total price (₹ INR) calculation
5. Place an order
6. Receive a clear and reassuring confirmation

---

## 4. Target Audience

### Primary User: Retail Precious Metal Buyer

* **Context:** Buying gold or silver for investment or gifting
* **Skill Level:** Basic familiarity with online shopping
* **Key Need:** Quick price clarity and trust
* **Key Constraint:** Fear of hidden pricing or inauthentic products

Secondary audience (implicit):

* Faculty / evaluators assessing UX clarity and completeness

---

## 5. Platform Scope

* **Platform:** Web application
* **Device Focus:** Desktop first (mobile-friendly optional)
* **Access:** No login or user accounts required

---

## 6. Core Features & Functional Scope

### In-Scope Features

| ID | Feature            | Description                                          |
| -- | ------------------ | ---------------------------------------------------- |
| F1 | Metal Categories   | Clear separation between Gold and Silver             |
| F2 | Product Listing    | Name, image, purity, base price                      |
| F3 | Price Display      | Live or simulated gold/silver price per gram (₹ INR) |
| F4 | Price Calculation  | Total price based on weight/quantity                 |
| F5 | Product Details    | Transparency-focused product page                    |
| F6 | Order Placement    | Buy Now / Place Order (no payment)                   |
| F7 | Order Confirmation | Clear success screen with order summary              |

### Out of Scope (Explicit Non-Goals)

* Real payment gateways
* Shipping, logistics, or returns
* User accounts, login, or KYC
* Regulatory or tax compliance

---

## 7. User Experience & Flow Design

### 7.1 Entry Point (Homepage)

First impression focuses on **price clarity and trust**.

Homepage elements:

* Current gold price per gram (₹ INR) (₹ INR)
* Current silver price per gram (₹ INR) (₹ INR)
* Two primary actions:

  * Buy Gold
  * Buy Silver

---

### 7.2 Core User Flow (Happy Path)

1. User lands on homepage
2. Selects Gold or Silver category
3. Views product list (coins/bars/jewelry)
4. Clicks a product
5. Views detailed product information
6. Selects quantity or weight
7. Sees calculated total price (₹ INR)
8. Clicks Buy Now / Place Order
9. Sees order confirmation screen

---

### 7.3 Inputs

* Metal type (Gold / Silver)
* Product selection
* Quantity or weight (grams)

---

### 7.4 Outputs

* Updated total price (₹ INR)
* Product summary
* Order confirmation message

---

### 7.5 Feedback & System States

* **Loading State:** Spinner while fetching price
* **Success State:** Green confirmation banner with order details
* **Failure State:** Error message when price cannot be fetched
* **Partial State:** Cached or fallback price shown with explanation

---

### 7.6 Error Handling (Minimal but Clear)

* Invalid quantity → Inline validation message
* Price fetch failure → Demo fallback price
* No interaction → Read-only browsing allowed

---

## 8. Data & Logic (Conceptual)

### Inputs

* User selections
* Metal prices (mocked or public source)
* Static product data

### Processing

* Fetch price per gram (₹ INR)
* Multiply by weight or quantity
* Add basic making or service charges (optional)

### Outputs

* UI display only
* No persistent data storage

---

## 9. Trust & Transparency Considerations

* Clearly label prices as live or simulated
* Display purity (e.g., 24K, 22K, 999 silver)
* Show price breakdown (metal price × weight, shown in ₹ INR)
* Avoid hidden charges

---

## 10. Security Considerations (Demo-Level)

* No sensitive user data collected
* No payment or financial information stored
* Read-only product and pricing data

---

## 11. Potential Challenges & Mitigations

| Challenge                   | Mitigation                                    |
| --------------------------- | --------------------------------------------- |
| Price fluctuation confusion | Label prices clearly and show update time     |
| User trust                  | Emphasize purity, breakdown, and confirmation |
| Demo realism                | Strong confirmation and smooth flow           |

---

## 12. Future Expansion Possibilities

If expanded beyond a demo:

* User accounts and order history
* Real-time payment integration
* Certificates of authenticity
* Tax and regulatory compliance
* Mobile-first experience
* Investment tracking dashboards

---

## 13. Evaluation Readiness (Academic Context)

This demo demonstrates:

* Clear problem definition
* Strong UX flow
* Practical feature scoping
* Real-world relevance
* End-to-end product thinking

---

**Status:** Ready for review and iteration
