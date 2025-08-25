import React from 'react';

function Filters({ filters, setFilters, warehouses, loading }) {
  const statusOptions = ['All', 'Healthy', 'Low', 'Critical'];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Box */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <input
            type="text"
            placeholder="Search by name, SKU, or ID..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Warehouse Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Warehouse
          </label>
          <select
            value={filters.warehouse}
            onChange={(e) => setFilters({ ...filters, warehouse: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          >
            <option value="">All Warehouses</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.code} value={warehouse.code}>
                {warehouse.name} ({warehouse.code})
              </option>
            ))}
          </select>
        </div>

        {/* Status Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filters;
