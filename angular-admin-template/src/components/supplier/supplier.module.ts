import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { SupplierRoutingModule } from './supplier-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,  
  ]
})
export class SupplierModule { }

export interface Supplier {
  id: number;
  name: string;
  phone: string;
  address: string;
}