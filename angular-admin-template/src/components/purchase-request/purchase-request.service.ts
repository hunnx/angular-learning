import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { PurchaseRequest, PurchaseRequestItem } from './purchase-request.model'; // Create this model file


@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestService {

  private purchaseRequests: PurchaseRequest[] = []; // Initialize with an empty array
  private nextId: number = 1; // Initialize nextId with the starting ID

  constructor(private http: HttpClient) {}

  getPurchaseRequests(): Observable<PurchaseRequest[]> {
    return of(this.purchaseRequests);
  }

  getPurchaseRequest(id: number): Observable<PurchaseRequest | undefined> {
    const request = this.purchaseRequests.find(pr => pr.id === id);
    return of(request);
  }

  addPurchaseRequest(request: PurchaseRequest): void {
    request.id = this.nextId++;
    this.purchaseRequests.push(request);
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
  //constructor() {}
 /*  private apiUrl = 'YOUR_API_URL_HERE/purchase-requests'; // Replace with your API endpoint
  getPurchaseRequestById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  } */
}
