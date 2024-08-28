import { NumberInput } from '@angular/cdk/coercion';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: { id: number; name: string; price: number; quantity:number;  categoryId: number; categoryName: string }[] = [];
  private currentId = 1;

  constructor() {
    this.loadProducts();
  }

  // Load products from localStorage
  private loadProducts() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
      this.currentId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    }
  }

  // Save products to localStorage
  private saveProducts() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  // Get all products
  getProducts() {
    return this.products;
  }

  // Add a new product
  addProduct(name: string, price: number,quantity:number, categoryId: number, categoryName: string) {
    const newProduct = {
      id: this.currentId++,
      name: name,
      price: price,
      quantity :quantity,
      categoryId,
      categoryName
    };
    console.log(newProduct)
    this.products.push(newProduct);
    this.saveProducts(); // Save after adding a new product
  }

  // Get a product by ID
  getProductById(id: number) {
    return this.products.find(product => product.id === id);
  }

  // Update a product
  updateProduct(id: number, updatedProduct: { id: number; name: string;quantity:number; price: number; categoryId: number; categoryName: string }) {
    const index = this.products.findIndex(product => product.id === id);
    if (index > -1) {
      this.products[index] = updatedProduct;
      this.saveProducts(); // Save after updating a product
    }
  }

  // Delete a product
  deleteProduct(id: number) {
    this.products = this.products.filter(product => product.id !== id);
    this.saveProducts(); // Save after deleting a product
  }
}
