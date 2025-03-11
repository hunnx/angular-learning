import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
CommonModule
@Component({
  standalone:true,
  imports : [CommonModule],
  selector: 'app-purchase-request-detail',
  templateUrl: './purchase-request-detail.component.html',
  styleUrls: ['./purchase-request-detail.component.scss']
})
export class PurchaseRequestDetailComponent implements OnInit {
  purchaseRequest: any; // Replace 'any' with your actual PurchaseRequest model if available
  products: any[] = []; // Array to hold product details from localStorage
  currentId: number = 1; // To track the current product ID

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadProducts();
    this.getPurchaseRequest();
  }

  // Load products from localStorage
  private loadProducts(): void {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
    }
  }

  // Fetch purchase request details by ID from localStorage
  getPurchaseRequest(): void {
    const id = +this.route.snapshot.paramMap.get('id'); // Assuming 'id' is passed in route
    const storedRequests = localStorage.getItem('purchaseRequests');
    if (storedRequests) {
      const purchaseRequests = JSON.parse(storedRequests);
      this.purchaseRequest = purchaseRequests.find((request) => request.id === id);
      console.log(this.purchaseRequest);
    }
  }

  // Method to get the product name by its ID from localStorage
  getProductById(productId: number): any {
    const numericProductId = Number(productId); // Convert to number
    return this.products.find((product) => product.id === numericProductId);
  }

  // Calculate total quantity of items in the request
  calculateTotalQuantity(): number {
    return this.purchaseRequest.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Calculate total price of all items
  calculateTotalPrice(): number {
    return this.purchaseRequest.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  }

  // Navigate back to the purchase request list
  goBack(): void {
    window.history.back(); // You can also use Angular's router for navigation if preferred
  }
}
