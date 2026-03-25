# Veloura: The Ultimate Digital Flagship & Luxury Fragrance Experience

Veloura is a premium, high-fashion e-commerce storefront designed for the modern connoisseur of elite fragrances. This project transforms a traditional online shop into a cinematic digital flagship, blending cutting-edge web technologies with a sophisticated "Velvet & Gold" aesthetic. 

Built with **React 18** and **Vite**, the platform is optimized for lightning-fast performance, fluid animations, and a world-class user journey. Behind the scenes, the store is powered by **n8n** automation to instantly process orders and notify the concierge team via Telegram.

## 🌟 Key Features

*   **Visionary Glassmorphism Design**: A custom "Cream & Charcoal" color palette with gold accents, blurry orbital background animations, and scroll-triggered micro-interactions.
*   **Fully Responsive**: Adaptive layouts across desktop, tablet, and a custom cinematic hamburger navigation menu for mobile viewports.
*   **Smart Automation**: Real-time integration with n8n webhooks for order processing. Upon checkout, data is securely processed and the concierge team is instantly notified via a Telegram Bot.
*   **Personalized Post-Purchase Experience**: Customers are directed to a premium success page that dynamically greets them by name and provides an instant tracking reference.
*   **State Management**: High-performance, reactive cart management powered by Zustand.

## 📁 Project Structure

```text
veloura-perfume-shop/
├── automation/
│   └── order_workflow.json     # The n8n automation workflow definition
├── public/
│   └── assets/                 # Static assets, luxury bottle renders, and logos
├── src/
│   ├── config/
│   │   └── global.config.js    # Centralized app config (socials, thresholds)
│   ├── features/               # Domain-driven feature modules
│   │   ├── admin/              # Admin dashboard components
│   │   ├── cart/               # Shopping cart state and UI
│   │   ├── checkout/           # Checkout logic and Personalized Success Page
│   │   ├── product/            # Product catalog and detail views
│   │   ├── storefront/         # The Hero section and main shopping grids
│   │   └── tracking/           # Order tracking features
│   ├── layouts/
│   │   ├── AdminLayout.jsx     # Admin wrapper
│   │   └── MainLayout.jsx      # Customer wrapper with mobile navigation
│   ├── services/
│   │   └── n8n-client.js       # The unified Axios bridge to n8n webhooks
│   ├── store/
│   │   └── useCartStore.js     # Zustand global state management
│   ├── styles/
│   │   └── index.css           # Core design system, Tailwind, and custom CSS
│   ├── App.jsx                 # React Router definitions
│   └── main.jsx                # Application root
├── .env.example                # Template for required environment variables
├── index.html                  # HTML entry point
├── package.json                # Project dependencies and NPM scripts
├── tailwind.config.js          # Tailwind styling configuration
└── vite.config.js              # Vite build configuration
```

## 🚀 Getting Started

To run the Veloura digital flagship locally:

### 1. Installation
Clone the repository and install the required dependencies:
```bash
npm install
```

### 2. Environment Configuration
Create an `.env` file in the root directory and copy the contents of `.env.example`. You will need to provide your proprietary n8n webhook URLs and API keys to enable live order processing.
```bash
cp .env.example .env
```

### 3. Start the Development Server
Launch the Vite development server to view the application:
```bash
npm run dev
```

### 4. Deploying the Automation
To activate the backend logic, import the `automation/order_workflow.json` file into your n8n instance. Ensure your webhooks are set to 'Active' and your Telegram Bot token is configured within the n8n environment.

---
*Developed as the ultimate statement in digital luxury e-commerce.*
