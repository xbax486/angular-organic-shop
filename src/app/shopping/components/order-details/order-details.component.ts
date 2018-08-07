import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Order } from 'shared/models/order';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  order: Order;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.order = data.order;
  }
}
