type Variant = {
    size: string;
    color: string;
    stock: number;
  };
  
  type ProductForm = {
    name: string;
    description: string;
    price: number;
    images: string[];
    variants: Variant[];
  };
  