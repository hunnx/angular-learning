import { Component, OnInit } from '@angular/core';
import { PurchaseRequestService } from '../purchase-request.service';
import { PurchaseRequest } from '../purchase-request.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone : true,
  selector: 'app-purchase-request-list',
  templateUrl: './purchase-request-list.component.html',
  imports : [CommonModule,RouterModule]
})
export class PurchaseRequestListComponent implements OnInit {
  purchaseRequests: PurchaseRequest[] = [];

  constructor(private purchaseRequestService: PurchaseRequestService) { }

  ngOnInit(): void {
    this.purchaseRequestService.getPurchaseRequests().subscribe(requests => this.purchaseRequests = requests);
  }

  deletePurchaseRequest(id: number): void {
    this.purchaseRequestService.deletePurchaseRequest(id);
    this.purchaseRequests = this.purchaseRequests.filter(pr => pr.id !== id);
  }
}