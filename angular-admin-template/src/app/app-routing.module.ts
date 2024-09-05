import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { ProductComponent } from 'src/components/product/product.component';

import { CategoryAddComponent } from 'src/components/category/category-add/category-add.component';
import { CategoryEditComponent } from 'src/components/category/category-edit/category-edit.component';
import { CategoryListComponent } from 'src/components/category/category.component';

import { ProductAddComponent } from 'src/components/product/product-add/product-add.component';
import { ProductEditComponent } from 'src/components/product/product-edit/product-edit.component';

import { SalesComponent } from 'src/components/sales/sales.component';

import { OrderDetailsComponent } from 'src/components/orders/order-details/order-details.component';
import { OrderCreateComponent } from 'src/components/orders/order-create/order-create.component';
import { OrderListComponent } from 'src/components/orders/order-list/order-list.component';

import { SupplierCreateComponent } from 'src/components/supplier/supplier-create/supplier-create.component';
import { SupplierDetailComponent } from 'src/components/supplier/supplier-detail/supplier-detail.component';
import { SupplierListComponent } from 'src/components/supplier/supplier-list/supplier-list.component';
import { SupplierEditComponent } from 'src/components/supplier/supplier-edit/supplier-edit.component';

 import { PurchaseRequestListComponent } from 'src/components/purchase-request/purchase-request-list/purchase-request-list.component';
 import { PurchaseRequestCreateComponent } from 'src/components/purchase-request/purchase-request-create/purchase-request-create.component';
import { PurchaseRequestEditComponent } from 'src/components/purchase-request/purchase-request-edit/purchase-request-edit.component';
import { PurchaseRequestDetailComponent } from 'src/components/purchase-request/purchase-request-detail/purchase-request-detail.component';



const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/default',
        pathMatch: 'full'
      },
      {
        path: 'default',
        loadComponent: () => import('./demo/default/default.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/elements/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/elements/element-color/element-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/sample-page/sample-page.component')
      },
      {
        path: 'category',
          component:CategoryListComponent 
      },
      {
        path: 'category/add',
          component:CategoryAddComponent 
      },
      {
        path: 'category/edit/:id',
          component:CategoryEditComponent  
      },
      {
        path: 'product',
          component:ProductComponent 
      },
      {
        path: 'product/add',
          component:ProductAddComponent
      },
      {
        path: 'product/edit/:id',
          component:ProductEditComponent  
      },
      {
        path: 'sales',
          component:SalesComponent 
      },
      { path: 'orders', component: OrderListComponent },
      { path: 'orders/create', component: OrderCreateComponent },
      { path: 'orders/:id', component: OrderDetailsComponent },

      { path: 'supplier', component: SupplierListComponent },
      { path: 'supplier/create', component: SupplierCreateComponent },
      { path: 'supplier/edit/:id', component: SupplierEditComponent },
      { path: 'supplier/detail/:id', component: SupplierDetailComponent },

    { path: 'purchase-request', component: PurchaseRequestListComponent },
    { path: 'purchase-request/create', component: PurchaseRequestCreateComponent },
     { path: 'purchase-request/edit/:id', component: PurchaseRequestEditComponent },
      { path: 'purchase-request/detail/:id', component: PurchaseRequestDetailComponent },

      
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'guest',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
