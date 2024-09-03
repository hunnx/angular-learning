export interface PurchaseRequestItem {
    productId: number;
    quantity: number;
    unitPrice: number;
    tradePrice: number; // New field added
  }
  
  export interface PurchaseRequest {
    id: number;
    status: string; // Status field
    items: PurchaseRequestItem[]; // One purchase request can have multiple items
  }
  