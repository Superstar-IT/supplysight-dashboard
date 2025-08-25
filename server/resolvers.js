const { products, warehouses, kpis } = require('./data');

const resolvers = {
  Query: {
    products: (_, { search, status, warehouse }) => {
      let filteredProducts = [...products];
      
      if (search) {
        const searchLower = search.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchLower) ||
          product.sku.toLowerCase().includes(searchLower) ||
          product.id.toLowerCase().includes(searchLower)
        );
      }
      
      if (warehouse) {
        filteredProducts = filteredProducts.filter(product =>
          product.warehouse === warehouse
        );
      }
      
      if (status && status !== 'All') {
        filteredProducts = filteredProducts.filter(product => {
          const productStatus = getProductStatus(product);
          return productStatus === status;
        });
      }
      
      return filteredProducts;
    },
    
    warehouses: () => warehouses,
    
    kpis: (_, { range }) => {
      const days = range === '7d' ? 7 : range === '14d' ? 14 : 30;
      const kpiData = [];
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        kpiData.push({
          date: date.toISOString().split('T')[0],
          stock: Math.floor(Math.random() * 1000) + 500,
          demand: Math.floor(Math.random() * 800) + 300
        });
      }
      
      return kpiData;
    }
  },
  
  Mutation: {
    updateDemand: (_, { id, demand }) => {
      const productIndex = products.findIndex(p => p.id === id);
      if (productIndex === -1) {
        throw new Error('Product not found');
      }
      
      products[productIndex].demand = demand;
      return products[productIndex];
    },
    
    transferStock: (_, { id, from, to, qty }) => {
      const productIndex = products.findIndex(p => p.id === id);
      if (productIndex === -1) {
        throw new Error('Product not found');
      }
      
      if (products[productIndex].warehouse !== from) {
        throw new Error('Product not in source warehouse');
      }
      
      if (products[productIndex].stock < qty) {
        throw new Error('Insufficient stock');
      }
      
      products[productIndex].stock -= qty;
      products[productIndex].warehouse = to;
      
      return products[productIndex];
    }
  }
};

function getProductStatus(product) {
  if (product.stock > product.demand) return 'Healthy';
  if (product.stock === product.demand) return 'Low';
  return 'Critical';
}

module.exports = { resolvers };