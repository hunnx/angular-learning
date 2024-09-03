// supplier-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../supplier.service';
//import { Supplier } from '../models/supplier.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface Supplier {
  id: number;
  name: string;
  phone: string;
  address: string;
}
@Component({
  standalone:true,
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css'],
  imports: [
    RouterModule,
    FormsModule,
    CommonModule
  ]
})
export class SupplierEditComponent implements OnInit {
  supplier: Supplier | undefined;

  constructor(
    private route: ActivatedRoute,
    private supplierService: SupplierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.supplierService.getSupplier(id).subscribe((data) => this.supplier = data);
  }

  updateSupplier(): void {
    if (this.supplier) {
      this.supplierService.updateSupplier(this.supplier);
      this.router.navigate(['/supplier']); // Redirect to supplier list
    }
  }
}
