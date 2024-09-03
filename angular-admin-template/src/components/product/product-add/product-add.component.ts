import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  product = { name: '', price: 0,quantity:0, categoryId: 0, categoryName: '' };
  categories = [];
  showAddCategoryForm = false;
  newCategoryName = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }

  onSubmit() {
    // Check if the selected category is "Add New"
    if (this.product.categoryId === -1) {
      this.addNewCategory();
    } else {
      const categoryName = this.categoryService.getCategoryNameById(this.product.categoryId);
      this.product.categoryName = categoryName; // Set category name for the product
      this.productService.addProduct(this.product.name,this.product.price,this.product.quantity, this.product.categoryId, categoryName);
      this.router.navigate(['/product']);
    }
  }

  addNewCategory() {
    if (this.newCategoryName.trim()) {
      const newCategory = { name: this.newCategoryName.trim() };
      this.categoryService.addCategory(newCategory);
      this.categories = this.categoryService.getCategories();
      this.product.categoryId = this.categories[this.categories.length - 1].id; // Set the new category as selected
      this.product.categoryName = this.newCategoryName.trim(); // Set new category name for the product
      this.newCategoryName = '';
      this.showAddCategoryForm = false;
    }
  }

  onCategoryChange(value: string) {
    // Display the form to add a new category if the user selects "Add New"
    if (value === 'add-new') {
      this.showAddCategoryForm = true;
      this.product.categoryId = -1; // Set categoryId to a special value indicating new category
    } else {
      this.showAddCategoryForm = false;
      this.product.categoryId = Number(value); // Ensure categoryId is a number
    }
  }
}
