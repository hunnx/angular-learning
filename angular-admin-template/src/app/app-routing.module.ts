import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { ProductComponent } from 'src/components/product/product.component';
import { CategoryAddComponent } from 'src/components/category/category-add/category-add.component';
import { CategoryEditComponent } from 'src/components/category/category-edit/category-edit.component';
//import { CategoryListComponent } from 'src/components/category/category.component';
import { CategoryListComponent } from 'src/components/category/category.component';
import { ProductAddComponent } from 'src/components/product/product-add/product-add.component';
import { ProductEditComponent } from 'src/components/product/product-edit/product-edit.component';

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
