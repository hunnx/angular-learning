// supplier-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupplierService } from '../supplier.service';
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
  imports : [CommonModule],
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit {
  supplier: Supplier | undefined;

  constructor(
    private route: ActivatedRoute,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.supplierService.getSupplier(id).subscribe((data) => this.supplier = data);
  }
}