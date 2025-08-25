const products = [
  { id: "P-1001", name: "12mm Hex Bolt", sku: "HEX-12-100", warehouse: "BLR-A", stock: 180, demand: 120 },
  { id: "P-1002", name: "Steel Washer", sku: "WSR-08-500", warehouse: "BLR-A", stock: 50, demand: 80 },
  { id: "P-1003", name: "M8 Nut", sku: "NUT-08-200", warehouse: "PNQ-C", stock: 80, demand: 80 },
  { id: "P-1004", name: "Bearing 60822", sku: "BRG-608-50", warehouse: "DEL-B", stock: 24, demand: 120 },
  { id: "P-1005", name: "Aluminum Plate", sku: "ALM-10-200", warehouse: "BLR-A", stock: 200, demand: 150 },
  { id: "P-1006", name: "Copper Wire", sku: "COP-2-1000", warehouse: "PNQ-C", stock: 300, demand: 250 },
  { id: "P-1007", name: "Rubber Gasket", sku: "RUB-05-300", warehouse: "DEL-B", stock: 75, demand: 90 },
  { id: "P-1008", name: "Steel Rod", sku: "STL-20-50", warehouse: "BLR-A", stock: 120, demand: 100 },
  { id: "P-1009", name: "Plastic Container", sku: "PLA-30-100", warehouse: "PNQ-C", stock: 60, demand: 80 },
  { id: "P-1010", name: "Ceramic Insulator", sku: "CER-15-75", warehouse: "DEL-B", stock: 45, demand: 60 },
  { id: "P-1011", name: "Titanium Screw", sku: "TIT-08-150", warehouse: "BLR-A", stock: 90, demand: 110 },
  { id: "P-1012", name: "Carbon Fiber Sheet", sku: "CAR-05-25", warehouse: "PNQ-C", stock: 30, demand: 40 }
];

const warehouses = [
  { code: "BLR-A", name: "Bangalore Central", city: "Bangalore", country: "India" },
  { code: "PNQ-C", name: "Pune Industrial", city: "Pune", country: "India" },
  { code: "DEL-B", name: "Delhi North", city: "Delhi", country: "India" }
];

module.exports = { products, warehouses };