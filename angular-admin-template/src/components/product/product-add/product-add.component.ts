import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {
  product = { name: '', price: 0 };

  constructor(private productService: ProductService, private router: Router) {}

  onSubmit() {
    this.productService.addProduct(this.product.name, this.product.price);
    this.router.navigate(['/product']);
    // Navigate back to product list
  }
}
