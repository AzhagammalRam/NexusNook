# 🚀 NexusNook Dashboard – Front-End Assignment

## 🧾 Overview

This is a **responsive Product Dashboard** built using **React**, **TypeScript**, **Bootstrap**, and **Material UI**. It includes a product listing with filters, sorting, and detailed views for each product.

---

## 🧰 Tech Stack

- **React** (Functional Components with Hooks)
- **TypeScript** – Type safety and IntelliSense
- **Bootstrap** – Base layout and responsive design
- **Material UI (MUI)** – Components and UI elements
- **Axios** – For making HTTP requests
- **Redux** – For global state management
- **React Router** – For navigation between views
---

## 🚀 Setup Instructions

### 1. Clone the Repository

    ```bash
    git clone https://github.com/AzhagammalRam/NexusNook.git
    cd product-dashboard
2. Install Dependencies
    bash
    Copy
    Edit
    npm install

3. Start the Development Server
    bash
    Copy
    Edit
    npm run dev

📦 Features
🛍️ Product List Page
Display products in a card/grid layout using Material UI and Bootstrap

Each product includes:

Name

Image (added Alt)

Price

Category

🔍 Filters and Sorting
Filter by Category (checkboxes with dropdown can select multiple categories)

Filter by Price Range

Sort by:

Name (ascending/descending)

Price (ascending/descending)

📄 Product Detail Page
Full image

Description

Specifications 

Stock availability

📱 Responsive Design
Mobile and desktop friendly using Bootstrap grid system and MUI breakpoints

🔄 State Management
Redux Toolkit is used for managing application-wide state like:

Product data

Filter and sort state

Loading and error handling

🌐 API Integration
Used Axios to fetch data from a mocked or external API

Handles loading and error states gracefully

📁 Project Structure
graphql
Copy
Edit
src/
├── components/         # Reusable UI elements
├── features/           # Redux slices and feature-specific logic
├── pages/              # Product List and Product Detail pages
├── services/           # API calls using Axios
├── types/              # TypeScript interfaces
├── App.tsx             # Routing and layout
└── index.tsx           # Entry point
✅ Completed
 Product list UI

 Filtering and sorting

 Product detail view

 Responsive design

 Global state via Redux

 API integration with Axios