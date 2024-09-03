import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../supplier.service';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';

//import { Supplier } from '../models/supplier.model';

export interface Supplier {
  id: number;
  name: string;
  phone: string;
  address: string;
}

@Component({
  standalone: true,
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css'],
  imports: [
    RouterModule,
    FormsModule,
    CommonModule
  ]
})
export class SupplierListComponent implements OnInit {
  suppliers: Supplier[] = [];

  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.supplierService.getSuppliers().subscribe((data) => this.suppliers = data);
  }

  deleteSupplier(id: number): void {
    this.supplierService.deleteSupplier(id);
    this.supplierService.getSuppliers().subscribe((data) => this.suppliers = data); // Refresh the list
  }
}