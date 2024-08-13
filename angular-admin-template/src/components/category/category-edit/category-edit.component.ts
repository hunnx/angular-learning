import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss'
})
export class CategoryEditComponent {
  category = { name: '' };
  id: number;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
     private router: Router

  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.category = this.categoryService.getCategoryById(this.id);
  }

  onSubmit() {
    this.categoryService.updateCategory(this.id, this.category);
    this.router.navigate(['/category']);
    // Navigate back to category list
  }
}
