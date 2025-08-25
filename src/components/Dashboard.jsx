import React, { useState } from 'react';
import { TrendingUp, Package, ShoppingCart, Percent } from 'lucide-react';
import KPICards from './KPICards';
import LineChart from './LineChart';
import Filters from './Filters';
import ProductsTable from './ProductsTable';

function Dashboard({ products, warehouses, kpis, filters, setFilters, dateRange, setDateRange, loading, onProductSelect }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const totalDemand = products.reduce((sum, product) => sum + product.demand, 0);
  const fillRate = totalDemand > 0 ? (products.reduce((sum, product) => sum + Math.min(product.stock, product.demand), 0) / totalDemand) * 100 : 0;

  const kpiData = [
    {
      title: 'Total Stock',
      value: totalStock.toLocaleString(),
      icon: Package,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Total Demand',
      value: totalDemand.toLocaleString(),
      icon: ShoppingCart,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Fill Rate',
      value: `${fillRate.toFixed(1)}%`,
      icon: Percent,
      color: 'bg-purple-500',
      change: '+2.5%'
    }
  ];

  const dateRangeOptions = [
    { value: '7d', label: '7d' },
    { value: '14d', label: '14d' },
    { value: '30d', label: '30d' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">SupplySight</h1>
            </div>
            <div className="flex space-x-2">
              {dateRangeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setDateRange(option.value)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    dateRange === option.value
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <KPICards data={kpiData} loading={loading.kpis} />

        {/* Line Chart */}
        <div className="mt-8">
          <LineChart data={kpis} loading={loading.kpis} />
        </div>

        {/* Filters */}
        <div className="mt-8">
          <Filters
            filters={filters}
            setFilters={setFilters}
            warehouses={warehouses}
            loading={loading.warehouses}
          />
        </div>

        {/* Products Table */}
        <div className="mt-8">
          <ProductsTable
            products={products}
            loading={loading.products}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            onProductSelect={onProductSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;