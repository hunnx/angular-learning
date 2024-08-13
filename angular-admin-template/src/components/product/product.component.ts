import { Component, OnInit } from '@angular/core';
//import { ProductService } from '; // Import the ProductService

import { ProductService } from '../product/product.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: 'product.component.html',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class ProductComponent implements OnInit {
  products = [];
  searchTerm = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  filteredProducts() {
    return this.products.filter(product => 
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  editProduct(id: number) {
    this.router.navigate(['/product/edit', id]);
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id);
    this.loadProducts(); // Reload the products after deletion
  }

  loadProducts(): void {
    this.products = this.productService.getProducts();
  }
}
