# SupplySight Dashboard - Implementation Notes

## Technical Decisions

### 1. Technology Stack
- **React 18** with functional components and hooks for modern, clean code
- **Apollo Client** for GraphQL integration with caching and optimistic updates
- **Tailwind CSS** for rapid, consistent styling
- **Recharts** for responsive, interactive charts
- **Express + Apollo Server** for the mock GraphQL backend
- **Vite** for fast development and building

### 2. Architecture Decisions
- **Component-based structure** with clear separation of concerns
- **Custom hooks** for data fetching and state management
- **Responsive design** that works on desktop and mobile
- **Real-time filtering** with debounced search
- **Optimistic UI updates** for better user experience

### 3. Data Management
- **Apollo Client cache** for efficient data fetching and caching
- **Refetch queries** after mutations to keep data in sync
- **Error handling** with user-friendly error messages
- **Loading states** for better UX during data fetching

## Key Features Implemented

### ✅ Dashboard Layout
- Top bar with SupplySight logo and date range selector (7d/14d/30d)
- Three KPI cards showing Total Stock, Total Demand, and Fill Rate
- Interactive line chart showing Stock vs Demand trends
- Filter row with search, warehouse, and status dropdowns

### ✅ Products Table
- All required columns (Product, SKU, Warehouse, Stock, Demand, Status)
- Status indicators with color coding:
  - 🟢 Healthy (stock > demand)
  - 🟡 Low (stock = demand)
  - 🔴 Critical (stock < demand) with red-tinted rows
- Pagination with 10 rows per page
- Clickable rows that open product details drawer

### ✅ Interactive Features
- Real-time filtering by search term, warehouse, and status
- Date range
