# 🚚 Zap Shift

Zap Shift is a modern parcel delivery platform built with **React, Node.js, Express, MongoDB, Firebase Authentication, Stripe, Tailwind CSS, and TanStack Query**.

The platform allows users to create and manage parcel deliveries, make online payments, track delivery status, and manage their profiles. It also provides dedicated dashboards and management features for admins and riders.

## 🌐 Live Application

* **Client:** [Zap Shift Client](https://zap-shift-e8a2f.web.app/)
* **Server:** https://zap-shit-server.vercel.app/

## ✨ Features

### 👤 User Features

* User registration and login
* Google authentication with Firebase
* Create parcel delivery requests
* Calculate parcel delivery cost based on type, weight, and location
* View personal parcels
* View parcel details
* Delete parcels
* Make secure online payments using Stripe
* View payment history
* Track parcel delivery status
* Manage user profile

### 🛠️ Admin Features

* Admin dashboard
* View parcel statistics
* Manage users
* Manage parcels
* Manage riders
* View delivery status statistics
* Monitor payment and delivery activities

### 🏍️ Rider Features

* Rider dashboard
* View assigned parcels
* Update parcel delivery status
* Manage delivery activities
* Track assigned deliveries

## 💳 Payment System

Zap Shift uses **Stripe Checkout** for secure online payments.

After successful payment:

* Payment information is stored
* Transaction ID is generated
* A unique tracking ID is generated
* Parcel payment status is updated automatically

## 🔐 Authentication

Authentication is implemented using **Firebase Authentication**.

Supported authentication methods:

* Email & Password
* Google Sign-In

The backend uses **Firebase Admin SDK** to verify authenticated users and protect private API routes.

## 🧰 Technologies Used

### Frontend

* React
* Vite
* React Router
* Tailwind CSS
* DaisyUI
* TanStack Query
* Axios
* React Hook Form
* Firebase Authentication
* Stripe
* React Icons
* Recharts
* React Leaflet
* SweetAlert2
* React Responsive Carousel
* React Fast Marquee

### Backend

* Node.js
* Express.js
* MongoDB
* Firebase Admin SDK
* Stripe
* CORS
* Dotenv

## 📁 Project Structure

```text
zap-shift-client/
├── public/
├── src/
│   ├── Components/
│   ├── Contexts/
│   ├── Firebase/
│   ├── Hooks/
│   ├── Layouts/
│   ├── Pages/
│   ├── Routes/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/creative-saurav/zap-shift-client.git
```

Go to the project directory:

```bash
cd zap-shift-client
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## 🔑 Environment Variables

Create a `.env` file in the root directory and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> Never upload your `.env` file or Firebase private credentials to GitHub.

## 🚀 Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 📌 Main Purpose

Zap Shift is designed to provide a complete parcel delivery management experience where customers, riders, and administrators can interact through a single platform.

The application focuses on:

* Fast parcel booking
* Secure payments
* Delivery tracking
* Role-based dashboards
* Efficient parcel management
* Real-time data management with TanStack Query

## 👨‍💻 Developer

**Subir Sarker Saurav**

Full-Stack Developer specializing in React, Node.js, Laravel, and modern web technologies.
