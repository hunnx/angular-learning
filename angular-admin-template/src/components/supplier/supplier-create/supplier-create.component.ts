import { Component } from '@angular/core';
//import { Router } from '@angular/router';
import { SupplierService } from '../supplier.service';
//import { Supplier } from '../models/supplier.model';

import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';

export interface Supplier {
  id: number;
  name: string;
  phone: string;
  address: string;
}
@Component({
  standalone:true,
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css'],
  imports: [
    RouterModule,
    FormsModule,
    CommonModule
  ]
})
export class SupplierCreateComponent {
  supplier: Supplier = { id: 0, name: '', phone: '', address: '' };

  constructor(private supplierService: SupplierService, private router: Router) { }

  addSupplier(): void {
    this.supplierService.addSupplier(this.supplier);
    this.router.navigate(['/supplier']); // Redirect to supplier list
  }
}