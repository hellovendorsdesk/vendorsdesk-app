# 🤖 AI Agent Context & Rules — `vendorsdesk-app`

This document defines architectural boundaries and guidelines for AI coding agents modifying `vendorsdesk-app`.

---

## 🎯 Application Scope
`vendorsdesk-app` is the private authenticated SaaS dashboard (`app.vendorsdesk.in`). It is separate from `vendorsdesk-frontend` (which is the public SEO/marketing portal).

---

## 🛑 Strict Rules for AI Coding Agents
1. **API URL Resolution:** All backend API calls go through `src/utils/crypto.js` -> `secureFetch`.
   - In local development, requests route to `http://localhost:5000` or use the Vite proxy.
   - In production, it connects to `https://backend.vendorsdesk.in`.
2. **Encrypted Communication:** Data payloads sent to the backend should be formatted via `CryptoJS.AES` whenever `secureFetch` is called.
3. **Mobile Responsiveness:** The dashboard must maintain flawless UI on screens under 768px (using bottom navigation and slide-out drawers).
4. **No Direct State Mutation:** Keep credit balance and user status synchronized through `AuthContext.jsx`.
