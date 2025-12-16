---

# 🎓 Preplay EdTech — Modern Teaching & Learning Platform

Preplay is a full-stack EdTech platform that enables teachers to offer 1:1 sessions, students to book appointments, join secure video rooms, and pay using global payment methods.
The platform supports **Stripe / PayPal for payments** and **Wise / PayPal for teacher payouts**.

This repository includes the **Next.js frontend**, **Supabase backend**, and **payment/video logic**.

---

# 🌟 Overview

Preplay is designed for individual teachers, creators, coaching institutes, and online educators who want:

* A simple scheduling system
* Secure video rooms
* Global payment support
* Payouts to their preferred method
* A clean dashboard for appointments

Developers can quickly extend the system, add modules, or drop it into their existing SaaS workflow.

---

# 🧩 Key Features

### 👨‍🏫 **For Students**

* Browse available teachers
* View teacher profiles
* Book time slots
* Pay securely using Stripe or PayPal
* Join auto-created unique video rooms

### 👩‍🏫 **For Teachers**

* Set availability
* Manage bookings
* Receive payouts via Wise or PayPal
* Automatic room links for each session

### 🛠 **For Developers**

* Modular API (Next.js)
* Supabase-based database
* Token-authenticated operations
* Extendable payment architecture
* Clean folder structure
* Easy deployment on Vercel

---

# 🏗 Tech Stack

| Layer                   | Technology                                   |
| ----------------------- | -------------------------------------------- |
| **Frontend**            | Next.js 14, React 18, shadcn/ui, TailwindCSS |
| **Backend**             | Next.js API Routes                           |
| **Database**            | Supabase (Postgres)                          |
| **Auth**                | Supabase Auth                                |
| **Payments (Incoming)** | Stripe Checkout, PayPal Checkout             |
| **Payouts (Outgoing)**  | Wise Business API, PayPal Payouts            |
| **Infrastructure**      | Vercel + Supabase                            |

---

# 📁 Project Structure

```
src/
 ├─ app/
 │   ├─ api/
 │   │   ├─ appointments/
 │   │   ├─ room/
 │   │   ├─ payments/
 │   │   └─ teachers/
 │   ├─ teacher/
 │   ├─ student/
 │   └─ (public pages)
 ├─ components/
 │   ├─ Payment/
 │   ├─ UI/
 │   └─ Shared/
 ├─ hooks/
 ├─ lib/
 │   └─ supabaseClient.js
 └─ utils/
```

---

# ⚙️ Installation (Developer Setup)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-org>/<repo>.git
cd repo
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create environment file

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

PAYPAL_CLIENT_ID=
PAYPAL_SECRET=
PAYPAL_WEBHOOK_ID=

WISE_API_KEY=
```

### 4️⃣ Start development server

```bash
npm run dev
```

---

# 🗄 Database Schema (Simplified)

### **Teachers**

```
id
name
bio
price_per_session
payout_method (wise/paypal)
payout_details (JSON)
```

### **Appointments**

```
id
teacher_id
student_id
date_time
status (pending/paid/completed)
room_key
payment_reference
```

### **Students**

```
id
name
email
```

---

# 🔐 Key Backend Concepts

### **1. Unique Video Room Key Generation**

Each booked appointment receives a unique room ID:

```js
async function generateUniqueRoomKey() {
  let key;
  let exists = true;

  while (exists) {
    key = Math.random().toString(36).substring(2, 10);
    const { data } = await supabaseClient
      .from("appointments")
      .select("room_key")
      .eq("room_key", key);

    exists = data?.length > 0;
  }

  return key;
}
```

### **2. Payments (Student → Platform)**

* Stripe or PayPal Checkout session is created
* Student is redirected to payment page
* On success, webhook updates appointment to *paid*

### **3. Payouts (Platform → Teachers)**

* Wise or PayPal Payout API
* Admin triggers or schedules payouts
* Teacher gets funds directly into bank/PayPal

---

# 🚀 Deployment Guide

### **Frontend + API**

Deploy to **Vercel**:

```bash
vercel deploy
```

### **Database**

Use **Supabase SQL migrations** or the dashboard.

### **Payments**

Set webhook URLs:

Stripe:

```
https://yourdomain.com/api/payments/stripe/webhook
```

PayPal:

```
https://yourdomain.com/api/payments/paypal/webhook
```

Wise:

* No webhooks required (API-based transfers)

---

# 🧪 Running Tests

(If you add tests later)

```bash
npm run test
```

---

# 🤝 Contributing

We welcome contributions!

1. Fork the repo
2. Create a feature branch
3. Submit a pull request
4. Pass CI checks

---

# 🐛 Reporting Issues

Open an issue with:

* Steps to reproduce
* Expected behavior
* Logs/screenshots if applicable

---

# 📄 License

Private / Internal Use Only
(Not for redistribution unless permitted)

---

# 🙋 Need Help?

If you want:

* API documentation
* Entity relationship diagram (ERD)
* Postman collection
* Architecture diagram

Just ask—I can generate those too.

---
