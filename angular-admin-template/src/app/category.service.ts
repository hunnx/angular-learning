import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories = [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }];
  categoryService: any;
  private currentId = 3;
  getCategories() {
    return this.categories;
  }

  addCategory(category) {
    category.id = this.currentId++;
    this.categories.push(category);
  }

  getCategoryById(id: number) {
    return this.categories.find(category => category.id === id);
  }

  updateCategory(id: number, updatedCategory) {
    const index = this.categories.findIndex(category => category.id === id);
    if (index > -1) {
      this.categories[index] = updatedCategory;
    }
  }

  deleteCategory(id: number) {
    this.categories = this.categories.filter(category => category.id !== id);
  }
}