import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product/product.service';
import { Order } from '../orders/orders.module';
import { OrderService } from '../orders/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent {
 // Updated product model with category information
products: { id: number; name: string; price: number; quantity: number; categoryId: number; categoryName: string }[] = [];

 selectedProducts: { id: number; name: string; price: number; quantity: number; categoryId: number; categoryName: string }[] = [];
 totalAmount: number = 0;

 constructor(private productService: ProductService,private orderService: OrderService,private router: Router
 ) {}

 ngOnInit(): void {
   // Initialize with some products (replace with real data or fetch from a service)
/*    this.products = [
     { id: 1, name: 'Product 1', price: 100, quantity: 0, categoryId: 1, categoryName: 'Category A' },
     { id: 2, name: 'Product 2', price: 200, quantity: 0, categoryId: 2, categoryName: 'Category B' },
     { id: 3, name: 'Product 3', price: 300, quantity: 0, categoryId: 1, categoryName: 'Category A' },
   ]; */

   this.products = this.productService.getProducts();

} 

addProductToSale(product: { id: number; name: string; price: number; quantity: number; categoryId: number; categoryName: string }) {
  const existingProduct = this.selectedProducts.find(p => p.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    this.selectedProducts.push({ ...product, quantity: 1 });
  }
  this.updateTotalAmount();
}

updateQuantity(product: { id: number; name: string; price: number; quantity: number; categoryId: number; categoryName: string }, quantity: number) {
  product.quantity = quantity;
  this.updateTotalAmount();
}

updateTotalAmount() {
  this.totalAmount = this.selectedProducts.reduce((total, product) => {
    return total + (product.price * product.quantity);
  }, 0);
}

removeProductFromSale(productId: number) {
  this.selectedProducts = this.selectedProducts.filter(product => product.id !== productId);
  this.updateTotalAmount();
}

checkout() {
  // Create a new order object
  const newOrder: Order = {
    id: new Date().getTime(), // or use a more sophisticated ID generation strategy
    date: new Date(),
    customerName: '', // Optional, fill if needed
    products: this.selectedProducts.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity
    })),
    totalAmount: this.totalAmount
  };

  // Save the order using the OrderService
  this.orderService.addOrder(newOrder);

  // Clear the selected products and total amount after checkout
  this.selectedProducts = [];
  this.totalAmount = 0;

  this.router.navigate(['/orders']);
}

}
