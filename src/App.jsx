import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Dashboard from './components/Dashboard';
import ProductDrawer from './components/ProductDrawer';

const GET_PRODUCTS = gql`
  query GetProducts($search: String, $status: String, $warehouse: String) {
    products(search: $search, status: $status, warehouse: $warehouse) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`;

const GET_WAREHOUSES = gql`
  query GetWarehouses {
    warehouses {
      code
      name
      city
      country
    }
  }
`;

const GET_KPIS = gql`
  query GetKPIs($range: String!) {
    kpis(range: $range) {
      date
      stock
      demand
    }
  }
`;

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    warehouse: '',
    status: 'All'
  });
  const [dateRange, setDateRange] = useState('7d');

  const { data: productsData, loading: productsLoading, error: productsError } = useQuery(GET_PRODUCTS, {
    variables: filters
  });

  const { data: warehousesData, loading: warehousesLoading } = useQuery(GET_WAREHOUSES);

  const { data: kpisData, loading: kpisLoading } = useQuery(GET_KPIS, {
    variables: { range: dateRange }
  });

  if (productsError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Dashboard</h1>
          <p className="text-gray-600">{productsError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Dashboard
        products={productsData?.products || []}
        warehouses={warehousesData?.warehouses || []}
        kpis={kpisData?.kpis || []}
        filters={filters}
        setFilters={setFilters}
        dateRange={dateRange}
        setDateRange={setDateRange}
        loading={{ products: productsLoading, warehouses: warehousesLoading, kpis: kpisLoading }}
        onProductSelect={setSelectedProduct}
      />
      
      {selectedProduct && (
        <ProductDrawer
          product={selectedProduct}
          warehouses={warehousesData?.warehouses || []}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default App;