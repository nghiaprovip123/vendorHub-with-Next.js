export const mock = [
  {
    name: 'Product 1',
    sku: 'SKU-001',
    stock: 90,
    category: 'Fashion',
    warehouse: ['Warehouse 1', 'Warehouse 2'],
    variants: 3
  },
  {
    name: 'Product 2',
    sku: 'SKU-002',
    stock: 90,
    category: 'Fashion',
    warehouse: ['Warehouse 1', 'Warehouse 2'],
    variants: 3
  },
  {
    name: 'Product 1',
    sku: 'SKU-001',
    stock: 90,
    category: 'Fashion',
    warehouse: ['Warehouse 1', 'Warehouse 2'],
    variants: 3
  },
  {
    name: 'Product 2',
    sku: 'SKU-002',
    stock: 90,
    category: 'Fashion',
    warehouse: ['Warehouse 1', 'Warehouse 2'],
    variants: 3
  },
  {
    name: 'Product 1',
    sku: 'SKU-001',
    stock: 90,
    category: 'Fashion',
    warehouse: ['Warehouse 1', 'Warehouse 2'],
    variants: 3
  },
  {
    name: 'Product 2',
    sku: 'SKU-002',
    stock: 90,
    category: 'Fashion',
    warehouse: ['Warehouse 1', 'Warehouse 2'],
    variants: 3
  },
  {
    name: 'Product 1',
    sku: 'SKU-001',
    stock: 90,
    category: 'Fashion',
    warehouse: ['Warehouse 1', 'Warehouse 2'],
    variants: 3
  },
  {
    name: 'Product 2',
    sku: 'SKU-002',
    stock: 90,
    category: 'Fashion',
    warehouse: ['Warehouse 1', 'Warehouse 2'],
    variants: 3
  },
  {
    name: 'Product 1',
    sku: 'SKU-001',
    stock: 90,
    category: 'Fashion',
    warehouse: ['Warehouse 1', 'Warehouse 2'],
    variants: 3
  },
  {
    name: 'Product 2',
    sku: 'SKU-002',
    stock: 90,
    category: 'Fashion',
    warehouse: ['Warehouse 1', 'Warehouse 2'],
    variants: 3
  },
];

export enum FilterKeys {
  _TITLE = 'productTitle',
  _SKU = 'sku',
  _STOCK_LEVEL = 'stockLevel',
  _CATEGORY = 'category',
  _WAREHOUSE = 'warehouse',
}

export type ProductFilterParams = {
  [FilterKeys._TITLE]: string,
  [FilterKeys._SKU]: string,
  [FilterKeys._STOCK_LEVEL]: number[],
  [FilterKeys._CATEGORY]: string,
  [FilterKeys._WAREHOUSE]: string,
};

export const ProductFilterParamsValues = {
  [FilterKeys._TITLE]: '',
  [FilterKeys._SKU]: '',
  [FilterKeys._STOCK_LEVEL]: [0, 0],
  [FilterKeys._CATEGORY]: '',
  [FilterKeys._WAREHOUSE]: '',
};

