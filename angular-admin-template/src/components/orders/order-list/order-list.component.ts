import { CommonModule} from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../order.service';
import { Order } from '../orders.module';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent  implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orders = this.orderService.getOrders();
  }

  viewOrder(orderId: number): void {
    // Navigate to order details or show details in a modal
  }

  deleteOrder(orderId: number): void {
    this.orderService.deleteOrder(orderId);
    this.orders = this.orderService.getOrders(); // Refresh the list after deletion
  }
}
