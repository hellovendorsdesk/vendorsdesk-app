# 🚀 VendorsDesk Seller App (`app.vendorsdesk.in`)

> **React 19 + Vite Authenticated SaaS Platform for E-Commerce Suppliers (Port 5173)**  
> Primary seller dashboard enabling automated image badge optimization, live catalog management, settlement PnL analytics, and credits billing.

---

## 🏗️ Architecture & Component Hierarchy

```text
vendorsdesk-app/
├── public/                     # Static assets & icons
├── src/
│   ├── api/                    # API clients
│   │   ├── billingApi.js       # Credit top-up, Cashfree/Razorpay payment verification
│   │   ├── optimizerApi.js     # Image optimization, lot jobs, variations, history
│   │   └── templateApi.js      # Graphical badge seal templates
│   ├── components/             # UI Components
│   │   ├── auth/               # AuthModal, PasswordSetupModal, Google OAuth
│   │   ├── common/             # Navigation header, Mobile Bottom Nav, Notification toast
│   │   ├── dashboard/          # OptimizerCanvas, VariationsGrid, PnLViewer
│   │   └── modals/             # CreditModal, FeedbackWidget
│   ├── config/                 # routes.js, endpoints configuration
│   ├── constants/              # Category mappings, plan tiers, UI theme tokens
│   ├── context/
│   │   └── AuthContext.jsx     # Global authentication, token persistence, user tier
│   ├── hooks/                  # Custom hooks (useWindowSize, useToast)
│   ├── pages/
│   │   ├── dashboard/
│   │   │   └── DashboardShell.jsx # Primary authenticated SaaS view
│   │   └── marketing/          # Fallback marketing views for root domain
│   ├── styles/
│   │   └── tokens.css          # Design tokens (cyan accents, dark-tech slate canvas)
│   ├── utils/
│   │   ├── crypto.js           # AES-256 secure payload encryption
│   │   └── seoManager.js       # Dynamic title and meta tag updates
│   ├── App.jsx                 # App shell, routing coordinator, payment listener
│   └── index.css               # Obsidian Dark-Tech global styles
├── package.json
└── vite.config.js
```

---

## 🔑 Core Features & User Workflow

1. **Authentication & Session:**
   - Supports Email/Password and Google OAuth.
   - Saves token in `localStorage.getItem('token')`.
   - Automatically synchronizes supplier connection status with `vendorsdesk-backend`.

2. **Listing Image Badge Optimizer:**
   - Seller selects product category (e.g. Sarees, Shoes, Electronics).
   - Uploads main product image.
   - Server applies conversion-optimized badge stamps (e.g. *"Premium Quality"*, *"Fast Dispatch"*, *"Best Value"*).
   - Generates downloadable ZIP package (`jszip`) containing optimized variations.

3. **Settlement PnL Analytics:**
   - Seller uploads marketplace settlement Excel sheets (`.xlsx`).
   - Parses net payouts, return charges, customer return deductions, and advertising spend.

4. **Credits & Subscription Billing:**
   - Credit-based usage model for image optimization jobs.
   - Integrated with Cashfree / Razorpay for instant balance top-up.

---

## 🚀 Development Commands

```bash
# Install dependencies
npm install

# Run local development server (Port 5173)
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```
