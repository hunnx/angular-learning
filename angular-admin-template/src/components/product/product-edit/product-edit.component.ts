import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  product = { id: 0, name: '', price: 0, categoryId: 0, categoryName:"" };
  categories = [];
  showAddCategoryForm = false;
  newCategoryName = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProduct();
  }

  loadCategories() {
    this.categories = this.categoryService.getCategories();
  }

  loadProduct() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.product = this.productService.getProductById(id);

    // Ensure the categoryId is correctly set to reflect the selected category
    if (this.product.categoryId === -1) { // Check if it's the special value for "Add New"
      this.showAddCategoryForm = true;
    }
  }

  onSubmit() {
    if (this.product.categoryId === -1) { // Handle adding new category
      this.addNewCategory();
    } else {
      const categoryName = this.categoryService.getCategoryNameById(this.product.categoryId);
      this.product.categoryName = categoryName; // Set category name for the product
      this.productService.updateProduct(this.product.id, {
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        categoryId: this.product.categoryId,
        categoryName: this.product.categoryName
      });
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

  onCategoryChange(value: number | string) {
    if (value === -1) { // Special value for "Add New Category"
      this.showAddCategoryForm = true;
    } else {
      this.showAddCategoryForm = false;
      this.product.categoryId = Number(value); // Ensure categoryId is a number
      this.product.categoryName = this.categoryService.getCategoryNameById(this.product.categoryId);
    }
  }
}
