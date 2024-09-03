import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Supplier {
  id: number;
  name: string;
  phone: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private suppliers: Supplier[] = []; // Initialize with an empty array
  private nextId: number = 1; // Initialize nextId with the starting ID

  constructor() { }

  getSuppliers(): Observable<Supplier[]> {
    return of(this.suppliers); // Return suppliers as an observable
  }

  getSupplier(id: number): Observable<Supplier | undefined> {
    const supplier = this.suppliers.find(s => s.id === id);
    return of(supplier);
  }

  addSupplier(supplier: Supplier): void {
    supplier.id = this.nextId++;
    this.suppliers.push(supplier);
  }

  updateSupplier(updatedSupplier: Supplier): void {
    const index = this.suppliers.findIndex(s => s.id === updatedSupplier.id);
    if (index !== -1) {
      this.suppliers[index] = updatedSupplier;
    }
  }

  deleteSupplier(id: number): void {
    this.suppliers = this.suppliers.filter(s => s.id !== id);
  }
}