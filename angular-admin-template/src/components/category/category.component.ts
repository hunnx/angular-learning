import { Component, OnInit,input } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { RouterModule,Router, Routes } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone:true,
  templateUrl: 'category.component.html',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class CategoryListComponent implements OnInit {
  categories = [];
  searchTerm = '';
  router: any;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }

  filteredCategories() {
    return this.categories.filter(category => 
      category.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  editCategory(id: number) {
    console.log('id');
    this.router.navigate(['/category/edit', id]);
  }

  deleteCategory(id: number): void {
   // this.categoryService.deleteCategory(id);
   this.categoryService.deleteCategory(id);
   this.loadCategories(); // Reload the categories after deletion
  }
  loadCategories(): void {
    this.categories = this.categoryService.getCategories();
  }
}