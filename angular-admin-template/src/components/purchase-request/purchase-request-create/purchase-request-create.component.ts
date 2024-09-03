import { Component,AfterViewInit, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PurchaseRequestService } from '../purchase-request.service';
import { PurchaseRequest, PurchaseRequestItem } from '../purchase-request.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ProductService } from 'src/components/product/product.service';
import { CategoryService } from 'src/app/category.service';


export interface Product {
  id: number;           // Unique identifier for the product
  name: string;         // Name of the product
  price: number;        // Price of the product
  quantity: number;     // Quantity of the product in stock
  categoryId: number;   // ID of the category the product belongs to
  categoryName: string; // Name of the category the product belongs to
}
declare var $: any;

@Component({
  selector: 'app-purchase-request-create',
  templateUrl: './purchase-request-create.component.html',
  styleUrls: ['./purchase-request-create.component.css'],  // If you have styles
  standalone:true,
  imports: [CommonModule,FormsModule],
})

export class PurchaseRequestCreateComponent implements AfterViewInit {
  product = { name: '', price: 0,quantity:0, categoryId: 0, categoryName: '' };

  categories = [];
/*   constructor(
    private productService: ProductService,
    private router: Router
  ) {} */
    constructor(
      private purchaseRequestService: PurchaseRequestService,
      private productService: ProductService,
      private categoryService: CategoryService,
      private router: Router
    ) {}
  ngAfterViewInit() {

    // Initialize Select2
    $('#productSelect').select2({
      width: '100%',
      placeholder: 'Select a product or add a new one',
      allowClear: true
    });

    // Bind Select2 change event
    $('#productSelect').on('change', (e: any) => {
      console.log('d');
      const selectedValue = $(e.target).val();
      if (selectedValue === 'new') {
        this.showProductForm = true;
      } else {
        this.showProductForm = false;
        // Handle existing product selection if needed
      }
    });
  }

  ngOnDestroy() {
    // Destroy Select2 to avoid memory leaks
    $('#productSelect').select2('destroy');
  }

  purchaseRequest: PurchaseRequest = {
    id: 0,
    status: '',
    items: []
  };

  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedProductId: number | null = null;

  newItem: PurchaseRequestItem = {
    productId: 0,
    quantity: 1,
    unitPrice: 0,
    tradePrice: 0
  };

  newProductName: string = '';
  newProductPrice: number | null = null;
  newProductQuantity: number | null = null;
  newProductCategoryName: string = '';
  showProductForm: boolean = false;



  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    this.loadProducts();
  }

  loadProducts(): void {
    this.products = this.productService.getProducts();
    this.filteredProducts = [...this.products]; // Initialize filtered products
  }

  onSearch({ term }: { term: string }): void {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
  }

  showAddProductForm(): void {
    this.showProductForm = true;
  }

 
  onProductSelect(event: Event) {
    console.log('s');
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;

    if (selectedValue === 'new') {
      this.showProductForm = true;
    } else {
      this.showProductForm = false;
      // Handle existing product selection here if needed
    }
  }
  newProductCategoryId: number | string = '';
  showCategoryForm = false;
  newCategoryName = '';
  
  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement.value === 'add-new') {
      this.showCategoryForm = true;
      this.newProductCategoryId = '';
    } else {
      this.showCategoryForm = false;
      this.newProductCategoryId = selectElement.value;
    }
  }

  onAddProduct(): void {
    // Ensure all form fields have valid values before proceeding
    if (
      this.newProductName &&
      this.newProductPrice != null && // Check for non-null and non-undefined
      this.newProductQuantity != null &&
      this.newProductCategoryId != null
    ) {
      let categoryName = '';
  
      // Check if a category name is provided or fetch it based on ID
      if (this.newProductCategoryName) {
        categoryName = this.newProductCategoryName;
      } else {
        // Assuming you have a method in categoryService to get the category name by ID
        categoryName = this.categoryService.getCategoryNameById(Number(this.newProductCategoryId));
      }
  
      // Add the new product using the product service
      this.productService.addProduct(
        this.newProductName,
        this.newProductPrice,
        this.newProductQuantity,
        Number(this.newProductCategoryId),
        categoryName
      );
  
      // Reload the product list to show the new product
      this.loadProducts();
  
      // Reset the form and hide it after adding the product
      this.resetProductForm();
    }
  }
  
  // Method to reset the form fields and hide the form
  resetProductForm(): void {
    this.newProductName = '';
    this.newProductPrice = null;
    this.newProductQuantity = null;
    this.newProductCategoryId = null;
    this.newProductCategoryName = '';
    this.showProductForm = false;
  }
  addItem() {
    this.purchaseRequest.items.push({ ...this.newItem });
    this.resetNewItem();
  }

  resetNewItem() {
    this.newItem = {
      productId: 0,
      quantity: 1,
      unitPrice: 0,
      tradePrice: 0
    };
  }

  createPurchaseRequest() {
    this.purchaseRequestService.addPurchaseRequest(this.purchaseRequest);
    this.router.navigate(['/purchase-request']);
  }
  onAddPurchaseRequestItem(): void {
    if (this.selectedProductId !== null) {
      const selectedProduct = this.products.find(product => product.id === this.selectedProductId);
      if (selectedProduct) {
        const newItem: PurchaseRequestItem = {
          productId: selectedProduct.id,
          quantity: this.newProductQuantity || 1,
          unitPrice: selectedProduct.price,
          tradePrice: selectedProduct.price // Assuming tradePrice is same as price initially
        };

        this.purchaseRequest.items.push(newItem);
      }
    }
  }

  
    // Initialize Select2
   


}