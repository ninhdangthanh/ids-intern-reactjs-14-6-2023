
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface ProductCreate {
  name: string;
  description: string;
  price: number;
}

export interface Staff {
  id: string;
  name: string;
  position: string;
  department: string;
}

export interface StaffCreate {
  name: string;
  position: string;
  department: string;
}

export interface Order {
  id: string;
  product_id: string;
  quantity: string;
  order_date: string;
}

export interface OrderCreate {
  product_id: string;
  quantity: string;
  order_date: string;
}
