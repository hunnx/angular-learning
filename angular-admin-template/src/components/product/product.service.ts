import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 }
  ];
  private currentId = 3;

  getProducts() {
    return this.products;
  }

  addProduct(name: string, price: number) {
    const newProduct = {
      id: this.currentId++,
      name: name,
      price: price
    };
    this.products.push(newProduct);
  }

  getProductById(id: number) {
    return this.products.find(product => product.id === id);
  }

  updateProduct(id: number, updatedProduct: { id: number; name: string; price: number }) {
    const index = this.products.findIndex(product => product.id === id);
    if (index > -1) {
      this.products[index] = updatedProduct;
    }
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(product => product.id !== id);

  }
}
