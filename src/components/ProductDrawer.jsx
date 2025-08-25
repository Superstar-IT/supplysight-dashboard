import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { X, Package, TrendingUp } from 'lucide-react';

const UPDATE_DEMAND = gql`
  mutation UpdateDemand($id: ID!, $demand: Int!) {
    updateDemand(id: $id, demand: $demand) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`;

const TRANSFER_STOCK = gql`
  mutation TransferStock($id: ID!, $from: String!, $to: String!, $qty: Int!) {
    transferStock(id: $id, from: $from, to: $to, qty: $qty) {
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

function ProductDrawer({ product, warehouses, onClose }) {
  const [activeTab, setActiveTab] = useState('details');
  const [updateDemand, { loading: updateLoading }] = useMutation(UPDATE_DEMAND, {
    refetchQueries: ['GetProducts']
  });
  const [transferStock, { loading: transferLoading }] = useMutation(TRANSFER_STOCK, {
    refetchQueries: ['GetProducts']
  });

  const [demandForm, setDemandForm] = useState({ demand: product.demand });
  const [transferForm, setTransferForm] = useState({
    from: product.warehouse,
    to: '',
    qty: ''
  });

  const getProductStatus = (product) => {
    if (product.stock > product.demand) return { status: 'Healthy', color: 'text-green-600' };
    if (product.stock === product.demand) return { status: 'Low', color: 'text-yellow-600' };
    return { status: 'Critical', color: 'text-red-600' };
  };

  const statusInfo = getProductStatus(product);

  const handleUpdateDemand = async (e) => {
    e.preventDefault();
    try {
      await updateDemand({
        variables: {
          id: product.id,
          demand: parseInt(demandForm.demand)
        }
      });
      alert('Demand updated successfully!');
    } catch (error) {
      alert(`Error updating demand: ${error.message}`);
    }
  };

  const handleTransferStock = async (e) => {
    e.preventDefault();
    try {
      await transferStock({
        variables: {
          id: product.id,
          from: transferForm.from,
          to: transferForm.to,
          qty: parseInt(transferForm.qty)
        }
      });
      alert('Stock transferred successfully!');
      setTransferForm({ from: product.warehouse, to: '', qty: '' });
    } catch (error) {
      alert(`Error transferring stock: ${error.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-full max-w-md bg-white shadow-xl h-full overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('details')}
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              activeTab === 'details'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('update')}
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              activeTab === 'update'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Update Demand
          </button>
          <button
            onClick={() => setActiveTab('transfer')}
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              activeTab === 'transfer'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Transfer Stock
          </button>
        </div>

        <div className="p-6">
          {/* Product Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.sku}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product ID</label>
                  <p className="mt-1 text-sm text-gray-900">{product.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <p className={`mt-1 text-sm font-medium ${statusInfo.color}`}>
                    {statusInfo.status === 'Healthy' && '🟢'}
                    {statusInfo.status === 'Low' && '🟡'}
                    {statusInfo.status === 'Critical' && '🔴'}
                    {statusInfo.status}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Warehouse</label>
                  <p className="mt-1 text-sm text-gray-900">{product.warehouse}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock</label>
                  <p className="mt-1 text-sm text-gray-900">{product.stock.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Demand</label>
                  <p className="mt-1 text-sm text-gray-900">{product.demand.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fill Rate</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {Math.min(product.stock, product.demand) / product.demand * 100}%
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Update Demand Tab */}
          {activeTab === 'update' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Update Demand</h3>
              <form onSubmit={handleUpdateDemand} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Demand Value
                  </label>
                  <input
                    type="number"
                    value={demandForm.demand}
                    onChange={(e) => setDemandForm({ demand: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={updateLoading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {updateLoading ? 'Updating...' : 'Update Demand'}
                </button>
              </form>
            </div>
          )}

          {/* Transfer Stock Tab */}
          {activeTab === 'transfer' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Transfer Stock</h3>
              <form onSubmit={handleTransferStock} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Warehouse
                  </label>
                  <select
                    value={transferForm.from}
                    onChange={(e) => setTransferForm({ ...transferForm, from: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {warehouses.map((warehouse) => (
                      <option key={warehouse.code} value={warehouse.code}>
                        {warehouse.name} ({warehouse.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To Warehouse
                  </label>
                  <select
                    value={transferForm.to}
                    onChange={(e) => setTransferForm({ ...transferForm, to: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select destination warehouse</option>
                    {warehouses
                      .filter((w) => w.code !== transferForm.from)
                      .map((warehouse) => (
                        <option key={warehouse.code} value={warehouse.code}>
                          {warehouse.name} ({warehouse.code})
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity to Transfer
                  </label>
                  <input
                    type="number"
                    value={transferForm.qty}
                    onChange={(e) => setTransferForm({ ...transferForm, qty: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max={product.stock}
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Available stock: {product.stock.toLocaleString()}
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={transferLoading}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {transferLoading ? 'Transferring...' : 'Transfer Stock'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDrawer;