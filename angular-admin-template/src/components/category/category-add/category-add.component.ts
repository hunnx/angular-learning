import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CategoryService } from 'src/app/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.scss'
})
export class CategoryAddComponent {
  category = { name: '' };

  constructor(private categoryService: CategoryService , private router: Router) {}

  onSubmit() {

    this.categoryService.addCategory(this.category);
    this.router.navigate(['/category']);
    // Navigate back to category list
  }
}
