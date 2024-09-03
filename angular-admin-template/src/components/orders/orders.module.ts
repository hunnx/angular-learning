import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class OrdersModule { }

export interface Order {
  id: number;
  date: Date;
  customerName?: string; // Optional if you're managing customers
  products: { id: number; name: string; price: number; quantity: number }[];
  totalAmount: number;
}