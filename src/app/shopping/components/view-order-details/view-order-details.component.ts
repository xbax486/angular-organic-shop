import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { OrderDetailsComponent } from 'shopping/components/order-details/order-details.component';

@Component({
  selector: 'view-order-details',
  templateUrl: './view-order-details.component.html',
  styleUrls: ['./view-order-details.component.css']
})
export class ViewOrderDetailsComponent {
  @Input('order') order;

  constructor(private dialog: MatDialog) { }

  viewOrderDetails(order) {
    this.dialog.open(OrderDetailsComponent, {
      data: { order: order },
      width: '90%'
    });
  }
}
