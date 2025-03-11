import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PurchaseRequest, PurchaseRequestItem } from './purchase-request.model'; // Create this model file


@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestService {

  private purchaseRequests: PurchaseRequest[] = []; // Initialize with an empty array
  private nextId: number = 1; // Initialize nextId with the starting ID
  products: any[] = [];
  newItem: any = { productId: '', quantity: 1, unitPrice: 0, tradePrice: 0 };
  
  constructor() {
    this.loadProducts();
    this.loadPurchaseRequests(); // Load existing purchase requests from localStorage
  }
  getPurchaseRequests(): Observable<PurchaseRequest[]> {
    return of(this.purchaseRequests);
  }

  getPurchaseRequest(id: number): Observable<PurchaseRequest | undefined> {
    const request = this.purchaseRequests.find(pr => pr.id === id);
    return of(request);
  }
// Load products from localStorage
loadProducts(): void {
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    this.products = JSON.parse(storedProducts);
  }
}
  addPurchaseRequest(request: PurchaseRequest): void {
    request.id = this.nextId++;
    this.purchaseRequests.push(request);
    localStorage.setItem('purchaseRequests', JSON.stringify(this.purchaseRequests));

  }

  updatePurchaseRequest(updatedRequest: PurchaseRequest): void {
    const index = this.purchaseRequests.findIndex(pr => pr.id === updatedRequest.id);
    if (index !== -1) {
      this.purchaseRequests[index] = updatedRequest;
    }
  }

  deletePurchaseRequest(id: number): void {
    this.purchaseRequests = this.purchaseRequests.filter(pr => pr.id !== id);
  }

  // Load purchase requests from localStorage
  loadPurchaseRequests(): void {
    const storedRequests = localStorage.getItem('purchaseRequests');
    if (storedRequests) {
      this.purchaseRequests = JSON.parse(storedRequests);
    }
  }
}
