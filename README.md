# ☕ Cardamom House

A modern, responsive café menu experience built with Next.js 15, TypeScript, and Tailwind CSS.

This project recreates the digital menu experience for **Cardamom House**, a fictional brunch café in Lisbon. The application focuses on clean design, accessibility, responsive layouts, smooth interactions, and a premium user experience.

---

## 🚀 Live Features

### Core Features

- Responsive Hero Section
- Open / Closed Status Indicator
- Today's Special Banner
- Menu Categories
  - Brunch
  - Sandwiches & Toasties
  - Drinks
  - Sides & Extras

- Active Navigation Highlight
- Search Menu Items
- Dietary Filters
  - All
  - Vegetarian
  - Gluten Free

- Sold Out State Handling
- Opening Hours Section
- Footer with Contact Information and Map
- Mobile-Friendly Navigation

---

## ✨ Enhancements

### User Experience

- Sticky Navigation Bar
- Smooth Scrolling Between Sections
- Search Integrated Into Navbar
- Hover Animations on Menu Cards
- Interactive Menu Cards
- Quantity Selector
- Mock Order Placement
- Random Token Generation

### Accessibility

- Semantic HTML Structure
- Keyboard Navigable Navigation
- Focus States
- Responsive Design
- Accessible Form Controls

### Visual Design

- Premium Café Inspired UI
- Warm Color Palette
- Responsive Card Layouts
- Food Image Support
- Smooth Transitions & Micro Interactions

---

## 🛠 Tech Stack

### Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS

### UI Libraries

- Lucide React Icons

### Styling

- Tailwind CSS
- Custom Animations
- Responsive Design Principles

---

## 📂 Project Structure

src/

├── app/

│ ├── page.tsx

│ └── globals.css

│

├── components/

│ ├── Navbar.tsx

│ ├── Hero.tsx

│ ├── SpecialBanner.tsx

│ ├── MenuContent.tsx

│ ├── MenuSection.tsx

│ ├── MenuItem.tsx

│ ├── HoursBlock.tsx

│ ├── Footer.tsx

│ └── Tag.tsx

│

├── data/

│ └── menu.ts

│

├── hooks/

│ └── useActiveSection.ts

│

├── lib/

│ └── menuHelpers.ts

│

└── types/

└── menu.ts

---

## 📱 Responsive Design

The application is optimized for:

- Mobile Devices
- Tablets
- Laptops
- Desktop Screens

---

## 🎯 State Handling

The application supports the following states through URL parameters:

### Open State

```url
/
```

### Closed State

```url
/?state=closed
```

### Today's Special Sold Out

```url
/?state=special-sold-out
```

---

## 🏃 Getting Started

### Clone Repository

```bash
git clone <repository-url>
```

### Install Dependencies

```bash
npm install
```

### Adding Env file(.env.local)
```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
```

### Run Development Server

```bash
npm run dev
```

### Build Production Version

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

---

## 📌 Assumptions

- Order placement is a frontend-only mock implementation.
- Token numbers are randomly generated for demonstration purposes.
- Menu data is stored locally in a TypeScript data file.
- Images fall back to a placeholder when unavailable.

---

## 🔮 Future Improvements

- Backend Order Management
- Real-Time Kitchen Queue
- User Authentication
- Online Payments
- Multi-Language Support
- Reservation System
- CMS Integration
- Admin Dashboard

---

## 📄 License

This project was created as part of a frontend engineering assignment and is intended for educational and evaluation purposes.
