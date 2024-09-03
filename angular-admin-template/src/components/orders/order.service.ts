import { Injectable } from '@angular/core';
import { Order } from './orders.module';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];

  constructor() {
    this.loadOrders();
  }

  // Load orders from localStorage or initialize with an empty array
  private loadOrders() {
    const storedOrders = localStorage.getItem('orders');
    this.orders = storedOrders ? JSON.parse(storedOrders) : [];
  }

  // Save orders to localStorage
  private saveOrders() {
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  getOrders(): Order[] {
    return this.orders;
  }

  getOrderById(id: number): Order | undefined {
    return this.orders.find(order => order.id === id);
  }

  addOrder(order: Order) {
    this.orders.push(order);
    this.saveOrders();
  }

  updateOrder(updatedOrder: Order) {
    const index = this.orders.findIndex(order => order.id === updatedOrder.id);
    if (index !== -1) {
      this.orders[index] = updatedOrder;
      this.saveOrders();
    }
  }

  deleteOrder(id: number) {
    this.orders = this.orders.filter(order => order.id !== id);
    this.saveOrders();
  }
}