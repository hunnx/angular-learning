import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent {
  product = {id:0, name: '', price: 0 };

  constructor(private productService: ProductService, private router: Router) {}

  onSubmit() {
    this.productService.updateProduct(this.product.id, {
      id: this.product.id,
      name: this.product.name,
      price: this.product.price
    });
    this.router.navigate(['/product']);
  }
}
