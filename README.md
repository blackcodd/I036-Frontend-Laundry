# Tech_Laundry Frontend Project

## Project Overview
Create a modern, professional, responsive single-page web application named **Tech_Laundry**.

Frontend Technology:
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Context API or Redux Toolkit
- Framer Motion for animations
- React Icons
- Leaflet or Google Maps API for location map
- SweetAlert2 or Toastify for notifications

Backend:
- .NET Web API (Backend NOT required now)
- Frontend should be designed to easily connect with REST APIs later

The website is an online laundry service platform where:
- Customers can find nearby laundry shops
- Place washing orders
- Pay online or choose Cash on Delivery
- Shop owners manage orders and update order status

---

# Website Theme & UI Design

## Design Style
Create a:
- Dark modern UI
- Premium professional look
- Consistent layout
- Smooth animations
- Clean spacing
- Mobile responsive design

## Color Palette
Use dark elegant colors:
- Background: #0F172A
- Card: #1E293B
- Primary: #06B6D4
- Secondary: #3B82F6
- Accent: #14B8A6
- Text: #E2E8F0
- Muted Text: #94A3B8

Avoid overly bright/light colors.

---

# Logo Design

Create a modern logo:
- Name: Tech_Laundry
- Style: Minimal + Professional
- Include:
  - Washing machine icon
  - Water wave
  - Technology feel
- Use cyan/blue gradient

Navbar should display:
- Logo
- Website name
- Navigation links

---

# User Types

## 1. Customer
Customer features:
- Register/Login
- Detect nearby laundry shops
- View shop details
- View washing service items
- Add items with quantity
- Place order
- Generate bill
- Payment option
- Track order status

---

## 2. Shop Owner
Shop owner features:
- Login/Register
- Dashboard
- View incoming orders
- Change order status:
  - Pending
  - Progress
  - Delivering
  - Completed
- Manage services and prices

---

# Pages & Components

# Public Pages

## Home Page
Sections:
1. Hero Section
2. Features
3. Nearby Shops Preview
4. How It Works
5. Testimonials
6. Footer

Hero section should contain:
- Big heading
- Laundry illustration
- CTA buttons
- Smooth animation

---

## Authentication Pages
Create:
- Login Page
- Register Page

Role selection:
- Customer
- Shop Owner

Modern glassmorphism forms.

---

# Customer Features

## Customer Dashboard
Sidebar:
- Nearby Shops
- My Orders
- Profile
- Logout

---

## Nearby Shops Page
Features:
- Show nearby shops in cards
- Search/filter
- Map integration
- Distance display
- Ratings

Each shop card should contain:
- Shop image
- Shop name
- Address
- Rating
- Open/Closed status
- View Details button

---

## Shop Details Page
Display:
- Shop information
- Services list
- Price table

Laundry Items:
- Shari
- Panjabi
- Lungi
- Coat
- Shirt
- T-shirt
- Pant
- Others

Each item should have:
- Name
- Price
- Quantity selector
- Add button

---

## Cart & Billing Page
Features:
- Show selected items
- Quantity
- Subtotal
- Delivery charge
- Total bill

Buttons:
- Order Now
- Continue Shopping

---

## Payment Page
Payment methods:
1. Online Payment
2. Cash On Delivery

Online payment UI:
- Card number
- Expiry
- CVV
- Pay button

After payment:
- Show success animation
- Redirect to order tracking

---

## Order Tracking Page
Order timeline:
- Pending
- Progress
- Delivering
- Completed

Use:
- Timeline UI
- Status colors
- Estimated delivery time

---

# Shop Owner Features

## Shop Owner Dashboard
Modern admin dashboard.

Sidebar:
- Orders
- Services
- Analytics
- Profile
- Logout

Dashboard cards:
- Total Orders
- Pending
- Completed
- Revenue

---

## Orders Management Page
Table columns:
- Order ID
- Customer Name
- Address
- Items
- Total Price
- Payment Method
- Status
- Action

Actions:
- Accept
- Reject
- Change Status

Statuses:
- Pending
- Progress
- Delivering
- Completed

Use colored badges.

---

## Service Management Page
Owner can:
- Add service item
- Edit service price
- Delete service

Form fields:
- Item name
- Price
- Category

---

# React Project Structure

Use clean scalable structure:

src/
│
├── assets/
├── components/
│   ├── common/
│   ├── customer/
│   ├── owner/
│   └── layout/
│
├── pages/
│   ├── public/
│   ├── customer/
│   └── owner/
│
├── routes/
├── services/
├── context/
├── hooks/
├── utils/
├── data/
├── App.jsx
└── main.jsx

---

# Routing

Use React Router DOM.

Routes:
- /
- /login
- /register
- /customer/dashboard
- /shops
- /shop/:id
- /cart
- /payment
- /tracking/:id
- /owner/dashboard
- /owner/orders
- /owner/services

---

# State Management

Use:
- Context API OR Redux Toolkit

Store:
- User info
- Cart
- Orders
- Auth token

---

# API Integration Preparation

Create reusable Axios instance:
- Base URL support
- JWT token support
- Interceptors

Example backend endpoints:
- /api/auth/login
- /api/auth/register
- /api/shops
- /api/orders
- /api/services

Frontend should be fully ready for future .NET backend connection.

---

# Animations

Use Framer Motion:
- Page transitions
- Card hover effects
- Button hover
- Loading animation
- Smooth modal animations

---

# Responsive Design

Must work perfectly on:
- Mobile
- Tablet
- Laptop
- Large screens

Use:
- Flexbox
- CSS Grid
- Tailwind responsive utilities

---

# Extra Features

Add:
- Dark mode feel only
- Skeleton loading
- Empty state illustrations
- Toast notifications
- Search functionality
- Smooth scrolling
- Professional footer

---

# Footer
Include:
- About
- Contact
- Social links
- Copyright
- Quick links

---

# Important Requirements

1. Frontend only
2. Use dummy/mock JSON data
3. No backend coding
4. Clean reusable components
5. Professional production-level UI
6. Use modern React practices
7. Use functional components and hooks
8. Fully responsive
9. Attractive animations
10. Consistent color system

---

# Final Deliverables

Generate:
- Full React frontend project
- Tailwind setup
- All pages
- Components
- Dummy data
- Routing
- Dashboard UI
- Cart system
- Billing system
- Payment UI
- Order tracking UI
- Professional logo
- Responsive design

The UI should look like a real modern startup laundry service platform.
create the project only frontend in this file if any dependency need please istall it automatically 
